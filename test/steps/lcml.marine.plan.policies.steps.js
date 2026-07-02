import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { getConfig } from '../support/config.js'

const TASK_LIST_PATH = '/marine-licence/task-list'
const MPP_SECTION_HEADING = 'Marine plan policies'

function mppTaskItem(page, taskName) {
  return page.locator('.govuk-task-list__item', { hasText: taskName }).first()
}

When('the user opens the marine licence task list', async function () {
  await this.page.goto(new URL(TASK_LIST_PATH, getConfig().baseURL).toString())
  await this.page.waitForLoadState('load')
})

Then(
  'the Marine plan policies section shows a guidance link that opens in a new tab',
  async function () {
    const heading = this.page.getByRole('heading', {
      name: MPP_SECTION_HEADING,
      level: 2,
      exact: true
    })
    await expect(heading).toBeVisible({ timeout: 30_000 })

    const link = this.page.getByRole('link', {
      name: /Marine plan policies guidance/i
    })
    await expect(link.first()).toBeVisible({ timeout: 30_000 })
    await expect(link.first()).toHaveAttribute('target', '_blank', {
      timeout: 30_000
    })
  }
)

Then(
  'the {string} task has status {string}',
  async function (taskName, status) {
    const item = mppTaskItem(this.page, taskName)
    const statusLocator = item.locator('.govuk-task-list__status')

    // The task depends on the async marine plan policy query completing, so the
    // task list is reloaded until the expected status appears.
    for (let i = 0; i < 10; i++) {
      if (await statusLocator.filter({ hasText: status }).count()) {
        break
      }
      await this.page.reload({ waitUntil: 'load' })
    }

    await expect(statusLocator).toContainText(status, { timeout: 30_000 })
  }
)

Then('the {string} task is not a link', async function (taskName) {
  const item = mppTaskItem(this.page, taskName)
  await expect(item).toBeVisible({ timeout: 30_000 })
  await expect(item.locator('a')).toHaveCount(0)
})

Then(
  'the {string} task link shows the number of policies to complete',
  async function (taskName) {
    const link = mppTaskItem(this.page, taskName).locator('a')
    await expect(link).toBeVisible({ timeout: 30_000 })
    await expect(link).toContainText(/\(\d+ to complete\)/, { timeout: 30_000 })
  }
)

Then(
  'clicking the {string} task keeps the user on the task list',
  async function (taskName) {
    await mppTaskItem(this.page, taskName).locator('a').click()
    await this.page.waitForLoadState('load')
    await expect(this.page).toHaveURL(new RegExp(TASK_LIST_PATH), {
      timeout: 30_000
    })
  }
)
