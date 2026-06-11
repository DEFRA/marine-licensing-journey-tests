import { Given, When, Then, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeUploadApp,
  completeRandomSiteTypeApp,
  submitMarineLicence,
  openViewDetailsFromDashboard,
  openPublicViewDetailsFromDashboard
} from '../support/lcml-helpers.js'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  openD365CaseRecord
} from '../support/d365.js'

async function searchAndOpenD365Case(page, reference) {
  const searchInput = page
    .locator('input[data-id^="quickFind_text"], #SearchBoxWithTypeAhead-input')
    .first()
  await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
  await searchInput.fill(reference)
  await searchInput.press('Enter')

  const firstRow = page.locator('div[role="row"][row-index="0"]')
  await firstRow.waitFor({ state: 'visible', timeout: 30_000 })
  await firstRow.locator('div[role="gridcell"]').first().dblclick()

  await page.waitForURL(/pagetype=entityrecord.*etn=incident/, {
    timeout: 30_000
  })
  await page.waitForLoadState('load')
}

function card(page, title) {
  return page.locator(
    `.govuk-summary-card:has(.govuk-summary-card__title:text-is("${title}"))`
  )
}

function rowValue(scope, key) {
  return scope.locator(
    `.govuk-summary-list__row:has(dt:text-is("${key}")) .govuk-summary-list__value`
  )
}

Given(
  'an organisation user has submitted a marine licence application with a random site type',
  async function () {
    await completeRandomSiteTypeApp(this)
    await submitMarineLicence(this)
    if (this.attach) {
      this.attach(`random site type -> ${this.data.siteType}`, 'text/plain')
    }
  }
)

Given(
  'an organisation user has submitted a marine licence application with uploaded sites',
  async function () {
    await completeUploadApp(this)
    await submitMarineLicence(this)
  }
)

When(
  'the user opens View details for the submitted marine licence',
  async function () {
    await openViewDetailsFromDashboard(this)
  }
)

When(
  'the user opens the public View details link for the submitted marine licence',
  async function () {
    await openPublicViewDetailsFromDashboard(this)
  }
)

Then(
  'the View details page shows the site location and site card for that site type',
  async function () {
    const siteType = this.data.siteType
    const locationCard = card(this.page, 'Providing the site location')
    await expect(locationCard).toBeVisible({ timeout: 30_000 })
    await expect(locationCard).not.toContainText('File type')
    await expect(locationCard).not.toContainText('File name')

    const siteCard = card(this.page, 'Site 1')
    await expect(siteCard).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.locator('.govuk-summary-card__title', {
        hasText: 'Site 1 details'
      })
    ).toHaveCount(0, { timeout: 30_000 })

    if (siteType === 'upload') {
      await expect(locationCard).toContainText('File upload', {
        timeout: 30_000
      })
      await expect(rowValue(siteCard, 'Site name')).toContainText(/\S/, {
        timeout: 30_000
      })
    } else {
      await expect(locationCard).toContainText(
        'Enter the coordinates of the site manually',
        { timeout: 30_000 }
      )
      if (siteType === 'circle') {
        await expect(
          rowValue(siteCard, 'Single or multiple sets of coordinates')
        ).toContainText(
          'Manually enter one set of coordinates and a width to create a circular site',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Coordinate system')).toContainText(
          'WGS84',
          { timeout: 30_000 }
        )
        await expect(
          rowValue(siteCard, 'Coordinates at centre of site')
        ).toContainText('50.123456, -1.234567', { timeout: 30_000 })
        await expect(
          rowValue(siteCard, 'Width of circular site')
        ).toContainText('150 metres', { timeout: 30_000 })
      } else {
        await expect(
          rowValue(siteCard, 'Single or multiple sets of coordinates')
        ).toContainText(
          'Enter multiple sets of coordinates to mark the boundary of the site',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Start and end points')).toContainText(
          '50.100000, -1.100000',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Point 2')).toContainText(/\S/, {
          timeout: 30_000
        })
      }
    }

    await expect(rowValue(siteCard, 'Map view')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then(
  'the View details page shows the {string} site location method',
  async function (method) {
    const locationCard = card(this.page, 'Providing the site location')
    await expect(locationCard).toBeVisible({ timeout: 30_000 })
    await expect(locationCard).toContainText(method, { timeout: 30_000 })
  }
)

Then(
  'the View details page shows an uploaded site card with a name and a map',
  async function () {
    const siteCard = card(this.page, 'Site 1')
    await expect(siteCard).toBeVisible({ timeout: 30_000 })
    await expect(rowValue(siteCard, 'Site name')).toContainText(/\S/, {
      timeout: 30_000
    })
    await expect(rowValue(siteCard, 'Map view')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then('the View details page shows an activity details card', async function () {
  const activityCard = card(this.page, 'Site 1 - Activity 1')
  await expect(activityCard).toBeVisible({ timeout: 30_000 })
  const rows = [
    'Type of activity',
    'Activity description',
    'Maximum duration of activity',
    'Completion date',
    'Activity limited to specific months',
    'Proposed working hours'
  ]
  for (const key of rows) {
    await expect(rowValue(activityCard, key)).toContainText(/\S/, {
      timeout: 30_000
    })
  }
})

When(
  'the marine licence case is opened from its D365 Application URL',
  { timeout: 300_000 },
  async function () {
    const reference = this.data.applicationReference
    const applicantOrganisation = process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'

    const { browser, page: d365Page } = await launchD365Browser()
    this.d365Browser = browser
    try {
      await loginToD365(d365Page)
      await verifyD365Login(d365Page)
      await d365Page.locator('button[data-id^="ViewSelector"]').first().click()
      await d365Page
        .getByRole('menuitemradio', { name: 'Active Cases', exact: true })
        .click()
      await d365Page.waitForLoadState('load')

      let lastError = null
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          await searchAndOpenD365Case(d365Page, reference)
          lastError = null
          break
        } catch (err) {
          lastError = err
          await d365Page.waitForTimeout(10_000)
        }
      }
      if (lastError) throw lastError

      const applicationUrl = await openD365CaseRecord(
        d365Page,
        applicantOrganisation
      )

      this.internalViewPage = await d365Page.context().newPage()
      await this.internalViewPage.goto(applicationUrl, { waitUntil: 'load' })
      expect(this.internalViewPage.url()).toContain(
        '/view-marine-licence-details/'
      )
    } catch (err) {
      if (d365Page && !d365Page.isClosed()) {
        this.attach(await d365Page.screenshot({ fullPage: true }), 'image/png')
        this.attach(`D365 failure URL: ${d365Page.url()}`, 'text/plain')
      }
      throw err
    }
  }
)

Then(
  'the internal View details page shows the submitted sites and activities',
  async function () {
    const page = this.internalViewPage

    await expect(page.locator('#site-location-card')).toBeVisible({
      timeout: 30_000
    })
    await expect(card(page, 'Site 1')).toBeVisible({ timeout: 30_000 })
    await expect(card(page, 'Site 1 - Activity 1')).toBeVisible({
      timeout: 30_000
    })
  }
)

After(async function () {
  if (this.d365Browser) {
    await this.d365Browser.close()
    this.d365Browser = null
  }
})
