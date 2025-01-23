import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Custom toast component', async ({ page }) => {
  await page.goto('/toasts/ToastCustomComponentSample');

  await page.getByText('Show custom toast', { exact: true }).click();

  await expectScreenshot(page, { maxDiffPixels: 250 });
});
