import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Light theme should be applied on Light btn click', async ({ page }) => {
  await page.goto('other/ThemeSample');

  await page.getByText('Light', { exact: true }).click();

  await expectScreenshot(page);
});

test('Dark theme should be applied on Dark btn click', async ({ page }) => {
  await page.goto('other/ThemeSample');

  await page.getByText('Dark', { exact: true }).click();

  await expectScreenshot(page);
});
