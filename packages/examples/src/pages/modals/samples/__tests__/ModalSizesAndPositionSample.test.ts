import { expect, test } from '@playwright/test';

test('Normal modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Normal', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Normal modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Long', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Large modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Large', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Large modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Large & Long', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Fullscreen modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Fullscreen', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Fullscreen modal with long text', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Fullscreen & Long', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Centered modal', async ({ page }) => {
  await page.goto('/modals/ModalSizesAndPositionSample');

  await page.getByText('Centered', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});
