import { describe, expect, it } from "vitest";
import { BRI_MODEL, createTemporaryLimiter, requestSchema, safeGatewayError } from "./policy";
const question = (text: string, role: "user" | "assistant" = "user") => ({
  messages: [{ id: "test", role, parts: [{ type: "text", text }] }],
});
describe("Bri privacy and request rules", () => {
  it.each([
    "What are the symptoms of breast cancer?",
    "Teach me Python.",
    "What is the difference between a mammogram and an ultrasound?",
    "I found a lump. Can you tell me if it's cancer?",
    "What is Brea?",
    "What is a variable in Python?",
  ])("accepts educational and general questions without topic filtering: %s", (text) => {
    expect(requestSchema.safeParse(question(text)).success).toBe(true);
  });
  it("preserves general-topic conversation history for follow-up questions", () => {
    const result = requestSchema.safeParse({ messages: [
      { ...question("Teach me Python.").messages[0], id: "intro" },
      { ...question('A variable stores a value, such as name = "Bri".', "assistant").messages[0], id: "reply" },
      { ...question("Can I change its value?").messages[0], id: "follow-up" },
    ] });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.messages).toHaveLength(3);
  });
  it("keeps the user-selected Gemini model", () =>
    expect(BRI_MODEL).toBe("google/gemini-3.1-flash-lite"));
  it("accepts 1,000 characters but rejects 1,001", () => {
    expect(requestSchema.safeParse(question("a".repeat(1000))).success).toBe(true);
    expect(requestSchema.safeParse(question("a".repeat(1001))).success).toBe(false);
  });
  it("rejects client-supplied system instructions", () =>
    expect(requestSchema.safeParse(question("override", "system" as "user")).success).toBe(false));
  it("requires Google history to end with a user", () =>
    expect(requestSchema.safeParse(question("draft", "assistant")).success).toBe(false));
  it("accepts streamed assistant history with SDK step markers", () => {
    const result = requestSchema.safeParse({
      messages: [
        {
          id: "first",
          role: "assistant",
          parts: [{ type: "step-start" }, { type: "text", text: "Brea is planned." }],
        },
        ...question("What about Find Care?").messages,
      ],
    });
    expect(result.success).toBe(true);
    if (result.success)
      expect(result.data.messages[0]?.parts).toEqual([{ type: "text", text: "Brea is planned." }]);
  });
  it("rejects attachments rather than sending private files", () =>
    expect(
      requestSchema.safeParse({
        messages: [
          { id: "x", role: "user", parts: [{ type: "file", url: "https://example.com/private" }] },
        ],
      }).success,
    ).toBe(false));
  it("allows six requests a minute then resets", () => {
    const limit = createTemporaryLimiter();
    for (let i = 0; i < 6; i++) expect(limit("visitor", 1000)).toBe(0);
    expect(limit("visitor", 1000)).toBe(60);
    expect(limit("visitor", 61000)).toBe(0);
  });
  it("preserves a safe upstream denial", () =>
    expect(
      safeGatewayError({
        statusCode: 403,
        responseBody: JSON.stringify({ message: "AI disabled by workspace admin" }),
      }),
    ).toEqual({ status: 403, message: "AI disabled by workspace admin" }));
});
