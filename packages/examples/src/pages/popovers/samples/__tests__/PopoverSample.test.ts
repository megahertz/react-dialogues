import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Popover dialog on click', async ({ page }) => {
  await page.goto('popovers/PopoverSample');

  await page.getByText('onClick', { exact: true }).click();
  await expectScreenshot(page);
});
