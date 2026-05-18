import { render, screen } from "@testing-library/react";
import { TypingHero } from "../typing-hero";

describe("TypingHero", () => {
    it("renders name heading and both monospace code lines", () => {
        render(<TypingHero />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Gilles Heinesch");
        expect(screen.getByText(/const flight = code\.takeoff\(\)/)).toBeInTheDocument();
        expect(screen.getByText(/Aviation enthusiast · Web developer/)).toBeInTheDocument();
    });

    // Blinking caret uses bg-cyan-500; shell prefixes use text-cyan-500 (one per CODE_LINES row).
    it("renders > prefix for each code line", () => {
        const { container } = render(<TypingHero />);
        const prefixes = container.querySelectorAll(".font-mono .text-cyan-500");
        expect(prefixes.length).toBe(2);
    });
});
