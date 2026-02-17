import { render, screen } from "@testing-library/react";
import HomePage from "../(home)/page";

describe("Home page (integration)", () => {
    it("renders hero badge Aviation × Code", () => {
        render(<HomePage />);
        expect(screen.getByText(/Aviation × Code/)).toBeInTheDocument();
    });

    it("renders typing line const flight = code.takeoff()", () => {
        render(<HomePage />);
        expect(screen.getByText(/const flight = code\.takeoff\(\)/)).toBeInTheDocument();
    });

    it("renders Projects, Blog, About links", () => {
        render(<HomePage />);
        expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    });

    it("renders FlightLogTerminal with cat projects.txt and projects", () => {
        render(<HomePage />);
        expect(screen.getByText(/cat projects\.txt/)).toBeInTheDocument();
        expect(screen.getByText(/Pilotflows/)).toBeInTheDocument();
        expect(screen.getByText(/RosterX/)).toBeInTheDocument();
    });
});
