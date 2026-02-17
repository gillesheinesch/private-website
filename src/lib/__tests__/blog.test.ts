import { getAllPosts, getAllSlugs, getPostBySlug } from "../blog";

describe("blog lib", () => {
    describe("getAllSlugs", () => {
        it("returns slugs from blog directory", () => {
            const slugs = getAllSlugs();
            expect(Array.isArray(slugs)).toBe(true);
            expect(slugs.length).toBeGreaterThan(0);
            expect(slugs).not.toContain("README");
            expect(slugs.every((s) => typeof s === "string")).toBe(true);
        });
    });

    describe("getPostBySlug", () => {
        it("returns post for existing slug", () => {
            const slugs = getAllSlugs();
            const slug = slugs[0];
            expect(slug).toBeDefined();
            const post = getPostBySlug(slug!);
            expect(post).not.toBeNull();
            expect(post?.title).toBeDefined();
            expect(post?.slug).toBe(slug);
            expect(post?.description).toBeDefined();
            expect(Array.isArray(post?.tags)).toBe(true);
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
