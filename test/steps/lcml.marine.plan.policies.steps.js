import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { completeManualCircleApp } from '../support/lcml-helpers.js'

function taskItem(page, taskName) {
  return page.locator('li.govuk-task-list__item', { hasText: taskName }).first()
}

Given(
  'an organisation user has completed the site details for a marine licence application',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    // Completing the site details triggers the marine plan policy query (served
    // by the marine-licensing-api-stub), which redirects to the task list once
    // the query has completed.
    await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
      timeout: 60_000
    })
  }
)

Then(
  'the marine plan policies section shows the {string} task',
  async function (taskName) {
    await expect(
      this.page.locator('h2', { hasText: 'Marine plan policies' }).first()
    ).toBeVisible({ timeout: 30_000 })
    await expect(taskItem(this.page, taskName)).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the {string} task is {string} and is not a link',
  async function (taskName, status) {
    const task = taskItem(this.page, taskName)
    await expect(task).toBeVisible({ timeout: 30_000 })
    await expect(task.locator('.govuk-task-list__status')).toContainText(
      status,
      { timeout: 30_000 }
    )
    await expect(task.locator('a')).toHaveCount(0)
  }
)

Then(
  'the {string} task is {string} and shows the number of policies to complete',
  async function (taskName, status) {
    const task = taskItem(this.page, taskName)
    await expect(task).toBeVisible({ timeout: 30_000 })
    await expect(task.locator('.govuk-task-list__status')).toContainText(
      status,
      { timeout: 30_000 }
    )
    await expect(task.locator('a')).toContainText(/\(\d+ to complete\)/, {
      timeout: 30_000
    })
  }
)

When(
  'the user opens the Marine plan policy considerations task',
  async function () {
    await this.page
      .locator('a[href="/marine-licence/marine-plan-policies"]')
      .click()
    await this.page.waitForLoadState('load')
    await expect(this.page).toHaveURL(/marine-licence\/marine-plan-policies/, {
      timeout: 30_000
    })
  }
)

Then(
  'the policy list page shows the policy count and an alphabetically sorted list of policy codes',
  async function () {
    const page = this.page
    await expect(
      page.locator('h1', { hasText: 'Marine plan policies' }).first()
    ).toBeVisible({ timeout: 30_000 })

    await expect(
      page.getByText(/\d+ policies to complete/i).first()
    ).toBeVisible({ timeout: 30_000 })

    // Extract the policy code from each row (leading e.g. "E-AGG-3"), independent
    // of whether the row is rendered as a link.
    const codes = await page
      .locator('main ul li')
      .evaluateAll((items) =>
        items
          .map(
            (li) => (li.textContent.trim().match(/^[A-Z]-[A-Z]+-\d+/) || [])[0]
          )
          .filter(Boolean)
      )
    expect(codes.length).toBeGreaterThan(0)
    expect(codes).toEqual([...codes].sort())
  }
)
