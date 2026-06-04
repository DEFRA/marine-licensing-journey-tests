import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import DeleteSiteDetailsPage from '../pages/delete.site.details.page.js'

// These steps are shared between the marine licence and exemption journeys —
// the "Delete all site details" component and its confirmation page are common
// to both (see ML-1201 AC5 for the exemptions-consistency check).

// --- When (AC1/AC2/AC3/AC4) ---
// Selecting the option also implicitly proves it is displayed on the
// "Providing the site location" card (AC1) — the click fails if it is absent.

When('the user selects the Delete all site details option', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.deleteAllSiteDetailsLink().click()
  await this.page.waitForLoadState('load')
})

When('the user confirms deletion of all sites', async function () {
  const deletePage = new DeleteSiteDetailsPage(this.page)
  await deletePage.confirmDeletion()
  await this.page.waitForLoadState('load')
})

When(
  'the user selects {string} on the delete all sites confirmation page',
  async function (option) {
    // Both "Cancel" and "Back" return to the review page without deleting.
    const locator =
      option === 'Back'
        ? this.page.locator('.govuk-back-link')
        : this.page.locator(`main a:has-text("${option}")`)
    await locator.click()
    await this.page.waitForLoadState('load')
  }
)

// --- Then (AC2) ---

Then('the delete all sites confirmation page is displayed', async function () {
  await expect(this.page.locator('h1').first()).toContainText(
    'Are you sure you want to delete all site details?',
    { timeout: 30_000 }
  )
  await expect(
    this.page.getByRole('button', { name: 'Yes, delete all site details' })
  ).toBeVisible({ timeout: 30_000 })
})

// --- Then (AC2 / AC5 exemptions consistency) ---

Then(
  'the delete all sites confirmation page does not warn that deletion cannot be undone',
  async function () {
    await expect(this.page.locator('main')).not.toContainText(
      'This cannot be undone',
      { timeout: 30_000 }
    )
  }
)
