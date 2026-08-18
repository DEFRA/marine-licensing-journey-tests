import path from 'node:path'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ACTIVITY_TYPES } from '../test-data/lcml-activity.js'
import {
  navigateToReviewPage,
  clickAddTypeOfActivity,
  clickChangeTypeOfActivity,
  selectActivityTypeAndContinue,
  pickRandomNonOtherCheckbox,
  checkCheckboxById,
  submitWhatActivityForm
} from '../support/lcml-activity-flow.js'
import {
  completeConstructionDrawings,
  CONSTRUCTION_DRAWING_FILE
} from '../support/lcml-helpers.js'
import { uploadFile } from '../support/site-details-flow.js'

const CONSTRUCTION_SUBOPTION = { 'new works': 0, maintenance: 1, alteration: 2 }
const MAINTENANCE_HINT =
  "Upkeep or repair of a structure or asset that's already there, without changing its size or shape"

async function completeConstructionSubActivity(world, key) {
  const subOption =
    ACTIVITY_TYPES.Construction.subOptions[CONSTRUCTION_SUBOPTION[key]]
  world.data.activity = { topLevel: 'Construction', subOption }
  await selectActivityTypeAndContinue(world.page, 'Construction', subOption)
  const chosen = await pickRandomNonOtherCheckbox(world.page)
  world.data.activity.checkbox = chosen
  await checkCheckboxById(world.page, chosen.id)
  await submitWhatActivityForm(world.page)
}

Given(
  'an organisation user is on the Type of activity page',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
  }
)

When('the user selects the Construction activity type', async function () {
  await this.page.locator(`#${ACTIVITY_TYPES.Construction.radioId}`).check()
})

When(
  'the user completes the {string} construction sub-activity',
  async function (key) {
    await completeConstructionSubActivity(this, key)
  }
)

Then(
  'the Maintenance construction option shows the hint text',
  async function () {
    await expect(this.page.getByText(MAINTENANCE_HINT)).toBeVisible({
      timeout: 30_000
    })
  }
)

Then(
  'the construction drawing card is {string} on the review site details page',
  async function (visibility) {
    const page = this.page
    if (visibility === 'shown') {
      const card = page.locator('.govuk-summary-card', {
        hasText: 'Site 1 - Construction drawing 1'
      })
      await expect(card).toBeVisible({ timeout: 30_000 })
      await expect(card.getByRole('link', { name: 'Add' })).toBeVisible({
        timeout: 30_000
      })
    } else {
      await expect(
        page.locator('[id^="construction-drawing-site-"]')
      ).toHaveCount(0, { timeout: 30_000 })
    }
  }
)

Given(
  'an organisation user has a construction activity requiring a drawing',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    await completeConstructionSubActivity(this, 'new works')
  }
)

When('the user uploads a construction drawing', async function () {
  await completeConstructionDrawings(this.page)
})

Then('the {string} card shows the uploaded file', async function (cardTitle) {
  const card = this.page.locator('.govuk-summary-card', {
    hasText: cardTitle
  })
  await expect(card).toContainText('test.pdf', { timeout: 30_000 })
})

When(
  'the user changes the Type of activity to a non-construction option',
  async function () {
    const page = this.page
    await clickChangeTypeOfActivity(page)
    const deposit = ACTIVITY_TYPES.Deposit
    await page.locator(`#${deposit.radioId}`).check()
    await page.locator(`#${deposit.subOptions[0].radioId}`).check()
    await page.locator('button[type="submit"]:not([name="analytics"])').click()
    await page.waitForLoadState('load')
  }
)

Then(
  'the change activity confirmation warns that construction drawings will be deleted',
  async function () {
    await expect(this.page.locator('h1')).toContainText(
      'Changing your type of activity will delete any uploaded construction drawings',
      { timeout: 30_000 }
    )
  }
)

Then(
  'cancelling the change returns to the Type of activity page',
  async function () {
    const page = this.page
    await page.getByRole('link', { name: 'Cancel' }).click()
    await page.waitForLoadState('load')
    await expect(page).toHaveURL(/type-of-activity/, { timeout: 30_000 })
  }
)

Given(
  'an organisation user is on the Upload construction drawing page',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    await completeConstructionSubActivity(this, 'new works')
    await this.page
      .locator('a[href*="upload-construction-drawing"][href*="action=add"]')
      .first()
      .click()
    await this.page.waitForURL(/upload-construction-drawing/, {
      timeout: 30_000
    })
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user continues without selecting a construction drawing',
  async function () {
    await this.page.locator('button:has-text("Save and continue")').click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user uploads the {string} construction drawing',
  async function (file) {
    const page = this.page
    await page
      .locator('input[type="file"]')
      .setInputFiles(path.resolve(process.cwd(), `test/resources/${file}`))
    await page.locator('button:has-text("Save and continue")').click()
    await page.waitForLoadState('load')
  }
)

Then(
  'the construction drawing upload error {string} is displayed',
  async function (error) {
    await expect(this.page.locator('#file-id-error')).toContainText(error, {
      timeout: 90_000
    })
  }
)

async function addAndUploadAnotherDrawing(page) {
  await page.locator('#add-another-construction-drawing-site-1').click()
  await page.waitForLoadState('load')
  await page
    .locator(
      'a[href*="upload-construction-drawing"][href*="drawing=2"][href*="action=add"]'
    )
    .first()
    .click()
  await page.waitForURL(/upload-construction-drawing/, { timeout: 30_000 })
  await uploadFile(page, CONSTRUCTION_DRAWING_FILE)
  await page.waitForURL(
    (url) => url.toString().includes('review-site-details'),
    {
      timeout: 60_000
    }
  )
  await page.waitForLoadState('load')
}

Given(
  'an organisation user has uploaded a construction drawing for site 1',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    await completeConstructionSubActivity(this, 'new works')
    await completeConstructionDrawings(this.page)
  }
)

Given(
  'an organisation user has two construction drawings for site 1',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    await completeConstructionSubActivity(this, 'new works')
    await completeConstructionDrawings(this.page)
    await addAndUploadAnotherDrawing(this.page)
  }
)

When(
  'the user adds and uploads another construction drawing',
  async function () {
    await addAndUploadAnotherDrawing(this.page)
  }
)

const drawingCard = (page, cardTitle) =>
  page.locator('.govuk-summary-card', { hasText: cardTitle })

When(
  'the user {string} deleting the second construction drawing',
  async function (action) {
    const page = this.page
    await page
      .locator('a[href*="delete-construction-drawing"][href*="drawing=2"]')
      .first()
      .click()
    await page.waitForLoadState('load')
    if (action === 'confirms') {
      await page.locator('button:has-text("Yes, delete file upload")').click()
    } else {
      await page.getByRole('link', { name: 'Cancel' }).click()
    }
    await page.waitForLoadState('load')
  }
)

When(
  'the user selects Change on the first construction drawing',
  async function () {
    await this.page
      .locator(
        'a[href*="upload-construction-drawing"][href*="drawing=1"][href*="action=change"]'
      )
      .first()
      .click()
    await this.page.waitForURL(/upload-construction-drawing/, {
      timeout: 30_000
    })
  }
)

Then('the {string} card is {string}', async function (cardTitle, visibility) {
  const card = drawingCard(this.page, cardTitle)
  if (visibility === 'still shown') {
    await expect(card).toBeVisible({ timeout: 30_000 })
  } else {
    await expect(card).toHaveCount(0, { timeout: 30_000 })
  }
})

Then('the {string} page is shown', async function (heading) {
  await expect(this.page.locator('h1')).toContainText(heading, {
    timeout: 30_000
  })
})
