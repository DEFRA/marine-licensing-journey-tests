import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'

Given('an applicant is unsure of what to do next', async function () {
  this.data = createCYACircleWGS84Data()
})

When('they launch the interactive assistance tool', async function () {
  const iatUrl = process.env.IAT_URL

  if (!iatUrl) {
    throw new Error('IAT_URL environment variable is not set')
  }

  await this.page.goto(iatUrl)
  await this.page.waitForLoadState('load')
})

Then('the welcome page is displayed', async function () {
  const heading = this.page.locator('h1')
  await expect(heading).toContainText('Check if you need a marine licence', {
    timeout: 30_000
  })
  await expect(this.page.locator('main')).toContainText(
    'Use this tool to find out:',
    { timeout: 30_000 }
  )
  await expect(this.page.locator('button:has-text("Start now")')).toBeVisible({
    timeout: 30_000
  })
})
