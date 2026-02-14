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
    render(<BlogPage />);
    expect(screen.getByText("First blog article")).toBeInTheDocument();
    expect(screen.getByText(/Read more/)).toBeInTheDocument();
  });

  it("links to post detail", () => {
    render(<BlogPage />);
    const link = screen.getByRole("link", { name: /First blog article/i });
    expect(link).toHaveAttribute("href", "/blog/2024-11-16");
  });
});
