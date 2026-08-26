import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  openPublicViewDetailsAsExternalUser,
  cardTitlesInOrder
} from '../support/lcml-helpers.js'

const APPLICATION_OVERVIEW_CARD = '#application-overview-card'
const PROJECT_DETAILS_CARD = '#project-details-card'
const ACTIVITY_CARD = '#activity-details-site-1-activity-1'
const MPP_CARD = '#marine-plan-policies-card'
const FEE_ESTIMATE_CARD = '#fee-estimate-card'
const INVOICING_CARD = '#invoicing-card'
const PUBLIC_REGISTER_CARD = '#public-register-card'

When(
  'an external user opens the public View details page using the Projects page mongo id',
  async function () {
    await openPublicViewDetailsAsExternalUser(this)
  }
)

Then(
  'the public View details page shows the project heading, Application overview and no Project name row',
  async function () {
    await expect(this.page.locator('#view-details-heading')).toHaveText(
      this.data.projectName,
      { timeout: 30_000 }
    )

    const overview = this.page.locator(APPLICATION_OVERVIEW_CARD)
    await expect(overview).toBeVisible({ timeout: 30_000 })
    await expect(overview.locator('.govuk-summary-card__title')).toHaveText(
      'Application overview',
      { timeout: 30_000 }
    )

    const projectDetails = this.page.locator(PROJECT_DETAILS_CARD)
    await expect(projectDetails).toBeVisible({ timeout: 30_000 })
    await expect(
      projectDetails.locator(
        '.govuk-summary-list__row:has(dt:text-is("Project name"))'
      )
    ).toHaveCount(0)
  }
)

Then(
  'the activity details card uses the external-user sub-activity label',
  async function () {
    const externalLabel = this.data.activity?.subOption?.externalReviewRowTitle
    const applicantLabel = this.data.activity?.subOption?.reviewRowTitle
    expect(externalLabel, 'submitted activity external label').toBeTruthy()

    const card = this.page.locator(ACTIVITY_CARD)
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(
      card.locator(
        `.govuk-summary-list__row:has(dt:text-is("${externalLabel}"))`
      )
    ).toHaveCount(1, { timeout: 30_000 })
    await expect(
      card.locator(
        `.govuk-summary-list__row:has(dt:text-is("${applicantLabel}"))`
      )
    ).toHaveCount(0)
  }
)

Then(
  "the marine plan policies card shows Applicant's consideration with no Change links",
  async function () {
    const card = this.page.locator(MPP_CARD)
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(card.locator('.govuk-summary-card__title')).toHaveText(
      'Marine plan policies',
      { timeout: 30_000 }
    )

    const titles = await cardTitlesInOrder(this.page)
    const mppIndex = titles.indexOf('Marine plan policies')
    const lastSiteOrActivity = titles.reduce(
      (last, title, index) => (/site|activity/i.test(title) ? index : last),
      -1
    )
    expect(mppIndex).toBeGreaterThan(lastSiteOrActivity)

    await expect(card).toContainText("Applicant's consideration", {
      timeout: 30_000
    })
    await expect(card).not.toContainText('Your consideration')
    await expect(
      this.page.locator(`${MPP_CARD} .govuk-summary-list__actions a`)
    ).toHaveCount(0)
  }
)

Then(
  'the fee estimate, invoicing details and sharing project information cards are not displayed',
  async function () {
    await expect(this.page.locator(FEE_ESTIMATE_CARD)).toHaveCount(0)
    await expect(this.page.locator(INVOICING_CARD)).toHaveCount(0)
    await expect(this.page.locator(PUBLIC_REGISTER_CARD)).toHaveCount(0)
  }
)
