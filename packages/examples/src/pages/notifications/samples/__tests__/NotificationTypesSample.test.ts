import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Info notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Info', { exact: true }).click();

  await expectScreenshot(page);
});

test('Success notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Success', { exact: true }).click();

  await expectScreenshot(page);
});

test('Warning notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Warning', { exact: true }).click();

  await expectScreenshot(page);
});

test('Error notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Error', { exact: true }).click();

  await expectScreenshot(page);
});
