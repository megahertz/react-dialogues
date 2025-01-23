import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Close toast through instance', async ({ page }) => {
  await page.goto('/toasts/ToastItemMethodsSample');

  await page.getByText('Show Toast 1', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByText('Close Toast 1', { exact: true }).click();
  await expectScreenshot(page);
});

test('Update toast through instance', async ({ page }) => {
  await page.goto('/toasts/ToastItemMethodsSample');

  await page.getByText('Show Toast 2', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByText('Update Toast 2', { exact: true }).click();
  await expectScreenshot(page);
});

test('Close all toasts', async ({ page }) => {
  await page.goto('/toasts/ToastItemMethodsSample');

  await page.getByText('Show Toast 1', { exact: true }).click();
  await page.getByText('Show Toast 2', { exact: true }).click();
  await expectScreenshot(page, { maxDiffPixels: 150 });

  await page.getByText('Close All Toasts', { exact: true }).click();
  await expectScreenshot(page, { maxDiffPixels: 150 });
});
