import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders text", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    const { container } = render(<Badge>X</Badge>);
    expect(container.firstChild).toHaveClass("bg-sky-600");
  });
});
