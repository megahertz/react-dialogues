import { test, expect } from '@playwright/test';

test('Close notification through instance', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 1', { exact: true }).click();
  await expect(page).toHaveScreenshot();

  await page.getByText('Close Notification 1', { exact: true }).click();
  await expect(page).toHaveScreenshot();
});

test('Update notification through instance', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 2', { exact: true }).click();
  await expect(page).toHaveScreenshot();

  await page.getByText('Update Notification 2', { exact: true }).click();
  await expect(page).toHaveScreenshot();
});

test('Close all notifications', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 1', { exact: true }).click();
  await page.getByText('Show Notification 2', { exact: true }).click();
  await expect(page).toHaveScreenshot();

  await page.getByText('Close All Notifications', { exact: true }).click();
  await expect(page).toHaveScreenshot();
});
