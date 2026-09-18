import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlPublicRegisterPage from '../pages/lcml.public.register.page.js'

const TASK_LINK = 'Public register'
const CARD_ID = '#public-register-card'

function cardRow(page, label) {
  return page.locator(
    `xpath=//div[@id="public-register-card"]//div[contains(@class,"govuk-summary-list__row") and .//dt[normalize-space(text())="${label}"]]`
  )
}

async function openPublicRegisterTask(page) {
  await page.getByRole('link', { name: TASK_LINK, exact: true }).first().click()
  await page.waitForLoadState('load')
}

When('the user opens the Public register task', async function () {
  await openPublicRegisterTask(this.page)
})

When(
  'the user saves {string} with details {string} on the Public register page',
  async function (answer, details) {
    await openPublicRegisterTask(this.page)
    const publicRegister = new LcmlPublicRegisterPage(this.page)

    if (answer) {
      await publicRegister.selectWithhold(answer === 'Yes')
    }
    if (details) {
      await publicRegister.reasonTextarea.fill(details)
    }
    await publicRegister.saveAndContinue.click()
    await this.page.waitForLoadState('load')
  }
)

Then('the page asks {string}', async function (question) {
  await expect(
    this.page.locator(`xpath=//h2[normalize-space(text())="${question}"]`)
  ).toBeVisible({ timeout: 30_000 })
})

Then('the withholding details field is hidden', async function () {
  await new LcmlPublicRegisterPage(this.page).expectReasonNotVisible()
})

Then(
  'selecting {string} reveals the withholding details field with a {int} character limit',
  async function (answer, limit) {
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    await publicRegister.selectWithhold(answer === 'Yes')
    await expect(publicRegister.reasonTextarea).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.locator('.govuk-character-count').first()
    ).toHaveAttribute('data-maxlength', String(limit), { timeout: 30_000 })
  }
)

Then(
  'selecting {string} hides the withholding details field',
  async function (answer) {
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    await publicRegister.selectWithhold(answer === 'Yes')
    await publicRegister.expectReasonNotVisible()
  }
)

Then(
  '{string} on the public register card is {string}',
  async function (label, value) {
    await expect(cardRow(this.page, label)).toContainText(value, {
      timeout: 30_000
    })
  }
)

Then(
  'the public register card shows {string} with no Change link',
  async function (value) {
    const card = this.page.locator(CARD_ID)
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(
      cardRow(this.page, 'Request that information is withheld')
    ).toContainText(value, { timeout: 30_000 })
    await expect(card.getByRole('link', { name: /Change/ })).toHaveCount(0)
  }
)
