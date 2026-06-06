import { render, screen } from "@testing-library/react";
import ProjectsPage from "../projects/page";

describe("Projects page (integration)", () => {
  it("renders projects heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Projects");
  });

  it("renders preview images when configured", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("img", { name: /Pilotflows product preview/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /FrëschKëscht S\.à r\.l\. product preview/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /WeConnect S\.à r\.l\. product preview/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Dahindo a\.s\.b\.l\. product preview/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /RosterX Web Application product preview/i })).toBeInTheDocument();
  });

  it("renders project cards", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("Pilotflows")).toBeInTheDocument();
    expect(screen.getByText("FrëschKëscht S.à r.l.")).toBeInTheDocument();
    expect(screen.getByText("RosterX Web Application")).toBeInTheDocument();
  });
});
