import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";

describe("Card", () => {
    it("renders children", () => {
        render(<Card>Card content</Card>);
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("forwards ref to div", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<Card ref={ref}>Content</Card>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies base card classes", () => {
        const { container } = render(<Card>X</Card>);
        expect(container.firstChild).toHaveClass("rounded-xl", "border");
    });
});

describe("Card subcomponents", () => {
    it("CardHeader renders children", () => {
        render(<CardHeader>Header</CardHeader>);
        expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("CardTitle renders as h3", () => {
        render(<CardTitle>Title</CardTitle>);
        const heading = screen.getByRole("heading", { level: 3 });
        expect(heading).toHaveTextContent("Title");
    });

    it("CardContent renders children", () => {
        render(<CardContent>Content</CardContent>);
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("CardFooter renders children", () => {
        render(<CardFooter>Footer</CardFooter>);
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
});
