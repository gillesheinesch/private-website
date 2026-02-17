import sitemap from "../sitemap";

describe("sitemap", () => {
    it("returns array with static URLs", () => {
        const result = sitemap();
        const urls = result.map((e) => e.url);
        expect(urls).toContain("https://heinesch.com");
        expect(urls).toContain("https://heinesch.com/about");
        expect(urls).toContain("https://heinesch.com/projects");
        expect(urls).toContain("https://heinesch.com/blog");
    });

    it("returns blog post URLs", () => {
        const result = sitemap();
        const blogUrls = result.filter((e) => e.url.includes("/blog/"));
        expect(blogUrls.length).toBeGreaterThan(0);
        expect(blogUrls.every((e) => e.url.match(/\/blog\/\d{4}-\d{2}-\d{2}$/))).toBe(true);
    });

    it("each entry has url, lastModified, changeFrequency, priority", () => {
        const result = sitemap();
        result.forEach((entry) => {
            expect(entry).toHaveProperty("url");
            expect(entry).toHaveProperty("lastModified");
            expect(entry).toHaveProperty("changeFrequency");
            expect(entry).toHaveProperty("priority");
            expect(entry.lastModified).toBeInstanceOf(Date);
        });
    });
});
