import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Aviation × Code/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/const flight = code\.takeoff/)).toBeVisible();
  });

  test("has nav links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /projects/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /blog/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /about/i }).first()).toBeVisible();
  });

  test("terminal shows projects from data", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/cat projects\.txt/)).toBeVisible();
    await expect(page.getByText(/Pilotflows/)).toBeVisible();
    await expect(page.getByText(/RosterX/)).toBeVisible();
  });

  test("navigates to projects", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /projects/i }).first().click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Projects");
  });
});
