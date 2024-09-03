import { test, expect } from '@playwright/test';

test('Custom notification component', async ({ page }) => {
  await page.goto('/notifications/NotificationCustomComponentSample');

  await page.getByText('Show custom notification', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});
