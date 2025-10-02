import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import { expect } from 'chai'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import {
  Actor,
  ApplyForExemption,
  BrowseD365,
  BrowseTheWeb,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureThatTheExemptionDetailsAreCorrect,
  NavigateToDashboard,
  RememberTheExemptionReferenceNumber,
  ViewSubmittedExemptionNotification
} from '~/test-infrastructure/screenplay'
import LoginToD365 from '~/test-infrastructure/screenplay/tasks/login.to.d365.js'

async function extractNotificationViewUrl(actor, projectName) {
  const browseTheWeb = actor.ability
  const viewDetailsSelector = DashboardPage.viewDetailsLink(projectName)

  const element = await browseTheWeb.getElement(viewDetailsSelector)
  const notificationUrl = await element.getAttribute('href')

  if (!notificationUrl) {
    throw new Error(
      `Could not extract notification URL for project: ${projectName}`
    )
  }

  const urlParts = notificationUrl.split('/')
  const exemptionId = urlParts[urlParts.length - 1]
  return `/view-details/${exemptionId}`
}

Given('the user has submitted an exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(CompleteAllTasks.now())
  await this.actor.attemptsTo(ClickReviewAndSend.now())
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
  await this.actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
})

When(
  'the internal user views the submitted exemption notification in D365',
  async function () {
    this.mmoUser = new Actor('Marcus')
    this.mmoUser.can(BrowseD365.withPlaywright())
    await this.mmoUser.attemptsTo(LoginToD365.now())
    const applicationReference = this.actor.recalls('applicationReference')
    await this.mmoUser.attemptsTo(
      ViewSubmittedExemptionNotification.forReference(applicationReference)
    )
  }
)

Then(
  'the exemption reference and project name are displayed in the case record',
  async function () {
    const completedExemptions = this.actor.recalls('completedExemptions')
    const exemption = completedExemptions[completedExemptions.length - 1]
    await this.mmoUser.attemptsTo(
      EnsureThatTheExemptionDetailsAreCorrect.forExemption(exemption)
    )
  }
)

When(
  'an unauthenticated user tries to access the notification view link',
  async function () {
    await this.actor.attemptsTo(NavigateToDashboard.now())

    const completedExemptions = this.actor.recalls('completedExemptions')
    const latestExemption = completedExemptions[completedExemptions.length - 1]
    const notificationUrl = await extractNotificationViewUrl(
      this.actor,
      latestExemption.projectName
    )

    this.notificationUrl = notificationUrl

    const browseTheWeb = this.actor.ability
    await browseTheWeb.navigateTo('/logout')

    this.unauthenticatedUser = new Actor('UnauthenticatedUser')
    this.unauthenticatedUser.can(BrowseTheWeb.using(browser))

    await this.unauthenticatedUser.ability.navigateTo(notificationUrl)
  }
)

Then('access is denied', async function () {
  const browseTheWeb = this.unauthenticatedUser.ability
  const currentUrl = await browseTheWeb.browser.getUrl()

  if (currentUrl.includes('/signin-entra')) {
    return
  }

  if (
    currentUrl.includes('/signin') ||
    currentUrl.includes('/login') ||
    currentUrl.includes('/authorize')
  ) {
    return
  }

  throw new Error(
    `Expected user to be redirected to signin-entra for ENTRA_ID authentication, but was on: ${currentUrl}`
  )
})

When(
  'the internal user follows the link to view the exemption notification from D365',
  async function () {
    const browseD365 = this.mmoUser.abilityTo('BrowseD365')

    // Wait for new page and click link simultaneously
    const [newPage] = await Promise.all([
      browseD365.context.waitForEvent('page'),
      browseD365.page.getByRole('link', { name: 'Navigate to website' }).click()
    ])

    // Wait for URL to stabilize (handles D365 authentication redirects)
    try {
      await newPage.waitForURL('**/view-details/**', {
        waitUntil: 'load',
        timeout: 30000
      })
    } catch (error) {
      // If URL wait fails, check if page is closed
      if (newPage.isClosed()) {
        console.log('New page was closed, checking all pages...')
        const pages = browseD365.context.pages()
        console.log(
          'Available pages:',
          pages.map((p) => p.url())
        )
        // Use the last opened page
        this.notificationPage = pages[pages.length - 1]
        return
      }
      throw error
    }

    // Store the new page for the next step to use
    this.notificationPage = newPage
  }
)

Then('the submitted exemption notification is displayed', async function () {
  // Use the page that navigated to the notification
  const page = this.notificationPage
  const completedExemptions = this.actor.recalls('completedExemptions')
  const latestExemption = completedExemptions[completedExemptions.length - 1]
  const pageText = await page.textContent('body')
  expect(pageText).to.contain(latestExemption.projectName)
})
