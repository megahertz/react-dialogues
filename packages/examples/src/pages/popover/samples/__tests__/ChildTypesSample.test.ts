import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Forward ref', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Forward ref', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 500 });
});

test('Text', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Text', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 500 });
});

test('Functional component', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Functional component', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 500 });
});

test('Class component', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Class component', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 500 });
});

// Table rendering makes too different snapshots between runs, so no test for it
