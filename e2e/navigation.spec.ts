import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
    test("navbar shows full name", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("link", { name: /Gilles Heinesch/i })).toBeVisible();
    });

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

    test("projects lists Pilotflows and RosterX", async ({ page }) => {
        await page.goto("/projects");
        await expect(page.getByText(/Pilotflows/)).toBeVisible();
        await expect(page.getByText(/RosterX/)).toBeVisible();
    });

    test("blog links to post detail", async ({ page }) => {
        await page.goto("/blog");
        const postLink = page.getByRole("link", { name: /Launch of Pilotflows/i }).first();
        await expect(postLink).toBeVisible();
        await postLink.click();
        await expect(page).toHaveURL(/\/blog\/2026-02-17/);
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Launch of Pilotflows");
    });
});
