import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  ACTIVITY_TYPES,
  OTHER_TEXTAREA_ID,
  pickRandomActivity,
  pickDifferentTopLevel,
  generateOtherTextOver1000
} from '../test-data/lcml-activity.js'
import {
  navigateToReviewPage,
  activityCardSelector,
  activityCardRow,
  clickAddTypeOfActivity,
  clickChangeTypeOfActivity,
  clickChangeWhatActivity,
  selectActivityTypeAndContinue,
  pickRandomNonOtherCheckbox,
  checkCheckboxById,
  fillOtherTextarea,
  submitWhatActivityForm
} from '../support/lcml-activity-flow.js'

function logSelection(world, prefix, topLevel, subOption) {
  const line = `${prefix} -> top-level "${topLevel}" / sub-option "${subOption.label}"`
  console.log(`\n[lcml.activity.flow] ${line}`)
  if (world?.attach) {
    world.attach(line, 'text/plain')
  }
}

// ---------- Givens ----------

Given(
  'an organisation user is on the What activity page after a random sub-option',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    const { topLevel, subOption } = pickRandomActivity()
    this.data.activity = { topLevel, subOption }
    logSelection(this, 'sub-option (any top-level)', topLevel, subOption)
    await selectActivityTypeAndContinue(this.page, topLevel, subOption)
  }
)

Given(
  'an organisation user has saved a random sub-option with a checkbox and Other text',
  async function () {
    await navigateToReviewPage(this)
    await clickAddTypeOfActivity(this.page)
    const { topLevel, subOption } = pickRandomActivity()
    const otherText = faker.lorem.sentence()
    this.data.activity = { topLevel, subOption, otherText }
    logSelection(this, 'saved sub-option (with Other)', topLevel, subOption)
    await selectActivityTypeAndContinue(this.page, topLevel, subOption)
    const chosen = await pickRandomNonOtherCheckbox(this.page)
    this.data.activity.checkbox = chosen
    console.log(
      `[lcml.activity.flow] checkbox: id=${chosen.id} label="${chosen.label}"`
    )
    await checkCheckboxById(this.page, chosen.id)
    await checkCheckboxById(this.page, ACTIVITY_TYPES[topLevel].otherCheckboxId)
    await fillOtherTextarea(this.page, otherText)
    await submitWhatActivityForm(this.page)
  }
)

// ---------- Whens ----------

When(
  'the user checks Other and enters text longer than 1000 characters',
  async function () {
    await checkCheckboxById(
      this.page,
      ACTIVITY_TYPES[this.data.activity.topLevel].otherCheckboxId
    )
    await fillOtherTextarea(this.page, generateOtherTextOver1000())
    await submitWhatActivityForm(this.page)
  }
)

When('the user selects a random checkbox and saves', async function () {
  const chosen = await pickRandomNonOtherCheckbox(this.page)
  this.data.activity.checkbox = chosen
  console.log(
    `[lcml.activity.flow] checkbox: id=${chosen.id} label="${chosen.label}"`
  )
  await checkCheckboxById(this.page, chosen.id)
  await submitWhatActivityForm(this.page)
})

When('the user checks Other, enters valid text and saves', async function () {
  const otherText = faker.lorem.sentence()
  this.data.activity.otherText = otherText
  await checkCheckboxById(
    this.page,
    ACTIVITY_TYPES[this.data.activity.topLevel].otherCheckboxId
  )
  await fillOtherTextarea(this.page, otherText)
  await submitWhatActivityForm(this.page)
})

When(
  'the user changes Type of activity and keeps the same sub-option',
  async function () {
    await clickChangeTypeOfActivity(this.page)
    const { topLevel, subOption } = this.data.activity
    await selectActivityTypeAndContinue(this.page, topLevel, subOption)
  }
)

When(
  'the user changes Type of activity to a different top-level option',
  async function () {
    await clickChangeTypeOfActivity(this.page)
    const { topLevel: newTop, config } = pickDifferentTopLevel(
      this.data.activity.topLevel
    )
    const newSub = config.subOptions[0]
    this.data.activity.newTopLevel = newTop
    this.data.activity.newSubOption = newSub
    logSelection(this, 'changed top-level', newTop, newSub)
    await selectActivityTypeAndContinue(this.page, newTop, newSub)
  }
)

When('the user clicks Change on the What activity row', async function () {
  await clickChangeWhatActivity(
    this.page,
    this.data.activity.subOption.reviewRowTitle
  )
})

// ---------- Thens ----------

Then(
  'the user sees the other-too-long error for the selected top-level',
  async function () {
    const expected =
      ACTIVITY_TYPES[this.data.activity.topLevel].errors.otherTooLong
    await expect(this.page.locator('.govuk-error-summary')).toContainText(
      expected,
      { timeout: 30_000 }
    )
  }
)

Then('the review site details page is displayed', async function () {
  await expect(this.page.locator('h1').first()).toContainText(
    'Review site details',
    { timeout: 30_000 }
  )
})

Then(
  "the activity details card shows the sub-option's review row title",
  async function () {
    const card = this.page.locator(activityCardSelector())
    await expect(card).toContainText(
      this.data.activity.subOption.reviewRowTitle,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the row contains the selected checkbox label as a bullet',
  async function () {
    const row = this.page.locator(
      activityCardRow(this.data.activity.subOption.reviewRowTitle)
    )
    await expect(row.locator('ul li')).toContainText(
      this.data.activity.checkbox.label,
      { timeout: 30_000 }
    )
  }
)

Then('that row has a Change link', async function () {
  const row = this.page.locator(
    activityCardRow(this.data.activity.subOption.reviewRowTitle)
  )
  await expect(row.locator('a:text("Change")')).toBeVisible({ timeout: 30_000 })
})

Then(
  'the activity details card row contains the Other prefix and the entered text',
  async function () {
    const { topLevel, subOption, otherText } = this.data.activity
    const prefix = ACTIVITY_TYPES[topLevel].otherPrefix
    const row = this.page.locator(activityCardRow(subOption.reviewRowTitle))
    await expect(row).toContainText(`${prefix}: ${otherText}`, {
      timeout: 30_000
    })
  }
)

Then(
  'the previously selected checkbox and Other text are preserved on the What activity page',
  async function () {
    const { topLevel, checkbox, otherText } = this.data.activity
    await expect(this.page.locator(`#${checkbox.id}`)).toBeChecked({
      timeout: 30_000
    })
    await expect(
      this.page.locator(`#${ACTIVITY_TYPES[topLevel].otherCheckboxId}`)
    ).toBeChecked({ timeout: 30_000 })
    await expect(this.page.locator(`#${OTHER_TEXTAREA_ID}`)).toHaveValue(
      otherText,
      { timeout: 30_000 }
    )
  }
)

Then(
  'all checkboxes are unchecked and the Other textbox is cleared and hidden',
  async function () {
    const checkedCount = await this.page
      .locator('input[type="checkbox"][name="activities"]:checked')
      .count()
    expect(checkedCount).toBe(0)
    await expect(this.page.locator(`#${OTHER_TEXTAREA_ID}`)).toBeHidden({
      timeout: 30_000
    })
  }
)

Then(
  'the previously selected checkbox and Other text are defaulted on the page',
  async function () {
    const { checkbox, otherText } = this.data.activity
    await expect(this.page.locator(`#${checkbox.id}`)).toBeChecked({
      timeout: 30_000
    })
    await expect(this.page.locator(`#${OTHER_TEXTAREA_ID}`)).toHaveValue(
      otherText,
      { timeout: 30_000 }
    )
  }
)
