import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Info modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Info', { exact: true }).click();

  await expectScreenshot(page);
});

test('Success modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Success', { exact: true }).click();

  await expectScreenshot(page);
});

test('Warning modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Warning', { exact: true }).click();

  await expectScreenshot(page);
});

test('Error modal', async ({ page }) => {
  await page.goto('/modals/ModalNotificationTypesSample');

  await page.getByText('Error', { exact: true }).click();

  await expectScreenshot(page);
});
