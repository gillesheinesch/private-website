import robots from "../robots";

describe("robots", () => {
    it("returns rules with userAgent * and allow /", () => {
        const result = robots();
        expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    });

    it("returns sitemap URL", () => {
        const result = robots();
        expect(result.sitemap).toMatch(/sitemap\.xml$/);
        expect(result.sitemap).toContain("heinesch.com");
    });
});
