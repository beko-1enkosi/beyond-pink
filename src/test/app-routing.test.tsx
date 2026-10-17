import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("keeps the introduction and direct Brea destinations independently accessible", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of ["/how-brea-works", "/brea", "/brea/home", "/brea/learn", "/brea/find-care"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.pathname.replace(/\/$/, "")).toBe(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
