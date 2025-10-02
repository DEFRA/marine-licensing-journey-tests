import { Given, Then, When } from '@cucumber/cucumber'
import EnsureDashboardPage from '~/test-infrastructure/screenplay/interactions/ensure.dashboard.page.js'
import EnsureViewDetailsPage from '~/test-infrastructure/screenplay/interactions/ensure.view.details.page.js'
import NavigateToViewDetailsLink from '~/test-infrastructure/screenplay/interactions/navigate.to.view.details.link.js'
import SignIn from '~/test-infrastructure/screenplay/interactions/sign.in.js'
import SignOut from '~/test-infrastructure/screenplay/interactions/sign.out.js'
import NavigateToDashboard from '~/test-infrastructure/screenplay/tasks/navigate.to.dashboard.js'

Given('the user is logged out', async function () {
  await this.actor.attemptsTo(SignOut.now())
})

When(
  'the user clicks on the link to View Details page and logs in',
  async function () {
    await this.actor.attemptsTo(NavigateToViewDetailsLink.now())
    await this.actor.attemptsTo(SignIn.now())
  }
)

Then('subsequently redirected to the View Details page', async function () {
  await this.actor.attemptsTo(EnsureViewDetailsPage.showsAllAnswers())
})

When(
  'the user clicks on the link to the Dashboard and logs in',
  async function () {
    await this.actor.attemptsTo(NavigateToDashboard.now())
    await this.actor.attemptsTo(SignIn.now())
  }
)

Then('subsequently redirected to the Dashboard', async function () {
  await this.actor.attemptsTo(EnsureDashboardPage.isDisplayed())
})
