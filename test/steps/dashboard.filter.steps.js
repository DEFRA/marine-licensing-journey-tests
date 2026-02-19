import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { browser } from '@wdio/globals'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page'
import {
  Actor,
  BrowseD365,
  ClickButton,
  ClickWithdrawLink,
  EnsureD365CaseDetails,
  EnsureDashboardFilter,
  EnsureDashboardTableContent,
  EnsureWithdrawPage,
  LoginToD365Browser,
  NavigateToLink,
  SearchD365Case,
  SelectDashboardFilter,
  VerifyThatTheUserIsLoggedInToD365
} from '~/test-infrastructure/screenplay'

Then(
  'the dashboard filter is correctly configured with {string} selected by default',
  async function (defaultOption) {
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioOptionsAreDisplayed(
        'My projects',
        'All projects'
      )
    )
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioIsSelectedByDefault(defaultOption)
    )
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioLabelIncludesOrganisationName('All projects')
    )
    await this.actor.attemptsTo(
      EnsureDashboardFilter.buttonIsNotVisible('Update results')
    )
  }
)

When(
  'the user selects the {string} filter radio option',
  async function (option) {
    await this.actor.attemptsTo(SelectDashboardFilter.option(option))
  }
)

Then(
  'the dashboard results are updated without clicking a button',
  async function () {
    await this.actor.attemptsTo(
      EnsureDashboardFilter.buttonIsNotVisible('Update results')
    )
  }
)

Then(
  'the submitted notification row contains the correct details',
  async function (dataTable) {
    const expectedDetails = Object.fromEntries(dataTable.raw())
    await this.actor.attemptsTo(
      EnsureDashboardTableContent.withExpectedDetails(expectedDetails)
    )
  }
)

When('the user withdraws the submitted notification', async function () {
  // Wait for D365 to finish processing the submission before withdrawing
  await browser.pause(30000)
  await this.actor.attemptsTo(ClickWithdrawLink.forLastCompletedExemption())
  await this.actor.attemptsTo(
    EnsureWithdrawPage.hasCorrectHeading(
      'Are you sure you want to withdraw this project?'
    )
  )
  await this.actor.attemptsTo(EnsureWithdrawPage.hasLink('Cancel'))
  await this.actor.attemptsTo(EnsureWithdrawPage.hasLink('Back'))
  await this.actor.attemptsTo(ClickButton.withText('Yes, withdraw project'))
  await this.actor.attemptsTo(NavigateToLink.to(DashboardPage.url))
})

Then('the case status in D365 matches', async function (dataTable) {
  const expectedDetails = Object.fromEntries(dataTable.raw())

  // Resolve dynamic values from submitted exemption
  const completedExemptions = this.actor.recalls('completedExemptions') || []
  const latestExemption = completedExemptions[completedExemptions.length - 1]

  if (latestExemption) {
    for (const [key, value] of Object.entries(expectedDetails)) {
      if (value === 'matches submitted reference number') {
        expectedDetails[key] = latestExemption.applicationReference
      }
    }
  }

  // Set up D365 user
  await browser.minimizeWindow()
  this.mmoUser = new Actor('Marcus')
  this.mmoUser.can(BrowseD365.withPlaywright())

  // Login to D365
  await this.mmoUser.attemptsTo(LoginToD365Browser.now())
  await this.mmoUser.attemptsTo(VerifyThatTheUserIsLoggedInToD365.now())

  // Search for the submitted reference
  await this.mmoUser.attemptsTo(
    SearchD365Case.withReference(latestExemption.applicationReference)
  )

  // Verify case details
  await this.mmoUser.attemptsTo(EnsureD365CaseDetails.match(expectedDetails))
})

Then(
  'the public details page for the submitted notification shows the exemption is for {string}',
  async function (expectedName) {
    const completedExemptions = this.actor.recalls('completedExemptions') || []
    const latestExemption = completedExemptions[completedExemptions.length - 1]

    const viewDetailsSelector = DashboardPage.viewDetailsLink(
      latestExemption.projectName
    )
    const viewDetailsElement = await browser.$(viewDetailsSelector)
    const href = await viewDetailsElement.getAttribute('href')

    const id = href.split('/').pop()

    await browser.url(`/exemption/view-public-details/${id}`)

    const valueElement = await browser.$(
      '//dt[contains(text(), "Who the exemption is for")]/following-sibling::dd'
    )
    const actualText = await valueElement.getText()
    expect(actualText.trim()).to.include(expectedName)
  }
)
