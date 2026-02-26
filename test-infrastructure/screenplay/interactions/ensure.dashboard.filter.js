import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureDashboardFilter extends Task {
  #check

  constructor(check) {
    super()
    this.#check = check
  }

  static radioOptionsAreDisplayed(option1, option2) {
    return new EnsureDashboardFilter({ type: 'radioOptions', option1, option2 })
  }

  static radioIsSelectedByDefault(option) {
    return new EnsureDashboardFilter({ type: 'defaultSelected', option })
  }

  static radioLabelIncludesOrganisationName(option) {
    return new EnsureDashboardFilter({ type: 'labelIncludesOrg', option })
  }

  static buttonIsNotVisible(buttonText) {
    return new EnsureDashboardFilter({ type: 'buttonNotVisible', buttonText })
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.#check.type) {
      case 'radioOptions':
        await browseTheWeb.expectElementToBePresent(
          DashboardPage.locators.myProjectsRadio
        )
        await browseTheWeb.expectElementToBePresent(
          DashboardPage.locators.allProjectsRadio
        )
        break

      case 'defaultSelected':
        if (this.#check.option === 'My projects') {
          await browseTheWeb.isSelected(DashboardPage.locators.myProjectsRadio)
        } else {
          await browseTheWeb.isSelected(DashboardPage.locators.allProjectsRadio)
        }
        break

      case 'labelIncludesOrg': {
        const organisationName = actor.hasMemoryOf('testUser')
          ? actor.recalls('testUser').relationships[0].organisationName
          : 'Windfarm Co'
        await browseTheWeb.expectElementToContainText(
          DashboardPage.locators.allProjectsLabel,
          organisationName
        )
        break
      }

      case 'buttonNotVisible':
        await browseTheWeb.isNotDisplayed(
          DashboardPage.locators.updateResultsButton
        )
        break
    }
  }
}
