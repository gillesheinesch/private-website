import { render, screen } from "@testing-library/react";
import ProjectsPage from "../projects/page";

describe("Projects page (integration)", () => {
  it("renders projects heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Projects");
  });

  it("renders project cards", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("FrëschKëscht S.à r.l.")).toBeInTheDocument();
    expect(screen.getByText("RosterX Web Application")).toBeInTheDocument();
  });
});
