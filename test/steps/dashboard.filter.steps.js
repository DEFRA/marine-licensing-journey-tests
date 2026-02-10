import { Then, When } from '@cucumber/cucumber'
import {
  EnsureDashboardFilter,
  EnsureDashboardTableContent,
  SelectDashboardFilter
} from '~/test-infrastructure/screenplay'

Then(
  'the dashboard filter is displayed with {string} and {string} radio options',
  async function (option1, option2) {
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioOptionsAreDisplayed(option1, option2)
    )
  }
)

Then(
  'the {string} radio option is selected by default',
  async function (option) {
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioIsSelectedByDefault(option)
    )
  }
)

Then(
  "the {string} radio option label includes the user's organisation name",
  async function (option) {
    await this.actor.attemptsTo(
      EnsureDashboardFilter.radioLabelIncludesOrganisationName(option)
    )
  }
)

Then('the {string} button is not visible', async function (buttonText) {
  await this.actor.attemptsTo(
    EnsureDashboardFilter.buttonIsNotVisible(buttonText)
  )
})

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
