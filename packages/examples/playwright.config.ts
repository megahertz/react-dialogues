import { defineConfig, devices } from '@playwright/test';

const url = 'http://localhost:3000';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: 'test-results/results',

  reporter: [['html', { outputFolder: 'test-results/report' }]],

  timeout: 10_000,
  expect: {
    timeout: 2_000,
  },

  use: {
    baseURL: url,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-font-subpixel-positioning', '--disable-lcd-text'],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],

  webServer: {
    command: 'npm run start',
    url,
    reuseExistingServer: !process.env.CI,
  },
});
