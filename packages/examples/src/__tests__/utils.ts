import type { Page } from 'playwright';

export async function disableAnimations(page: Page) {
  // content
  await page.addStyleTag({
    content: '* { animation: none; transition: none !important }',
  });
}
