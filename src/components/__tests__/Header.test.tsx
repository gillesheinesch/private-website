import { render, screen } from "@testing-library/react";
import Header from "../Header";


describe("Header", () => {
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
});
