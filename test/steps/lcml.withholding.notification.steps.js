import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import DashboardPage from '../pages/dashboard.page.js'
import { getConfig } from '../support/config.js'
import { readMarineLicenceIdFromProjects } from '../support/lcml-helpers.js'
import { sendWithholdingNotificationMessage } from '../support/mas-queue.js'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  openMarineLicenceCaseInD365,
  completeSiteCheckTask,
  completePublicRegisterTask
} from '../support/d365.js'
import { redactionPath } from '../support/shared-redaction-licence.js'

const WITHHOLDING_TASK = 'Notification about withholding information'
const WITHHOLDING_PAGE_HEADING =
  'Update on the information you asked us to withhold'
const CASEWORKER_COMMENTS = [
  'We have reviewed the layout drawings you asked us to withhold.',
  'The site boundary will still be published on the public register.'
]
const DECISION_BASIS = {
  'national security': 'nationalSecurity',
  'commercial confidentiality': 'commercial'
}

const ACTION_REQUIRED = 'Action required'

const dashboardRow = (page, projectName) =>
  page.locator(`xpath=//tr[td[1][normalize-space(text())="${projectName}"]]`)

async function tellApplicant(world, decisions) {
  await sendWithholdingNotificationMessage(
    world.data.applicationReference,
    decisions
  )
  await waitForActionRequired(world)
}

async function waitForActionRequired(world) {
  await readMarineLicenceIdFromProjects(world)
  const page = world.page
  const row = dashboardRow(page, world.data.projectName)
  for (let attempt = 0; attempt < 36; attempt++) {
    if (
      ((await row.innerText().catch(() => '')) || '').includes(ACTION_REQUIRED)
    ) {
      return
    }
    await page.waitForTimeout(5_000)
    await page.reload()
    await page.waitForLoadState('load')
  }
  await expect(row).toContainText(ACTION_REQUIRED, { timeout: 10_000 })
}

function viewDetailsUrl(world, publicView = false) {
  const route = publicView ? 'view-public-details' : 'view-details'
  return new URL(
    `/marine-licence/${route}/${world.data.marineLicenceId}`,
    getConfig().baseURL
  ).toString()
}

const withholdingTask = (page) =>
  page.locator('.govuk-task-list__item').filter({ hasText: WITHHOLDING_TASK })

async function openViewDetailsWithTask(world) {
  if (!world.data.marineLicenceId) {
    await readMarineLicenceIdFromProjects(world)
  }
  const page = world.page
  for (let attempt = 0; attempt < 36; attempt++) {
    await page.goto(viewDetailsUrl(world))
    await page.waitForLoadState('load')
    if (await withholdingTask(page).count()) {
      return
    }
    await page.waitForTimeout(5_000)
  }
  await expect(withholdingTask(page)).toBeVisible({ timeout: 10_000 })
}

When(
  'the caseworker tells the applicant the outcome of their request to withhold information',
  { timeout: 300_000 },
  async function () {
    const comments = CASEWORKER_COMMENTS.join('\n\n')
    await tellApplicant(this, {
      nationalSecurity: { decision: 'AGREE_IN_PART', comments },
      commercial: { decision: 'DISAGREE', comments }
    })
  }
)

When(
  /^the caseworker tells the applicant "(AGREE|AGREE_IN_PART|DISAGREE)" about withholding information on (national security|commercial confidentiality)$/,
  { timeout: 300_000 },
  async function (decision, basis) {
    await tellApplicant(this, {
      [DECISION_BASIS[basis]]: {
        decision,
        comments: CASEWORKER_COMMENTS.join('\n\n')
      }
    })
  }
)

When(
  'the applicant opens the withholding notification',
  { timeout: 300_000 },
  async function () {
    await openViewDetailsWithTask(this)
    await withholdingTask(this.page)
      .getByRole('link', { name: WITHHOLDING_TASK })
      .click()
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('h1')).toHaveText(WITHHOLDING_PAGE_HEADING, {
      timeout: 30_000
    })
  }
)

When('the applicant marks the notification as read', async function () {
  await this.page
    .getByRole('button', { name: 'Mark as read and continue' })
    .click()
  await this.page.waitForURL(/\/marine-licence\/view-details\//, {
    timeout: 30_000
  })
  await this.page.waitForLoadState('load')
})

Then(
  'View details shows the withholding notification task as {string}',
  { timeout: 300_000 },
  async function (status) {
    await openViewDetailsWithTask(this)
    const page = this.page
    await expect(page.locator('#application-tasks-heading')).toHaveText(
      'Things that require your attention'
    )
    await expect(withholdingTask(page)).toHaveCount(1)
    await expect(withholdingTask(page)).toContainText(status)
  }
)

Then(
  'the dashboard offers View details and Withdraw for the application',
  async function () {
    const page = this.page
    await page.getByRole('link', { name: 'Submissions', exact: true }).click()
    await page.waitForLoadState('load')
    const dashboard = new DashboardPage(page)
    const projectName = this.data.projectName
    await expect(dashboardRow(page, projectName)).toContainText(
      ACTION_REQUIRED,
      { timeout: 30_000 }
    )
    await expect(dashboard.viewDetailsLink(projectName)).toBeVisible()
    await expect(dashboard.withdrawLink(projectName)).toBeVisible()
  }
)

