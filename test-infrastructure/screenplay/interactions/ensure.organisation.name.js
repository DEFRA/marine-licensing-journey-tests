import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import Task from '../base/task.js'

export default class EnsureOrganisationName extends Task {
  static isDisplayed() {
    return new EnsureOrganisationName()
  }

  async performAs(actor) {
    const testUser = actor.recalls('testUser')
    const expectedOrganisationName = testUser.relationships[0].organisationName

    await actor.ability.expectElementToContainText(
      CommonElementsPage.organisationName,
      expectedOrganisationName
    )
  }
}
