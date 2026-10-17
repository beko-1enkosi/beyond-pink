import { describe, expect, it } from "vitest";
import { addComment, deletePost, emptyCommunity, makePost, normalizeCommunity, reportItem, setReaction } from "./community";
import { COMMENT_LIMIT, POST_LIMIT, SEED_POSTS } from "./community-data";

const rand = () => 0;
const base = () => emptyCommunity(rand);

describe("Brea Garden community state", () => {
  it("assigns a pseudonymous botanical visitor identity, never a personal name", () => {
    const s = base();
    expect(s.visitorName).toMatch(/^Anonymous /);
  });

  it("seeds five fictional demo posts including an image post and varied genders", () => {
    expect(SEED_POSTS).toHaveLength(5);
    expect(SEED_POSTS.some((p) => p.image)).toBe(true);
    expect(SEED_POSTS.every((p) => p.name.startsWith("Anonymous"))).toBe(true);
    expect(SEED_POSTS.every((p) => p.when.startsWith("Demo"))).toBe(true);
  });

  it("adds a published post to the top with zero external support and the visitor pseudonym", () => {
    const s = makePost(base(), "  Hello Garden  ");
    expect(s.posts).toHaveLength(1);
    expect(s.posts[0]!.text).toBe("Hello Garden");
    expect(s.posts[0]!.name).toBe(s.visitorName);
  });

  it("trims posts to the character limit", () => {
    const s = makePost(base(), "x".repeat(POST_LIMIT + 50));
    expect(s.posts[0]!.text).toHaveLength(POST_LIMIT);
  });

  it("sets, changes and removes a heart reaction, keeping one per post", () => {
    let s = setReaction(base(), "seed-hope", "care");
    expect(s.reactions["seed-hope"]).toBe("care");
    s = setReaction(s, "seed-hope", "strength");
    expect(s.reactions["seed-hope"]).toBe("strength");
    expect(Object.keys(s.reactions)).toHaveLength(1);
    s = setReaction(s, "seed-hope", null);
    expect(s.reactions["seed-hope"]).toBeUndefined();
  });

  it("rejects unknown reaction ids during normalization", () => {
    const s = normalizeCommunity({ reactions: { "seed-hope": "love", "seed-ask": "fire" } }, rand);
    expect(s.reactions["seed-hope"]).toBe("love");
    expect(s.reactions["seed-ask"]).toBeUndefined();
  });

  it("appends comments under the visitor pseudonym and enforces the limit", () => {
    const s = addComment(base(), "seed-hope", "y".repeat(COMMENT_LIMIT + 20));
    expect(s.comments["seed-hope"]).toHaveLength(1);
    expect(s.comments["seed-hope"]![0]!.name).toBe(s.visitorName);
    expect(s.comments["seed-hope"]![0]!.text).toHaveLength(COMMENT_LIMIT);
  });

  it("reports locally and optionally hides content", () => {
    const s = reportItem(base(), "seed-hope", "unkind", true);
    expect(s.reported["seed-hope"]).toBe("unkind");
    expect(s.hidden).toContain("seed-hope");
    const keep = reportItem(base(), "seed-hope", "other", false);
    expect(keep.hidden).toHaveLength(0);
  });

  it("deletes only the visitor's own posts along with their comments", () => {
    let s = makePost(base(), "Mine");
    const id = s.posts[0]!.id;
    s = addComment(s, id, "note");
    s = setReaction(s, id, "hugs");
    s = deletePost(s, id);
    expect(s.posts).toHaveLength(0);
    expect(s.comments[id]).toBeUndefined();
    expect(s.reactions[id]).toBeUndefined();
  });

  it("drops malformed data and non-botanical names during normalization", () => {
    const s = normalizeCommunity({ visitorName: "Thobeka", posts: [{ id: "p1", name: "Real Name", text: "hi" }, { id: "bad" }], supported: ["x", 5] }, rand);
    expect(s.visitorName).toMatch(/^Anonymous /);
    expect(s.posts).toHaveLength(1);
    expect(s.posts[0]!.name).toMatch(/^Anonymous /);
    // legacy Support toggles migrate to Care hearts
    expect(s.reactions["x"]).toBe("care");
  });
});
