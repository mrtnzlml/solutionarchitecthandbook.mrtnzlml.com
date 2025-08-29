const { test, expect } = require('@playwright/test');

test('homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading')).toContainText("The Solution Architect's Handbook");
  await expect(page.getByRole('paragraph')).toContainText(
    'Learn how to use Rossum.ai from a Solution Architect',
  );
});

test('main navigation (Learn button)', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Learn' }).click();
  await expect(page.locator('h1')).toContainText('AI training best practices');
});
