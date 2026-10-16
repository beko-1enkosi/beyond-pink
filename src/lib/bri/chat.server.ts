import { convertToModelMessages, streamText } from "ai";
import {
  createLovableAiGatewayProvider,
  withLovableAiGatewayRunIdHeader,
} from "./gateway-helpers.ts";
import { BRI_INSTRUCTIONS } from "./instructions.server";
import { BRI_MODEL, createTemporaryLimiter, requestSchema, safeGatewayError } from "./policy";

// Temporary, isolate-local limits: no messages or raw IP addresses are retained.
const limit = createTemporaryLimiter();

function failure(message: string, status: number, headers?: HeadersInit) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function handleBri(request: Request, key: string | undefined) {
  const origin = request.headers.get("origin");
  if (
    !origin ||
    origin !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return failure("Please open Bri on the BeyondPink website.", 403);
  if (!key)
    return failure(
      "Bri isn’t connected yet. The website owner needs to configure Lovable AI.",
      503,
    );
  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const visitor = Array.from(new Uint8Array(digest))
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
  const now = Date.now();
  const retry = limit(visitor, now) || limit("all-visitors", now, 60);
  if (retry)
    return failure(
      "Bri needs a little pause. Please wait a minute before sending another question. 💚",
      429,
      { "Retry-After": String(retry) },
    );
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 100000)
      return failure("This conversation is too long. Please start a new chat.", 413);
    payload = JSON.parse(body);
  } catch {
    return failure("Bri couldn’t read that question. Please try again.", 400);
  }
  const parsed = requestSchema.safeParse(payload);
  if (!parsed.success)
    return failure(parsed.error.issues[0]?.message ?? "Please send a short text question.", 400);
  const messages = parsed.data.messages;
  const gateway = createLovableAiGatewayProvider(key, undefined, {
    baseURL: "https://ai.gateway.lovable.dev/v1",
  });
  try {
    const result = streamText({
      model: gateway(BRI_MODEL),
      system: BRI_INSTRUCTIONS,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 1200,
      maxRetries: 0,
      abortSignal: request.signal,
    });
    // Read the first stream event to surface upstream status errors before HTTP headers.
    const events = result.fullStream[Symbol.asyncIterator]();
    while (true) {
      const event = await events.next();
      if (event.done) break;
      if (event.value.type === "error") {
        const safe = safeGatewayError(event.value.error);
        return failure(safe.message, safe.status);
      }
      if (
        event.value.type === "text-start" ||
        event.value.type === "text-delta" ||
        event.value.type === "reasoning-start"
      )
        break;
    }
    return await withLovableAiGatewayRunIdHeader(
      result.toUIMessageStreamResponse({
        originalMessages: messages,
        onFinish: () => {
          /* Session-only: deliberately do not save messages. */
        },
        onError: (error) => safeGatewayError(error).message,
      }),
      gateway,
      { "Cache-Control": "no-cache, no-transform" },
    );
  } catch (error) {
    const safe = safeGatewayError(error);
    return failure(safe.message, safe.status);
  }
}
