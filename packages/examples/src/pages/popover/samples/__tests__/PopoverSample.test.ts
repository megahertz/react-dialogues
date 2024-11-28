import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Popover dialog on lick', async ({ page }) => {
  await page.goto('popover/PopoverSample');

  await page.getByText('onClick', { exact: true }).click();
  await expectScreenshot(page);
});
