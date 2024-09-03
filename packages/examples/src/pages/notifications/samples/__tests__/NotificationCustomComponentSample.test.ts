import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Custom notification component', async ({ page }) => {
  await page.goto('/notifications/NotificationCustomComponentSample');

  await page.getByText('Show custom notification', { exact: true }).click();

  await expectScreenshot(page);
});
