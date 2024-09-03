import { expect, test } from '@playwright/test';

test('Info modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Info', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Success modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Success', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Warning modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Warning', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});

test('Error modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Error', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});
