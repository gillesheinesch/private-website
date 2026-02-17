import { render, screen } from "@testing-library/react";
import { FlightLogTerminal } from "../flight-log-terminal";

describe("FlightLogTerminal", () => {
    it("renders cat projects.txt", () => {
        render(<FlightLogTerminal />);
        expect(screen.getByText(/cat projects\.txt/)).toBeInTheDocument();
    });

    it("renders project titles from projects data", () => {
        render(<FlightLogTerminal />);
        expect(screen.getByText(/Pilotflows/)).toBeInTheDocument();
        expect(screen.getByText(/RosterX/)).toBeInTheDocument();
    });

    it("has View all link to /projects", () => {
        render(<FlightLogTerminal />);
        const link = screen.getByRole("link", { name: /View all/i });
        expect(link).toHaveAttribute("href", "/projects");
    });
});
