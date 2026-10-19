import { expect } from '@playwright/test'
import { getConfig } from './config.js'
import { readMarineLicenceIdFromProjects } from './lcml-helpers.js'

export const ACTION_REQUIRED = 'Action required'

export const dashboardRow = (page, projectName) =>
  page.locator(`xpath=//tr[td[1][normalize-space(text())="${projectName}"]]`)

export async function waitForActionRequired(world) {
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

export function viewDetailsUrl(world, publicView = false) {
  const route = publicView ? 'view-public-details' : 'view-details'
  return new URL(
    `/marine-licence/${route}/${world.data.marineLicenceId}`,
    getConfig().baseURL
  ).toString()
}

export const applicationTask = (page, title) =>
  page.locator('.govuk-task-list__item').filter({ hasText: title })

export async function openViewDetailsWithTask(world, title) {
  if (!world.data.marineLicenceId) {
    await readMarineLicenceIdFromProjects(world)
  }
  const page = world.page
  for (let attempt = 0; attempt < 36; attempt++) {
    await page.goto(viewDetailsUrl(world))
    await page.waitForLoadState('load')
    if (await applicationTask(page, title).count()) {
      return
    }
    await page.waitForTimeout(5_000)
  }
  await expect(applicationTask(page, title)).toBeVisible({ timeout: 10_000 })
}
