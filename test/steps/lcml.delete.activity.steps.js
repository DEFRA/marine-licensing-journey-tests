import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { uploadCoordinatesFile } from '../support/lcml-helpers.js'

const CONFIRMATION_HEADING = 'Are you sure you want to delete this activity?'

function activityCardSelector(cardTitle) {
  return `.govuk-summary-card:has(.govuk-summary-card__title:text-is("${cardTitle}"))`
}

async function clickAddAnotherActivity(page, siteNumber) {
  await page.locator(`#add-another-activity-site-${siteNumber}`).click()
  await page.waitForLoadState('load')
}

Given(
  'an organisation user has uploaded a valid {string} file and added another activity for site {int}',
  async function (fileType, siteNumber) {
    await uploadCoordinatesFile(this, fileType)
    await clickAddAnotherActivity(this.page, siteNumber)
  }
)

Given(
  'an organisation user has uploaded a valid {string} file and added {int} more activities for site {int}',
  async function (fileType, count, siteNumber) {
    await uploadCoordinatesFile(this, fileType)
    for (let i = 0; i < count; i++) {
      await clickAddAnotherActivity(this.page, siteNumber)
    }
  }
)

When(
  'the user clicks {string} on the {string} card',
  async function (linkText, cardTitle) {
    await this.page
      .locator(`${activityCardSelector(cardTitle)} a:text-is("${linkText}")`)
      .click()
    await this.page.waitForLoadState('load')
  }
)

When('the user confirms deletion of the activity', async function () {
  await this.page.locator('button:has-text("Yes, delete activity")').click()
  await this.page.waitForLoadState('load')
})

When(
  'the user clicks {string} on the delete activity confirmation page',
  async function (action) {
    if (action === 'Back') {
      await this.page.locator('a.govuk-back-link').click()
    } else {
      await this.page.locator(`a.govuk-link:text-is("${action}")`).click()
    }
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the {string} activity card does not have a {string} link',
  async function (cardTitle, linkText) {
    await expect(
      this.page.locator(
        `${activityCardSelector(cardTitle)} a:text-is("${linkText}")`
      )
    ).toHaveCount(0)
  }
)

Then(
  'the {string} activity card has a {string} link',
  async function (cardTitle, linkText) {
    await expect(
      this.page.locator(
        `${activityCardSelector(cardTitle)} a:text-is("${linkText}")`
      )
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then('the delete activity confirmation page is displayed', async function () {
  await expect(this.page.locator('h1')).toContainText(CONFIRMATION_HEADING, {
    timeout: 30_000
  })
})

Then(
  'the confirmation page shows the activity reference {string}',
  async function (reference) {
    await expect(this.page.locator('.govuk-inset-text')).toContainText(
      reference,
      { timeout: 30_000 }
    )
  }
)

Then('the {string} activity card is visible', async function (cardTitle) {
  await expect(this.page.locator(activityCardSelector(cardTitle))).toBeVisible({
    timeout: 30_000
  })
})

Then('the {string} activity card is not displayed', async function (cardTitle) {
  await expect(this.page.locator(activityCardSelector(cardTitle))).toHaveCount(
    0
  )
})
