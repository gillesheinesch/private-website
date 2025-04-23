import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page"; // Import the Home component

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    // Find the heading element by its text content and role
    const heading = screen.getByRole("heading", { name: /Gilles Heinesch/i });

    // Assert that the heading is in the document
    expect(heading).toBeInTheDocument();
  });
});
