import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Notification should be shown on error', async ({ page }) => {
  await page.goto('other/ButtonsSample');

  await page.getByText('Error handling', { exact: true }).click();

  await expectScreenshot(page);
});
