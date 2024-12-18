import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Forward ref', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Forward ref', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 250 });
});

test('Text', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Text', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 250 });
});

test('Functional component', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Functional component', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 250 });
});

test('Class component', async ({ page }) => {
  await page.goto('popover/ChildTypesSample');

  await page.getByText('Class component', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 250 });
});

// It's unstable between different runs, haven't found a solution yet
// test('Table row', async ({ page }) => {
//   await page.goto('popover/ChildTypesSample');
//
//   await page.getByText('Row 1', { exact: true }).hover();
//
//   await expectScreenshot(page, { maxDiffPixels: 250 });
// });
