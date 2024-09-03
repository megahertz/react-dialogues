import { test } from '@playwright/test';
import { expectScreenshot } from '../../../../__tests__/utils';

test('Custom modal component', async ({ page }) => {
  await page.goto('/modals/ModalCustomComponentSample');

  await page.getByText('Show custom modal', { exact: true }).click();

  await expectScreenshot(page);
});