Then(
  'the public view of the application has no {string} section',
  async function (section) {
    const page = this.page
    await page.goto(viewDetailsUrl(this, true))
    await page.waitForLoadState('load')
    await expect(page.locator('h1')).toBeVisible({ timeout: 30_000 })
    await expect(page.locator('#application-tasks-heading')).toHaveCount(0)
    await expect(page.getByText(section)).toHaveCount(0)
    await expect(page.getByText(WITHHOLDING_TASK)).toHaveCount(0)
  }
)

Then(
  "the notification gives the {string} decision {string} with the caseworker's comments",
  async function (heading, decisionText) {
    const after = (n) =>
      this.page.locator(
        `xpath=//h2[normalize-space()="${heading}"]/following-sibling::p[${n}]`
      )
    await expect(after(1)).toHaveText(decisionText)
    for (const [index, comment] of CASEWORKER_COMMENTS.entries()) {
      await expect(after(index + 2)).toHaveText(comment)
    }
  }
)

Then('the notification has no {string} section', async function (heading) {
  await expect(
    this.page.locator('h2', { hasText: new RegExp(`^${heading}$`) })
  ).toHaveCount(0)
})

Then(
  'the notification links to the Submissions page to withdraw the application',
  async function () {
    await expect(
      this.page.getByRole('link', {
        name: 'withdraw your application from your Submissions page'
      })
    ).toHaveAttribute('href', /\/submissions$/)
  }
)

const D365_STEP_TIMEOUT = 600_000
const WITHHOLD_ALL = 'Agree - withhold all of it'
const COMMERCIAL_CONFIDENTIALITY = 'Commercial or industrial confidentiality'

When(
  'the caseworker completes the Site check in D365',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const { browser, page } = await launchD365Browser()
    this.d365Browser = browser
    this.d365Page = page
    await loginToD365(page)
    await verifyD365Login(page)
    await openMarineLicenceCaseInD365(page, this.data.applicationReference)
    await completeSiteCheckTask(page)
  }
)

const caseworkerAssessment = (decision) => ({
  decision,
  rationale: 'Journey test rationale for the withholding decision.',
  tellApplicant:
    decision === WITHHOLD_ALL ? undefined : CASEWORKER_COMMENTS.join('\n\n')
})

async function savePublicRegisterTask(world, assessment) {
  const { status, redactUrl } = await completePublicRegisterTask(
    world.d365Page,
    assessment
  )
  world.data.publicRegisterTaskStatus = status
  world.data.publicRegisterRedactUrl = redactUrl
  const notifies =
    assessment.markComplete &&
    [assessment.commercial, assessment.nationalSecurity].some(
      (basis) => basis && basis.decision !== WITHHOLD_ALL
    )
  if (notifies) {
    await waitForActionRequired(world)
  }
}

When(
  /^the caseworker completes the Public register task with "(Agree - withhold all of it|Agree - but only withhold some of it|Disagree)" on commercial confidentiality and "(Agree - withhold all of it|Agree - but only withhold some of it|Disagree)" on national security$/,
  { timeout: D365_STEP_TIMEOUT },
  async function (commercial, nationalSecurity) {
    await savePublicRegisterTask(this, {
      relatesTo: 'Both',
      commercial: caseworkerAssessment(commercial),
      nationalSecurity: caseworkerAssessment(nationalSecurity),
      markComplete: true
    })
  }
)

When(
  /^the caseworker saves the Public register task with "(Agree - withhold all of it|Agree - but only withhold some of it|Disagree)" on commercial confidentiality, (marked|not marked) as complete$/,
  { timeout: D365_STEP_TIMEOUT },
  async function (decision, completion) {
    await savePublicRegisterTask(this, {
      relatesTo: COMMERCIAL_CONFIDENTIALITY,
      commercial: caseworkerAssessment(decision),
      markComplete: completion === 'marked'
    })
  }
)

Then('the Public register task is {string} in D365', function (status) {
  expect(this.data.publicRegisterTaskStatus).toBe(status)
})

Then(
  'the Public register task links to the redaction page for the application',
  function () {
    expect(this.data.publicRegisterRedactUrl).toBe(
      new URL(
        redactionPath(this.data.applicationReference),
        getConfig().baseURL
      ).toString()
    )
  }
)

const NO_NOTIFICATION_WAIT_MS = 60_000

Then(
  'View details still shows the application as "Submitted" with no withholding notification task',
  { timeout: 180_000 },
  async function () {
    if (!this.data.marineLicenceId) {
      await readMarineLicenceIdFromProjects(this)
    }
    const page = this.page
    await page.waitForTimeout(NO_NOTIFICATION_WAIT_MS)
    await page.goto(viewDetailsUrl(this))
    await page.waitForLoadState('load')
    await expect(page.locator('#application-overview-card')).toBeVisible({
      timeout: 30_000
    })
    await expect(page.locator('#application-tasks-heading')).toHaveCount(0)
    await expect(withholdingTask(page)).toHaveCount(0)
    await expect(
      page.locator(
        '#application-overview-card .govuk-summary-list__row:has(dt:text-is("Status"))'
      )
    ).toContainText('Submitted')
  }
)
