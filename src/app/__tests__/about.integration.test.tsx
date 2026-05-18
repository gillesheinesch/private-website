import { render, screen } from "@testing-library/react";
import AboutPage from "../about/page";

describe("About page (integration)", () => {
  it("renders profile name", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Gilles Heinesch"
    );
  });

  it("renders experience section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Experience/)).toBeInTheDocument();
    expect(screen.getAllByText(/Luxair/).length).toBeGreaterThan(0);
    expect(screen.getByText(/First Officer B737/)).toBeInTheDocument();
  });

  it("has LinkedIn link", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: /View LinkedIn/i });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/gillesheinesch/");
  });
});
