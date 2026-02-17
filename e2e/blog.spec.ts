import { expect, test } from "@playwright/test";

test.describe("Blog", () => {
    test("lists posts", async ({ page }) => {
        await page.goto("/blog");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog");
        await expect(page.getByText("Launch of Pilotflows").first()).toBeVisible();
    });

    test("post detail renders markdown", async ({ page }) => {
        await page.goto("/blog/2026-02-17");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Launch of Pilotflows");
        await expect(page.getByRole("heading", { level: 2 })).toContainText("Introduction");
    });

    test("unknown slug returns 404", async ({ page }) => {
        const res = await page.goto("/blog/nonexistent-9999");
        expect(res?.status()).toBe(404);
    });
});
