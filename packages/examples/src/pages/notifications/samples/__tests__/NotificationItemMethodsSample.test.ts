import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Close notification through instance', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 1', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByText('Close Notification 1', { exact: true }).click();
  await expectScreenshot(page);
});

test('Update notification through instance', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 2', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByText('Update Notification 2', { exact: true }).click();
  await expectScreenshot(page);
});

test('Close all notifications', async ({ page }) => {
  await page.goto('/notifications/NotificationItemMethodsSample');

  await page.getByText('Show Notification 1', { exact: true }).click();
  await page.getByText('Show Notification 2', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByText('Close All Notifications', { exact: true }).click();
  await expectScreenshot(page);
});
