import { render, screen } from "@testing-library/react";
import { FlightLogTerminal } from "../flight-log-terminal";

const latestPost = { slug: "2026-02-09", title: "Launch of Pilotflows", date: "2026-02-09" };

describe("FlightLogTerminal", () => {
    it("renders whoami with current flying role", () => {
        render(<FlightLogTerminal />);
        expect(screen.getByText(/whoami/)).toBeInTheDocument();
        expect(screen.getByText("First Officer B737")).toBeInTheDocument();
    });

    it("renders home base", () => {
        render(<FlightLogTerminal />);
        expect(screen.getByText("ELLX")).toBeInTheDocument();
    });

    it("renders project titles from projects data", () => {
        render(<FlightLogTerminal />);
        expect(screen.getByText(/ls projects\//)).toBeInTheDocument();
        expect(screen.getByText("Pilotflows")).toBeInTheDocument();
        expect(screen.getByText("RosterX Web Application")).toBeInTheDocument();
    });

    it("links latest blog post when provided", () => {
        render(<FlightLogTerminal latestPost={latestPost} />);
        expect(screen.getByRole("link", { name: "Launch of Pilotflows" })).toHaveAttribute(
            "href",
            "/blog/2026-02-09",
        );
    });

    it("omits blog line without a post", () => {
        render(<FlightLogTerminal />);
        expect(screen.queryByText(/blog\.log/)).not.toBeInTheDocument();
    });

    it("has View projects link to /projects", () => {
        render(<FlightLogTerminal />);
        const link = screen.getByRole("link", { name: /View projects/i });
        expect(link).toHaveAttribute("href", "/projects");
    });
});
