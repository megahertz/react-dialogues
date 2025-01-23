/* eslint-disable no-await-in-loop */

import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('All placements should be renderer properly', async ({ page }) => {
  await page.goto('popovers/PlacementSample');

  const placements = [
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start',
  ];

  for (const placement of placements) {
    await page.getByText(placement, { exact: true }).hover();
    await expectScreenshot(page, { maxDiffPixels: 900 });
  }
});
