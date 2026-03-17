import { When, Then } from '@cucumber/cucumber'
import FooterPage from '../pages/footer.page.js'
import PrivacyPolicyPage from '../pages/privacy.policy.page.js'

When('the privacy policy link is clicked', async function () {
  const footer = new FooterPage(this.page)
  await footer.clickPrivacyLink()
})

Then('the privacy policy page is displayed', async function () {
  const privacyPage = new PrivacyPolicyPage(this.page)
  await privacyPage.expectIsDisplayed()
})
