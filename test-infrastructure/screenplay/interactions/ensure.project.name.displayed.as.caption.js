import Task from '../tasks/task'

export default class EnsureProjectNameDisplayedAsCaption extends Task {
  constructor(expectedProjectName) {
    super()
    this.expectedProjectName = expectedProjectName
  }

  static is(expectedProjectName) {
    return new EnsureProjectNameDisplayedAsCaption(expectedProjectName)
  }

  async performAs(actor) {
    await actor.ability.expectElementToContainText(
      'span.govuk-caption-l',
      this.expectedProjectName
    )
  }
}
