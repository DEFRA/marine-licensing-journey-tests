import Task from '../base/task.js'

export default class SelectOrganisation extends Task {
  static now() {
    return new SelectOrganisation()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    try {
      await browseTheWeb.click('input[name="currentRelationshipId"]')
      await browseTheWeb.click('#continueReplacement')
    } catch (error) {}
  }
}
