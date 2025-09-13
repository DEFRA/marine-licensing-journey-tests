import { Then, When } from '@cucumber/cucumber'
import {
  ClickPrivacyPolicyLink,
  EnsurePrivacyPolicyPage
} from '~/test-infrastructure/screenplay'

When('the privacy policy link is clicked', async function () {
  await this.actor.attemptsTo(ClickPrivacyPolicyLink.now())
})

Then('the privacy policy page is displayed', async function () {
  await this.actor.attemptsTo(EnsurePrivacyPolicyPage.isDisplayed())
})
