import Task from '../base/task.js'

export default class EnsureProjectNameDisplayedAsCaption extends Task {
  constructor(expectedProjectName) {
    super()
    this.expectedProjectName = expectedProjectName
  }

  static is(expectedProjectName) {
    return new EnsureProjectNameDisplayedAsCaption(expectedProjectName)
  }

  static fromMemory() {
    return new EnsureProjectNameDisplayedAsCaption()
  }

  async performAs(actor) {
    const projectName =
      this.expectedProjectName || actor.recalls('exemption').projectName
    await actor.ability.expectElementToContainText(
      'span.govuk-caption-l',
      projectName
    )
  }
}
