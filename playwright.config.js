import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './simple-tests',
  testMatch: /.*\.spec\.js$/,
  // Exclude bin directories and other non-Playwright test files
  testIgnore: [
    '**/bin/**',
    '**/node_modules/**',
    '**/test/**',
    '**/test-infrastructure/**'
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://http://marine-licensing-frontend.local:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})

