import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("all main pages are reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Aviation × Code/)).toBeVisible({ timeout: 5000 });

    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog");

    await page.goto("/projects");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Projects");

    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("About");
  });

  test("blog links to post detail", async ({ page }) => {
    await page.goto("/blog");
    const postLink = page.getByRole("link", { name: /First blog article/i }).first();
    await expect(postLink).toBeVisible();
    await postLink.click();
    await expect(page).toHaveURL(/\/blog\/2024-11-16/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("First blog article");
  });
});
