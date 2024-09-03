import { expect } from '@playwright/test';
import type { Page } from 'playwright';

export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: '* { animation: none; transition: none !important }',
  });
}

export async function expectScreenshot(page: Page) {
  await expect(page).toHaveScreenshot({
    stylePath: 'src/__tests__/forScreenshot.css',
  });
}
