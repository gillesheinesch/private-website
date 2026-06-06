import { formatDate } from "../date";

describe("formatDate", () => {
  it("formats date as DD.MM.YYYY", () => {
    expect(formatDate("2024-11-16")).toBe("16.11.2024");
  });

  it("handles ISO date strings", () => {
    expect(formatDate("2025-02-13T12:00:00Z")).toMatch(/13\.02\.2025/);
  });

  it("handles date-like slug", () => {
    expect(formatDate("2024-01-01")).toBe("01.01.2024");
  });
});
