import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/bri")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleBri } = await import("@/lib/bri/chat.server");
        return handleBri(request, process.env["LOVABLE_API_KEY"]);
      },
    },
  },
});
