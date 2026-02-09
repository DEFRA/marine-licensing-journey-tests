import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndAuthenticate } from '../support/navigation.js'
import { createValidProjectNameData } from '../test-data/exemption.js'
import CookiesPolicyPage from '../pages/cookies.policy.page.js'
import CookieBannerPage from '../pages/cookie.banner.page.js'
import FooterPage from '../pages/footer.page.js'

Given('a user has not made a decision about cookies', async function () {
  this.data = createValidProjectNameData()
  await navigateAndAuthenticate(this, '/', { skipCookies: true })
})

Given('a user is on the cookies policy page', async function () {
  this.data = createValidProjectNameData()
  await navigateAndAuthenticate(this, '/')

  const footer = new FooterPage(this.page)
  await footer.clickCookiesLink()

  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.expectIsDisplayed()
})

Given('analytics cookies have been previously accepted', async function () {
  this.data = createValidProjectNameData()
  await navigateAndAuthenticate(this, '/')

  const footer = new FooterPage(this.page)
  await footer.clickCookiesLink()

  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.selectAndSave('Yes')
  await cookiesPage.expectConfirmationBanner()
})

Given('analytics cookies have been previously rejected', async function () {
  this.data = createValidProjectNameData()
  await navigateAndAuthenticate(this, '/')

  const footer = new FooterPage(this.page)
  await footer.clickCookiesLink()

  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.selectAndSave('No')
  await cookiesPage.expectConfirmationBanner()
})

Given(
  'the project name page is displayed with the cookie banner visible',
  async function () {
    this.data = createValidProjectNameData()
    await navigateAndAuthenticate(this, '/', { skipCookies: true })
  }
)

When('the cookies link is clicked in the footer', async function () {
  const footer = new FooterPage(this.page)
  await footer.clickCookiesLink()
})

When(
  'selecting Yes for analytics cookies and saving preferences',
  async function () {
    const cookiesPage = new CookiesPolicyPage(this.page)
    await cookiesPage.selectAndSave('Yes')
  }
)

When(
  'selecting No for analytics cookies and saving preferences',
  async function () {
    const cookiesPage = new CookiesPolicyPage(this.page)
    await cookiesPage.selectAndSave('No')
  }
)

When('returning to the cookies policy page', async function () {
  const footer = new FooterPage(this.page)
  await footer.clickCookiesLink()

  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.expectIsDisplayed()
})

When(
  'the analytics cookies are accepted from the cookie banner',
  async function () {
    const banner = new CookieBannerPage(this.page)
    await banner.accept()
  }
)

When(
  'the analytics cookies are rejected from the cookie banner',
  async function () {
    const banner = new CookieBannerPage(this.page)
    await banner.reject()
  }
)

Then('the cookies policy page is displayed', async function () {
  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.expectIsDisplayed()
})

Then(
  'the {string} radio button is selected for analytics cookies',
  async function (radioOption) {
    const cookiesPage = new CookiesPolicyPage(this.page)
    await cookiesPage.expectRadioSelected(radioOption)
  }
)

Then(
  'the cookie preferences confirmation banner is displayed',
  async function () {
    const cookiesPage = new CookiesPolicyPage(this.page)
    await cookiesPage.expectConfirmationBanner()
  }
)

Then('the analytics cookies are enabled', async function () {
  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.expectAnalyticsCookiesState(true)
})

Then('the analytics cookies are disabled', async function () {
  const cookiesPage = new CookiesPolicyPage(this.page)
  await cookiesPage.expectAnalyticsCookiesState(false)
})
