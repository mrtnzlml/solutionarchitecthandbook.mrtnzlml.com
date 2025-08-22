const { test, expect } = require('@playwright/test');

test('search for a term', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search').fill('JSON Templating');

  await page.waitForSelector('.DocSearch-Hit-source');

  await expect(page.locator('.DocSearch-Hit-source').first()).toHaveText('Learn');
  await expect(page.locator('.DocSearch-Hit-title').first()).toHaveText('JSON Templating');
});
