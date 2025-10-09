import { Then, When } from '@cucumber/cucumber'
import FooterPage from '~/test-infrastructure/pages/footer.page'
import {
  Click,
  EnsurePrivacyPolicyPage
} from '~/test-infrastructure/screenplay'

When('the privacy policy link is clicked', async function () {
  await this.actor.attemptsTo(
    Click.onAfterCheckingDisplay(FooterPage.locators.privacyLink)
  )
})

Then('the privacy policy page is displayed', async function () {
  await this.actor.attemptsTo(EnsurePrivacyPolicyPage.isDisplayed())
})
