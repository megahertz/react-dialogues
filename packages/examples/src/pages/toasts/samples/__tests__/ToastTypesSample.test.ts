import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Info toast', async ({ page }) => {
  await page.goto('/toasts/ToastTypesSample');

  await page.getByText('Info', { exact: true }).click();

  await expectScreenshot(page);
});

test('Success toast', async ({ page }) => {
  await page.goto('/toasts/ToastTypesSample');

  await page.getByText('Success', { exact: true }).click();

  await expectScreenshot(page);
});

test('Warning toast', async ({ page }) => {
  await page.goto('/toasts/ToastTypesSample');

  await page.getByText('Warning', { exact: true }).click();

  await expectScreenshot(page);
});

test('Error toast', async ({ page }) => {
  await page.goto('/toasts/ToastTypesSample');

  await page.getByText('Error', { exact: true }).click();

  await expectScreenshot(page);
});
