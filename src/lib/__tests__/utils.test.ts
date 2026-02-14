import { cn } from "../utils";

describe("cn (class merger)", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("deduplicates tailwind conflicts (tailwind-merge)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
});
