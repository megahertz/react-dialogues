import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Basic tooltip', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Hover me', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 650 });
});

test('Large Tooltip text should be flipped', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Large text', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 700 });
});

test('Tooltip should support setting color', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Colored', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 450 });
});

test('Tooltip should support disabling', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Disabled', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 450 });
});

test('Arrow should be placed correctly when long width', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Long target width', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 650 });
});

test('Arrow should be placed correctly when long height', async ({ page }) => {
  await page.goto('popovers/TooltipSample');

  await page.getByText('Long', { exact: true }).hover();
  await expectScreenshot(page, { maxDiffPixels: 200 });
});
