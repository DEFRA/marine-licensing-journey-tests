import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import DashboardPage from '../pages/dashboard.page.js'
import { generateIatContext } from '../test-data/exemption.js'
import {
  createCircleWGS84Data,
  createTwoSiteDatesData,
  generateExpiredActivityDates,
  generateLiveActivityDates,
  generateScheduledActivityDates
} from '../test-data/site-details.js'
import { withPublicRegister } from '../test-data/check-your-answers.js'
import { submitNotification } from '../support/task-flow.js'
import { navigateAndReAuthenticate } from '../support/navigation.js'
import { getConfig } from '../support/config.js'

const TAG_CLASSES = {
  green: 'govuk-tag--green',
  teal: 'govuk-tag--teal',
  grey: 'govuk-tag--grey',
  blue: 'govuk-tag--blue'
}

// Only articles 20 and 34 accept activity dates in the past, so any scenario
// asserting Expired has to arrive with one of those in its IAT context.
const PAST_DATES_IAT_CONTEXT = {
  articleCode: '34',
  activityTypeCode: 'REMOVAL',
  activityPurpose: 'emergency'
}

function pastDatesContext() {
  return generateIatContext(PAST_DATES_IAT_CONTEXT)
}

async function submitWithDates(world, activityDates) {
  const data = withPublicRegister(createCircleWGS84Data({ activityDates }))
  data.iatContext = pastDatesContext()
  world.data = data
  await submitNotification(world)
}

function statusTag(page, projectName) {
  return page.locator(
    `xpath=//tr[td[1][normalize-space(text())="${projectName}"]]//strong[contains(@class, "govuk-tag")]`
  )
}

Given(
  'an individual has submitted an exemption starting in the future',
  async function () {
    await submitWithDates(this, generateScheduledActivityDates())
  }
)

Given(
  'an individual has submitted an exemption running today',
  async function () {
    await submitWithDates(this, generateLiveActivityDates())
  }
)

Given(
  'an individual has submitted an exemption that has already ended',
  async function () {
    await submitWithDates(this, generateExpiredActivityDates())
  }
)

Given(
  'an individual has submitted a two-site exemption with one site ended and one running',
  async function () {
    const data = withPublicRegister(
      createTwoSiteDatesData(
        generateExpiredActivityDates(),
        generateLiveActivityDates()
      )
    )
    data.iatContext = pastDatesContext()
    this.data = data
    await submitNotification(this)
  }
)

When(
  'the user opens View details for the exemption from the dashboard',
  async function () {
    await navigateAndReAuthenticate(this, DashboardPage.path)
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectIsDisplayed()

    const link = dashboard.viewDetailsLink(this.data.projectName)
    // Recorded here because the dashboard is left behind before it is asserted.
    const tag = statusTag(this.page, this.data.projectName)
    this.data.dashboardStatus = (await tag.innerText()).trim()
    this.data.dashboardTagClass = await tag.getAttribute('class')
    this.data.hadWithdraw =
      (await dashboard.withdrawLink(this.data.projectName).count()) > 0

    this.data.viewDetailsHref = await link.getAttribute('href')
    await link.click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the dashboard row showed {string} with a {word} tag',
  function (status, colour) {
    expect(this.data.dashboardStatus).toBe(status)
    expect(this.data.dashboardTagClass).toContain(TAG_CLASSES[colour])
  }
)

Then('the dashboard row offered the Withdraw option', function () {
  expect(this.data.hadWithdraw).toBe(true)
})

Then('the dashboard row offered no Withdraw option', function () {
  expect(this.data.hadWithdraw).toBe(false)
})

Then(
  'the View details page shows the {string} status',
  async function (status) {
    const value = this.page.locator(
      'xpath=//dt[contains(text(), "Status")]/following-sibling::dd'
    )
    await expect(value).toContainText(status, { timeout: 30_000 })
  }
)

Then(
  'the public view details page shows the {string} status',
  async function (status) {
    const id = this.data.viewDetailsHref.split('/').pop()
    const config = getConfig()
    await this.page.goto(
      new URL(`/exemption/view-public-details/${id}`, config.baseURL).toString()
    )
    await this.page.waitForLoadState('load')

    const value = this.page.locator(
      'xpath=//dt[contains(text(), "Status")]/following-sibling::dd'
    )
    await expect(value).toContainText(status, { timeout: 30_000 })
  }
)
