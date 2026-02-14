import { getAllSlugs, getPostBySlug, getAllPosts } from "../blog";

describe("blog lib", () => {
  describe("getAllSlugs", () => {
    it("returns slugs from blog directory", () => {
      const slugs = getAllSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs).toContain("2024-11-16");
      expect(slugs).not.toContain("README");
    });
  });

  describe("getPostBySlug", () => {
    it("returns post for existing slug", () => {
      const post = getPostBySlug("2024-11-16");
      expect(post).not.toBeNull();
      expect(post?.title).toBe("First blog article");
      expect(post?.slug).toBe("2024-11-16");
      expect(post?.description).toContain("description");
      expect(post?.tags).toContain("Next.js");
    });

    it("returns null for unknown slug", () => {
      expect(getPostBySlug("nonexistent-9999")).toBeNull();
    });
  });

  describe("getAllPosts", () => {
    it("returns posts sorted by date descending", () => {
      const posts = getAllPosts();
      expect(posts.length).toBeGreaterThan(0);
      for (let i = 1; i < posts.length; i++) {
        const prev = new Date(posts[i - 1].date).getTime();
        const curr = new Date(posts[i].date).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });
  });
});
