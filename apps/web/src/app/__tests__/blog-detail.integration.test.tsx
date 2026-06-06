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
        const { getAllSlugs, getPostBySlug } = require("@/lib/blog");
        const slugs = getAllSlugs();
        const slug = slugs[0]!;
        const post = getPostBySlug(slug);
        expect(post).not.toBeNull();
        // Pick a phrase from the post body that the mock will render (e.g. first heading or paragraph)
        const firstMeaningfulLine = post!.content.trim().split("\n").find((l: string) => l.trim().length > 5);
        expect(firstMeaningfulLine).toBeDefined();
        const searchText = firstMeaningfulLine!.replace(/^#+\s*/, "").trim().slice(0, 30);
        const element = await BlogPostPage({
            params: Promise.resolve({ slug }),
        });
        render(element);
        expect(screen.getAllByText(new RegExp(searchText, "i")).length).toBeGreaterThan(0);
    });
});
