import { expect, test } from "@playwright/test";

test.describe("About page", () => {
    test("shows profile heading", async ({ page }) => {
        await page.goto("/about");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Gilles Heinesch");
    });

    test("shows Experience section", async ({ page }) => {
        await page.goto("/about");
        await expect(page.getByText(/Experience/)).toBeVisible();
    });

    test("has LinkedIn link", async ({ page }) => {
        await page.goto("/about");
        const link = page.getByRole("link", { name: /View LinkedIn/i });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/gillesheinesch/");
    });

    test("mentions Luxair", async ({ page }) => {
        await page.goto("/about");
        await expect(page.getByText(/Luxair/)).toBeVisible();
    });

    test("mentions B737 first officer role", async ({ page }) => {
        await page.goto("/about");
        await expect(page.getByText(/First Officer B737/)).toBeVisible();
    });
});
