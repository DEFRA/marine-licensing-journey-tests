import { Then, When } from '@cucumber/cucumber'
import {
  ClickCookiesLink,
  EnsureCookiesPolicyPage
} from '~/test-infrastructure/screenplay'

When('the cookies link is clicked in the footer', async function () {
  await this.actor.attemptsTo(ClickCookiesLink.now())
})

Then('the cookies policy page is displayed', async function () {
  await this.actor.attemptsTo(EnsureCookiesPolicyPage.isDisplayed())
})
