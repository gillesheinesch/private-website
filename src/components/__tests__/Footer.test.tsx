import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders copyright and name", () => {
    render(<Footer />);
    expect(screen.getByText(/Gilles Heinesch/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("contains link to home", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /Gilles Heinesch/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
