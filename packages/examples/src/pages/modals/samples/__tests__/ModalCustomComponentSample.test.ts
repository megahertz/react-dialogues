import { test, expect } from '@playwright/test';

test('Custom modal component', async ({ page }) => {
  await page.goto('/modals/ModalCustomComponentSample');

  await page.getByText('Show custom modal', { exact: true }).click();

  await expect(page).toHaveScreenshot();
});
