import { test, expect } from '@playwright/test';

test('deployed application is available', async ({ page }) => {
  await page.goto('https://rammandy.github.io/mandira-playwright-todo/');

  await expect(page.getByRole('heading', { name: "Mandira's Playwright CI/CD Project" })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Test Application' })).toBeVisible();

});
