import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/bri")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleBri } = await import("@/lib/bri/chat.server");
        return handleBri(request, process.env["LOVABLE_API_KEY"]);
      },
    },
  },
});
