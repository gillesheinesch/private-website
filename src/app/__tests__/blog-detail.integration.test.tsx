/**
 * Integration test: Blog post detail page with real getPostBySlug
 */
import { render, screen } from "@testing-library/react";
import BlogPostPage from "../blog/[slug]/page";

jest.mock("react-markdown");

describe("Blog post detail page (integration)", () => {
    it("renders post title, date, tags, and Back to blog link for known slug", async () => {
        const { getAllSlugs } = require("@/lib/blog");
        const slugs = getAllSlugs();
        expect(slugs.length).toBeGreaterThan(0);
        const slug = slugs[0]!;
        const element = await BlogPostPage({
            params: Promise.resolve({ slug }),
        });
        render(element);
        const post = require("@/lib/blog").getPostBySlug(slug);
        expect(post).not.toBeNull();
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(post!.title);
        expect(screen.getByRole("link", { name: /Back to blog/i })).toHaveAttribute("href", "/blog");
    });

    it("renders markdown content", async () => {
        const { getAllSlugs } = require("@/lib/blog");
        const slugs = getAllSlugs();
        const slug = slugs[0]!;
        const element = await BlogPostPage({
            params: Promise.resolve({ slug }),
        });
        render(element);
        // Mock renders markdown as paragraphs; content includes "Test Blog Article"
        expect(screen.getAllByText(/Test Blog Article/).length).toBeGreaterThan(0);
    });
});
