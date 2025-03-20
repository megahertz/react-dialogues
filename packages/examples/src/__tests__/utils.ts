import {
  expect,
  type PageAssertionsToHaveScreenshotOptions,
} from '@playwright/test';
import type { Page } from 'playwright';

export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: '* { animation: none !important; transition: none !important }',
  });
}

export async function expectScreenshot(
  page: Page,
  options?: PageAssertionsToHaveScreenshotOptions,
) {
  await expect(page).toHaveScreenshot({
    stylePath: 'src/__tests__/forScreenshot.css',
    maxDiffPixels: 100,
    ...options,
  });
}
