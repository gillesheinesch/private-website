/**
 * Integration test: Blog page with real getAllPosts
 */
import { render, screen } from "@testing-library/react";
import BlogPage from "../blog/page";

describe("Blog page (integration)", () => {
    it("renders blog title", () => {
        render(<BlogPage />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Blog");
    });

    it("renders posts from blog directory", () => {
        const { getAllPosts } = require("@/lib/blog");
        const posts = getAllPosts();
        expect(posts.length).toBeGreaterThan(0);
        render(<BlogPage />);
        expect(screen.getByText(posts[0]!.title)).toBeInTheDocument();
        expect(screen.getByText(/Read more/)).toBeInTheDocument();
    });

    it("links to post detail", () => {
        const { getAllPosts } = require("@/lib/blog");
        const posts = getAllPosts();
        const first = posts[0]!;
        render(<BlogPage />);
        const link = screen.getByRole("link", { name: new RegExp(first.title, "i") });
        expect(link).toHaveAttribute("href", `/blog/${first.slug}`);
    });
});
