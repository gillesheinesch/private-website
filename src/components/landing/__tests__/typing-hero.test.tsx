import { render, screen } from "@testing-library/react";
import { TypingHero } from "../typing-hero";

describe("TypingHero", () => {
    it("renders all three hero lines", () => {
        render(<TypingHero />);
        expect(screen.getByText(/const flight = code\.takeoff\(\)/)).toBeInTheDocument();
        expect(screen.getByText(/Aviation enthusiast · Web developer/)).toBeInTheDocument();
        expect(screen.getByText(/→ Gilles Heinesch/)).toBeInTheDocument();
    });

    it("renders > prefix for each line", () => {
        const { container } = render(<TypingHero />);
        const prefixes = container.querySelectorAll(".text-cyan-500");
        expect(prefixes.length).toBeGreaterThanOrEqual(3);
    });
});
