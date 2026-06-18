import { Given, When, Then } from '@cucumber/cucumber'
import { getConfig } from '../support/config.js'
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'
import {
  generateIatContext,
  buildNavigationUrl
} from '../test-data/exemption.js'
import ConfirmEmployeePage from '../pages/confirm.employee.page.js'
import CheckSetupEmployeePage from '../pages/check.setup.employee.page.js'

const GUIDANCE_PATH = '/guidance/who-is-the-exemption-for'
const SUBMIT = 'button[type="submit"]:not([name="analytics"])'

// Navigate from the guidance page through to the confirm-employee page for a
// given user type. The organisation flow stops at the check-setup-employee page
// first; the individual flow goes straight to login.
async function navigateToConfirmEmployeePage(
  world,
  guidanceRadioId,
  userOptions = {}
) {
  const config = getConfig()
  world.data = { iatContext: generateIatContext() }
  world.testUser = await registerTestUser(config.defraIdUrl, userOptions)

  const url = buildNavigationUrl(GUIDANCE_PATH, world.data.iatContext)
  await world.page.goto(new URL(url, config.baseURL).toString())

  // Select the "who is the exemption for" option.
  const radio = world.page.locator(guidanceRadioId)
  try {
    await radio.waitFor({ state: 'visible', timeout: 10_000 })
    await radio.click()
    await world.page.locator(SUBMIT).click()
  } catch {
    // not on the guidance page
  }

  // Organisation flow: advance past the check-setup-employee page.
  const checkSetupRadio = world.page.locator('#checkSetupEmployee')
  try {
    await checkSetupRadio.waitFor({ state: 'visible', timeout: 5_000 })
    await checkSetupRadio.click()
    await world.page.locator(SUBMIT).click()
  } catch {
    // not on the check-setup page (individual flow)
  }

  await loginAsTestUser(world.page, world.testUser)
  await acceptCookies(world.page)
  await world.page.waitForURL(/confirm-(individual|employee)/, {
    timeout: 15_000
  })
}

const ROLE_CONFIG = {
  individual: { guidanceRadioId: '#whoIsExemptionFor', userType: 'individual' },
  organisation: {
    guidanceRadioId: '#whoIsExemptionFor-2',
    userType: 'employee'
  }
}

Given(
  'the user is on the confirm employee page as an {string}',
  async function (role) {
    const cfg = ROLE_CONFIG[role]
    await navigateToConfirmEmployeePage(this, cfg.guidanceRadioId, {
      userType: cfg.userType
    })
  }
)

Given('the user is on the check setup employee page', async function () {
  const config = getConfig()
  this.data = { iatContext: generateIatContext() }
  this.testUser = await registerTestUser(config.defraIdUrl, {
    userType: 'employee'
  })

  const url = buildNavigationUrl(GUIDANCE_PATH, this.data.iatContext)
  await this.page.goto(new URL(url, config.baseURL).toString())

  const radio = this.page.locator('#whoIsExemptionFor-2')
  await radio.waitFor({ state: 'visible', timeout: 10_000 })
  await radio.click()
  await this.page.locator(SUBMIT).click()
  await this.page.waitForURL(/check-setup-employee/, { timeout: 15_000 })
})

When('the user selects the organisation radio option', async function () {
  await new ConfirmEmployeePage(this.page).selectOrganisation()
})

When('the user selects the personal radio option', async function () {
  await new ConfirmEmployeePage(this.page).selectPersonal()
})

When('the user selects the create new account radio option', async function () {
  await new CheckSetupEmployeePage(this.page).selectCreateNewAccount()
})

When('the user selects the need to be added radio option', async function () {
  await new CheckSetupEmployeePage(this.page).selectNeedToBeAdded()
})

When('the user selects the yes I can sign in radio option', async function () {
  await new CheckSetupEmployeePage(this.page).selectYesCanSignIn()
})

When('the user clicks Continue', async function () {
  await this.page.locator(SUBMIT).click()
  await this.page.waitForLoadState('load')
})

When('the user logs in and accepts cookies', async function () {
  await loginAsTestUser(this.page, this.testUser)
  await acceptCookies(this.page)
})

// Note: `the heading {string} is displayed` is defined in
// iat.start.page.steps.js and reused here.
Then(
  'the subheading {string} is displayed',
  async function (expectedSubheading) {
    await new ConfirmEmployeePage(this.page).expectSubheading(
      expectedSubheading
    )
  }
)
