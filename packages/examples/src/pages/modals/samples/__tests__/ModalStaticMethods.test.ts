import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Modal.show', async ({ page }) => {
  await page.goto('/modals/ModalStaticMethods');

  await page.getByText('Show Modal', { exact: true }).click();

  await expectScreenshot(page);
});

test('Modal.prompt', async ({ page }) => {
  await page.goto('/modals/ModalStaticMethods');

  await page.getByText('Show Prompt', { exact: true }).click();
  await expectScreenshot(page);

  await page.getByPlaceholder('email@example.com').fill('user@test.com');
  await page.getByText('OK', { exact: true }).click();
  await expectScreenshot(page);
});
