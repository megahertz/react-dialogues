import { test, expect } from '@playwright/test';

test('Info notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Info', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Success notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Success', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Warning notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Warning', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Error notification', async ({ page }) => {
  await page.goto('/notifications/NotificationTypesSample');

  await page.getByText('Error', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});
