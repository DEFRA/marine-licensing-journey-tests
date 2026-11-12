import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlPublicRegisterPage, {
  PUBLIC_REGISTER_TASK
} from '../pages/lcml.public.register.page.js'

const CARD_ID = '#public-register-card'

function cardRow(page, label) {
  return page.locator(
    `xpath=//div[@id="public-register-card"]//div[contains(@class,"govuk-summary-list__row") and .//dt[normalize-space(text())="${label}"]]`
  )
}

async function openPublicRegisterTask(page) {
  await page
    .getByRole('link', { name: PUBLIC_REGISTER_TASK, exact: true })
    .first()
    .click()
  await page.waitForLoadState('load')
}

When(
  'the user opens the Information published on the public register task',
  async function () {
    await openPublicRegisterTask(this.page)
  }
)

When(
  'the user saves {string} with reason {string} on the public register page',
  async function (answer, reason) {
    await openPublicRegisterTask(this.page)
    await new LcmlPublicRegisterPage(this.page).completeAndSave(
      answer === 'Yes',
      reason
    )
    await this.page.waitForLoadState('load')
  }
)

Then('the page asks {string}', async function (question) {
  await expect(
    this.page.locator(`xpath=//h2[normalize-space(text())="${question}"]`)
  ).toBeVisible({ timeout: 30_000 })
})

Then('the withholding reasons are hidden', async function () {
  await new LcmlPublicRegisterPage(this.page).expectReasonsNotVisible()
})

Then(
  'selecting {string} reveals the withholding reasons {string} and {string}',
  async function (answer, firstReason, secondReason) {
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    await publicRegister.selectWithhold(answer === 'Yes')
    const labels = await publicRegister.withholdReasonRadios.evaluateAll(
      (radios) =>
        radios.map((radio) =>
          document.querySelector(`label[for="${radio.id}"]`).innerText.trim()
        )
    )
    expect(labels).toEqual([firstReason, secondReason])
    for (const label of labels) {
      await expect(publicRegister.withholdReason(label)).toBeVisible({
        timeout: 30_000
      })
    }
  }
)

Then(
  'selecting {string} hides the withholding reasons',
  async function (answer) {
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    await publicRegister.selectWithhold(answer === 'Yes')
    await publicRegister.expectReasonsNotVisible()
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
