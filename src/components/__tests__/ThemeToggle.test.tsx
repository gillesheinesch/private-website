import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../theme-toggle";

const mockSetTheme = jest.fn();

jest.mock("next-themes", () => ({
    useTheme: () => ({ theme: "dark", setTheme: mockSetTheme }),
}));

describe("ThemeToggle", () => {
    beforeEach(() => mockSetTheme.mockClear());

    it("renders when mounted with aria-label", async () => {
        render(<ThemeToggle />);
        const btn = await screen.findByRole("button", { name: /toggle theme/i });
        expect(btn).toBeInTheDocument();
    });

    it("calls setTheme with light when clicked in dark mode", async () => {
        render(<ThemeToggle />);
        const btn = await screen.findByRole("button", { name: /toggle theme/i });
        await userEvent.click(btn);
        expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
});
