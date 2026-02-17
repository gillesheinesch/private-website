import { render, screen } from "@testing-library/react";
import { MDXContent } from "../mdx-content";

jest.mock("react-markdown");

describe("MDXContent", () => {
    it("renders markdown headings and paragraphs", () => {
        render(<MDXContent content={`## Introduction\n\nThis is a paragraph with **bold** text.`} />);
        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Introduction");
        expect(screen.getByText(/This is a paragraph/)).toBeInTheDocument();
    });

    it("adds target _blank and rel noopener noreferrer to external links", () => {
        render(<MDXContent content={`[External](https://example.com)`} />);
        const link = screen.getByRole("link", { name: /External/i });
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("does not add target or rel to internal links", () => {
        render(<MDXContent content={`[Internal](/about)`} />);
        const link = screen.getByRole("link", { name: /Internal/i });
        expect(link).toHaveAttribute("href", "/about");
        expect(link).not.toHaveAttribute("target");
        expect(link).not.toHaveAttribute("rel");
    });
});
