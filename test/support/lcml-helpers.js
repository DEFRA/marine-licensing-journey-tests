import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from './config.js'
import { registerTestUser, loginAsTestUser, acceptCookies } from './auth.js'

const USER_TYPE_CONFIG = {
  organisation: {
    userType: 'employee',
    confirmRadioId: '#confirmEmployee'
  },
  intermediary: {
    userType: 'agent',
    confirmRadioId: '#confirmAgent'
  },
  individual: {
    userType: 'individual',
    confirmRadioId: '#confirmIndividual'
  }
}

export async function loginAndStartApplication(world, role = 'employee') {
  const config = getConfig()
  const userConfig = USER_TYPE_CONFIG[role]

  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl, {
      userType: userConfig.userType
    })
  }

  const projectName = `${faker.location.city()} ${faker.company.buzzNoun()} - Phase ${faker.number.int({ min: 1, max: 9 })} ${faker.number.int({ min: 1000, max: 9999 })}`
  world.data = { role, projectName }

  await world.page.goto(new URL('/home', config.baseURL).toString())

  if (!config.isRealDefraId) {
    await loginAsTestUser(world.page, world.testUser)
  }

  await acceptCookies(world.page)

  // Confirm user type if on confirm page
  if (world.page.url().includes('/confirm-')) {
    await world.page.locator(userConfig.confirmRadioId).click()
    await world.page.locator('button[type="submit"]').click()
    await world.page.waitForLoadState('load')
  }

  // Click "Apply for a marine licence" on home page
  await world.page
    .getByRole('link', { name: 'Apply for a marine licence' })
    .click()
  await world.page.waitForLoadState('load')

  // Enter project name
  await world.page.locator('#projectName').fill(projectName)
  await world.page.locator('button:has-text("Save and continue")').click()
  await world.page.waitForLoadState('load')
}

export async function completeSpecialLegalPowers(page, answer) {
  await expect(page.locator('h2:has-text("Other permissions")')).toBeVisible({
    timeout: 30_000
  })

  await page.locator('a:has-text("Special legal powers")').click()
  await page.waitForLoadState('load')

  if (answer === 'Yes') {
    await page.locator('#agree').click()
    await page.locator('#details').fill(faker.lorem.sentence())
  } else {
    await page.locator('#agree-2').click()
  }

  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')

  await expect(
    page.locator('#other-permissions-task-list-1-status')
  ).toContainText('Completed', { timeout: 30_000 })
}
