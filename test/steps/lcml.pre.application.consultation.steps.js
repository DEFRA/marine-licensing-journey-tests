import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { loginAndStartApplication } from '../support/lcml-helpers.js'

const TASK_LINK = 'Pre-application consultation'
const STATUS_ID = '#other-permissions-task-list-3-status'
const PAGE_PATH = '/marine-licence/public-consultation'
const TASK_LIST_PATH = '/marine-licence/task-list'
const CONSULTATION_ROW_LABEL =
  'Pre-application public groups or organisations consultation'

function consultationRow(page) {
  return page.locator(
    `xpath=//div[contains(@class,"govuk-summary-list__row") and .//dt[normalize-space(text())="${CONSULTATION_ROW_LABEL}"]]`
  )
}

function consultationPage(page) {
  return {
    yes: page.locator('#consulted'),
    no: page.locator('#consulted-2'),
    details: page.locator('#details'),
    conditional: page.locator('#conditional-consulted'),
    guidanceDetails: page.locator(
      'details.govuk-details:has(summary:has-text("Help with pre-application and public consultation"))'
    ),
    saveButton: page.locator('button:has-text("Save and continue")')
  }
}

async function openConsultationFromTaskList(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

async function saveConsultation(page, answer, details) {
  await openConsultationFromTaskList(page)
  const c = consultationPage(page)
  if (answer === 'Yes') {
    await c.yes.click()
    if (details) {
      await c.details.fill(details)
    }
  } else {
    await c.no.click()
  }
  await c.saveButton.click()
  await page.waitForLoadState('load')
}

Given(
  'an organisation user has started a marine licence application',
  async function () {
    await loginAndStartApplication(this, 'organisation')
  }
)

Given(
  'the user has saved {string} with details {string} on pre-application consultation',
  async function (answer, details) {
    await saveConsultation(this.page, answer, details)
    await expect(this.page.locator(STATUS_ID)).toContainText('Completed', {
      timeout: 30_000
    })
  }
)

When('the user views the marine licence task list', async function () {
  await expect(this.page).toHaveURL(new RegExp(TASK_LIST_PATH))
})

When('the user opens the pre-application consultation task', async function () {
  await openConsultationFromTaskList(this.page)
})

Then(
  /^selecting "(Yes|No)" (reveals|hides) the details textbox$/,
  async function (answer, action) {
    const c = consultationPage(this.page)
    if (answer === 'Yes') {
      await c.yes.click()
    } else {
      await c.no.click()
    }
    const matcher = expect(c.conditional)
    if (action === 'reveals') {
      await matcher.not.toHaveClass(/govuk-radios__conditional--hidden/, {
        timeout: 30_000
      })
      await expect(c.details).toBeVisible()
    } else {
      await matcher.toHaveClass(/govuk-radios__conditional--hidden/, {
        timeout: 30_000
      })
    }
  }
)

Then(
  'the pre-application consultation page is empty with toggleable guidance',
  async function () {
    await expect(this.page).toHaveURL(new RegExp(PAGE_PATH), {
      timeout: 30_000
    })
    await expect(this.page.locator('h1')).toContainText(
      'Have you consulted with any public groups or organisations before making this application?',
      { timeout: 30_000 }
    )
    const c = consultationPage(this.page)
    expect(await c.yes.isChecked()).toBe(false)
    expect(await c.no.isChecked()).toBe(false)
    await expect(c.conditional).toHaveClass(
      /govuk-radios__conditional--hidden/,
      { timeout: 30_000 }
    )
    const guidance = c.guidanceDetails
    expect(await guidance.evaluate((el) => el.open)).toBe(false)
    await guidance.locator('summary').click()
    expect(await guidance.evaluate((el) => el.open)).toBe(true)
    await guidance.locator('summary').click()
    expect(await guidance.evaluate((el) => el.open)).toBe(false)
  }
)

When(
  'the user answers {string} with details {string} on the pre-application consultation page',
  async function (answer, details) {
    const c = consultationPage(this.page)
    if (answer === 'Yes') {
      await c.yes.click()
      if (details) {
        await c.details.fill(details)
      }
    } else {
      await c.no.click()
    }
  }
)

When(
  'the user clicks {string} on the pre-application consultation page',
  async function (label) {
    if (label !== 'Save and continue') {
      throw new Error(`Unsupported action: ${label}`)
    }
    await consultationPage(this.page).saveButton.click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user opens the check your answers page from the task list',
  async function () {
    await this.page.locator('#review-and-send').click()
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('#check-your-answers-heading')).toBeVisible({
      timeout: 30_000
    })
  }
)

When(
  'the user changes the consultation answer to {string} via check your answers',
  async function (answer) {
    await consultationRow(this.page).locator('a:has-text("Change")').click()
    await this.page.waitForLoadState('load')
    const c = consultationPage(this.page)
    if (answer === 'Yes') {
      await c.yes.click()
    } else {
      await c.no.click()
    }
    await c.saveButton.click()
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('#check-your-answers-heading')).toBeVisible({
      timeout: 30_000
    })
  }
)

When(
  'the user views the submitted application on the projects page',
  async function () {
    await this.page.getByRole('link', { name: 'Projects' }).click()
    await this.page.waitForLoadState('load')
    const row = this.page.locator(
      `xpath=//tr[td[contains(text(), "${this.data.projectName}")]]`
    )
    await row.locator('a:has-text("View details")').click()
    await this.page.waitForLoadState('load')
  }
)

Then('the pre-application consultation page is displayed', async function () {
  await expect(this.page).toHaveURL(new RegExp(PAGE_PATH), { timeout: 30_000 })
  await expect(this.page.locator('h1')).toContainText(
    'Have you consulted with any public groups or organisations before making this application?',
    { timeout: 30_000 }
  )
})

Then('the {string} task is displayed', async function (taskName) {
  await expect(this.page.getByRole('link', { name: taskName })).toBeVisible({
    timeout: 30_000
  })
})

Then(
  'the {string} task is displayed with status {string}',
  async function (taskName, status) {
    await expect(this.page.getByRole('link', { name: taskName })).toBeVisible({
      timeout: 30_000
    })
    const statusLocator = this.page.locator(
      `xpath=//a[normalize-space(text()) = "${taskName}"]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
    )
    await expect(statusLocator).toContainText(status, { timeout: 30_000 })
  }
)

Then('the user is returned to the marine licence task list', async function () {
  await expect(this.page).toHaveURL(new RegExp(TASK_LIST_PATH), {
    timeout: 30_000
  })
})

Then(
  'the consultation answer on the check your answers page is {string}',
  async function (expected) {
    await expect(
      consultationRow(this.page).locator('dd').first()
    ).toContainText(expected, { timeout: 30_000 })
  }
)

Then(
  'the consultation answer on the view details page is {string} and read-only',
  async function (expected) {
    const row = consultationRow(this.page)
    await expect(row.locator('dd').first()).toContainText(expected, {
      timeout: 30_000
    })
    await expect(row.locator('a:has-text("Change")')).toHaveCount(0)
  }
)
