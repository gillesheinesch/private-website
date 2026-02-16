import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("lists posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog");
    await expect(page.getByText("First blog article").first()).toBeVisible();
  });

  test("post detail renders markdown", async ({ page }) => {
    await page.goto("/blog/2024-11-16");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("First blog article");
    await expect(page.getByRole("heading", { level: 2 })).toContainText("Introduction");
  });
});
