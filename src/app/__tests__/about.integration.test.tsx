import { render, screen } from "@testing-library/react";
import AboutPage from "../about/page";

describe("About page (integration)", () => {
  it("renders about heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("About me");
  });

  it("renders profile info", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Born:/)).toBeInTheDocument();
    expect(screen.getByText(/Luxair/)).toBeInTheDocument();
    expect(screen.getByText(/Running, Programming, Aviation/)).toBeInTheDocument();
  });
});
