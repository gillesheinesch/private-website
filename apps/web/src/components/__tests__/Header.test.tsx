import { render, screen } from "@testing-library/react";
import Header, { isActivePath } from "../Header";

const mockPathname = jest.fn<string | null, []>(() => "/");
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Header", () => {
  beforeEach(() => mockPathname.mockReturnValue("/"));

  it("renders logo link with name", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /Gilles Heinesch/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders nav links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("has mobile menu button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("marks the current section with aria-current", () => {
    mockPathname.mockReturnValue("/blog/2026-02-09");
    render(<Header />);
    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /home/i })).not.toHaveAttribute("aria-current");
  });
});

describe("isActivePath", () => {
  it("matches home only exactly", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/blog", "/")).toBe(false);
  });

  it("matches sections and their sub-pages", () => {
    expect(isActivePath("/blog", "/blog")).toBe(true);
    expect(isActivePath("/blog/2026-02-09", "/blog")).toBe(true);
    expect(isActivePath("/blogroll", "/blog")).toBe(false);
  });

  it("handles a null pathname", () => {
    expect(isActivePath(null, "/")).toBe(false);
  });
});
