import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Normal modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Normal', { exact: true }).click();

  await expectScreenshot(page);
});

test('Normal modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Long', { exact: true }).click();

  await expectScreenshot(page, { maxDiffPixels: 500 });
});

test('Large modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Large', { exact: true }).click();

  await expectScreenshot(page);
});

test('Large modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Large & Long', { exact: true }).click();

  await expectScreenshot(page, { maxDiffPixels: 750 });
});

test('Fullscreen modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Fullscreen', { exact: true }).click();

  await expectScreenshot(page);
});

test('Fullscreen modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Fullscreen & Long', { exact: true }).click();

  await expectScreenshot(page, { maxDiffPixels: 800 });
});

test('Centered modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Centered', { exact: true }).click();

  await expectScreenshot(page);
});
