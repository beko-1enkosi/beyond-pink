import { z } from "zod";

export const BRI_MODEL = "google/gemini-3.1-flash-lite";
export const INPUT_LIMIT = 1000;
export const HISTORY_LIMIT = 30000;
export const REQUESTS_PER_MINUTE = 6;
export const requestSchema = z
  .object({
    messages: z
      .array(
        z.object({
          id: z.string().min(1).max(200),
          role: z.enum(["user", "assistant"]),
          parts: z
            .array(z.object({ type: z.literal("text"), text: z.string().min(1).max(6000) }))
            .min(1)
            .max(1),
        }),
      )
      .min(1)
      .max(80),
  })
  .superRefine(({ messages }, ctx) => {
    if (messages.at(-1)?.role !== "user")
      ctx.addIssue({ code: "custom", message: "Please send a question to Bri." });
    if (messages.some((m) => m.role === "user" && (m.parts[0]?.text.length ?? 0) > INPUT_LIMIT))
      ctx.addIssue({
        code: "custom",
        message: "Please keep each question under 1,000 characters.",
      });
    if (
      messages.reduce((sum, m) => sum + m.parts.reduce((n, p) => n + p.text.length, 0), 0) >
      HISTORY_LIMIT
    )
      ctx.addIssue({
        code: "custom",
        message: "This conversation is full. Please start a new chat.",
      });
  });

export function createTemporaryLimiter() {
  const windows = new Map<string, { count: number; until: number }>();
  return (key: string, now: number, limit = REQUESTS_PER_MINUTE) => {
    for (const [id, item] of windows) if (item.until <= now) windows.delete(id);
    const item = windows.get(key) ?? { count: 0, until: now + 60000 };
    if (item.count >= limit) return Math.max(1, Math.ceil((item.until - now) / 1000));
    item.count += 1;
    windows.set(key, item);
    return 0;
  };
}

export function safeGatewayError(error: unknown) {
  const e = error as { statusCode?: number; responseBody?: string; name?: string } | undefined;
  if (e?.name === "AbortError") return { status: 499, message: "Bri’s reply was stopped." };
  const status = e?.statusCode ?? 503;
  let message = "Bri couldn’t connect just now. Please try again later.";
  try {
    const payload = JSON.parse(e?.responseBody ?? "{}");
    const upstream = payload.error?.message ?? payload.message;
    if (typeof upstream === "string" && [402, 403, 429].includes(status)) message = upstream;
  } catch {
    /* Do not expose raw provider errors or request content. */
  }
  if (status === 401) message = "Bri’s AI connection needs to be configured by the website owner.";
  if (status === 404) message = "Bri’s selected AI model is currently unavailable.";
  if (status === 400)
    message = "Bri couldn’t process that question. Please start a new chat if this continues.";
  if (status === 429 && message.startsWith("Bri couldn’t"))
    message = "Bri is receiving too many questions. Please wait a moment before sending another.";
  return { status, message };
}
