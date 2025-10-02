import { Given, Then, When } from '@cucumber/cucumber'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import EnsureDashboardPage from '~/test-infrastructure/screenplay/interactions/ensure.dashboard.page.js'
import EnsureViewDetailsPage from '~/test-infrastructure/screenplay/interactions/ensure.view.details.page.js'
import SignIn from '~/test-infrastructure/screenplay/interactions/sign.in.js'
import SignOut from '~/test-infrastructure/screenplay/interactions/sign.out.js'

Given('the user is logged out', async function () {
  await this.actor.attemptsTo(SignOut.now())
})

When(
  'the user clicks on the link to View Details page and logs in',
  async function () {
    const browseTheWeb = this.actor.ability
    const viewDetailsLink = this.actor.recalls('viewDetailsLink')
    if (!viewDetailsLink || typeof viewDetailsLink !== 'string') {
      throw new Error(
        `Expected viewDetailsLink to be a string, but got: ${typeof viewDetailsLink}`
      )
    }
    await browseTheWeb.navigateTo(viewDetailsLink)
    await this.actor.attemptsTo(SignIn.now())
  }
)

Then('subsequently redirected to the View Details page', async function () {
  await this.actor.attemptsTo(EnsureViewDetailsPage.showsAllAnswers())
})

When(
  'the user clicks on the link to the Dashboard and logs in',
  async function () {
    const browseTheWeb = this.actor.ability
    await browseTheWeb.navigateTo(DashboardPage.url)
    await this.actor.attemptsTo(SignIn.now())
  }
)

Then('subsequently redirected to the Dashboard', async function () {
  await this.actor.attemptsTo(EnsureDashboardPage.isDisplayed())
})
