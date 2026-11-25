import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlPublicRegisterPage, {
  CHECK_ANSWERS_PATH,
  PUBLIC_REGISTER_TASK
} from '../pages/lcml.public.register.page.js'
import { completeWithholdingFollowUpPage } from '../support/lcml-helpers.js'

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
    await completeWithholdingFollowUpPage(this.page)
  }
)

const WITHHOLD_QUESTION =
  'Do you want to ask us to withhold any information from the public register?'
const APPROVAL_QUESTION =
  'Do you have approval from the Secretary of State for Defence to withhold information for national security reasons?'
const WITHHELD_DETAILS =
  'Journey test: the mooring positions and berth layout should not be published.'
const NOT_SHOWN = 'not shown'

const pathOf = (page) => new URL(page.url()).pathname

When(
  'the user asks to withhold information for {string} with approval {string}, and continues from the review page',
  async function (reason, approval) {
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    await openPublicRegisterTask(this.page)
    await publicRegister.completeAndSave(true, reason)
    const followUpHeading = await publicRegister.heading()

    if (publicRegister.isOnNationalSecurityPage()) {
      await publicRegister.answerNationalSecurity(approval, WITHHELD_DETAILS)
    } else {
      await publicRegister.saveCommercialConfidentialityDetails(
        WITHHELD_DETAILS
      )
    }

    const review = {
      path: pathOf(this.page),
      rows: await publicRegister.reviewRows()
    }
    await publicRegister.confirmCheckAnswers()
    await this.page.waitForURL(/marine-licence\/task-list/, {
      timeout: 30_000
    })

    this.data.withholding = { followUpHeading, review }
  }
)

Then(
  'the {string} page was shown after the withholding question',
  function (heading) {
    expect(this.data.withholding.followUpHeading).toBe(heading)
  }
)

Then(
  'the review page showed {string}, the approval {string} and the details row {string}',
  function (withholdAnswer, approvalAnswer, detailsRow) {
    const { review } = this.data.withholding
    const expected = [{ question: WITHHOLD_QUESTION, answer: withholdAnswer }]
    if (approvalAnswer !== NOT_SHOWN) {
      expected.push({ question: APPROVAL_QUESTION, answer: approvalAnswer })
    }
    if (detailsRow !== NOT_SHOWN) {
      expected.push({ question: detailsRow, answer: WITHHELD_DETAILS })
    }
    expect(review.path).toBe(CHECK_ANSWERS_PATH)
    expect(review.rows).toEqual(expected)
  }
)

Then(
  'selecting the task again shows the review page with the same answers',
  async function () {
    await openPublicRegisterTask(this.page)
    const publicRegister = new LcmlPublicRegisterPage(this.page)
    expect(pathOf(this.page)).toBe(CHECK_ANSWERS_PATH)
    expect(await publicRegister.reviewRows()).toEqual(
      this.data.withholding.review.rows
    )
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
