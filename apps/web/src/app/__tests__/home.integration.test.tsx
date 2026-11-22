import { render, screen } from "@testing-library/react";
import HomePage from "../(home)/page";

describe("Home page (integration)", () => {
    it("renders hero name and monospace tag line", () => {
        render(<HomePage />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Gilles Heinesch/);
        expect(screen.getByText(/First Officer B737 · Software for pilots/)).toBeInTheDocument();
    });

    it("renders typing line const flight = code.takeoff()", () => {
        render(<HomePage />);
        expect(screen.getByText(/const flight = code\.takeoff\(\)/)).toBeInTheDocument();
    });

    it("renders Projects, Blog, About links", () => {
        render(<HomePage />);
        expect(screen.getByRole("link", { name: /^projects$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^blog$/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
    });

    it("renders flight log with projects and latest blog post", () => {
        render(<HomePage />);
        expect(screen.getByText("Pilotflows")).toBeInTheDocument();
        expect(screen.getByText("RosterX Web Application")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Launch of Pilotflows" })).toHaveAttribute(
            "href",
            "/blog/2026-02-09",
        );
    });
});
