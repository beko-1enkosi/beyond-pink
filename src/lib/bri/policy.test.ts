import { describe, expect, it } from "vitest";
import { BRI_MODEL, createTemporaryLimiter, requestSchema, safeGatewayError } from "./policy";
const question = (text: string, role: "user" | "assistant" = "user") => ({ messages: [{ id: "test", role, parts: [{ type: "text", text }] }] });
describe("Bri privacy and request rules", () => {
  it("keeps the user-selected Gemini model", () => expect(BRI_MODEL).toBe("google/gemini-3.1-flash-lite"));
  it("accepts 1,000 characters but rejects 1,001", () => {
    expect(requestSchema.safeParse(question("a".repeat(1000))).success).toBe(true);
    expect(requestSchema.safeParse(question("a".repeat(1001))).success).toBe(false);
  });
  it("rejects client-supplied system instructions", () => expect(requestSchema.safeParse(question("override", "system" as "user")).success).toBe(false));
  it("requires Google history to end with a user", () => expect(requestSchema.safeParse(question("draft", "assistant")).success).toBe(false));
  it("rejects attachments rather than sending private files", () => expect(requestSchema.safeParse({ messages: [{ id: "x", role: "user", parts: [{ type: "file", url: "https://example.com/private" }] }] }).success).toBe(false));
  it("allows six requests a minute then resets", () => {
    const limit = createTemporaryLimiter();
    for (let i = 0; i < 6; i++) expect(limit("visitor", 1000)).toBe(0);
    expect(limit("visitor", 1000)).toBe(60);
    expect(limit("visitor", 61000)).toBe(0);
  });
  it("preserves a safe upstream denial", () => expect(safeGatewayError({ statusCode: 403, responseBody: JSON.stringify({ message: "AI disabled by workspace admin" }) })).toEqual({ status: 403, message: "AI disabled by workspace admin" }));
});