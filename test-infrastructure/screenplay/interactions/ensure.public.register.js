import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../tasks/task'

export default class EnsurePublicRegisterTask extends Task {
  static hasBeenCompletedWith(option, withholdReason = '') {
    return new EnsurePublicRegisterTask(true, option, withholdReason)
  }

  static hasNoInformationCompleted() {
    return new EnsurePublicRegisterTask(false, '')
  }

  constructor(hasBeenPreviouslyCompleted, option, withholdReason = '') {
    super()
    this.hasBeenPreviouslyCompleted = hasBeenPreviouslyCompleted
    this.option = option
    this.withholdReason = withholdReason
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    if (this.hasBeenPreviouslyCompleted) {
      await this.verifyPrepopulatedDetails(browseTheWeb)
    } else {
      await this.verifyNoPrepopulatedDetails(browseTheWeb)
    }
  }

  async verifyNoPrepopulatedDetails(browseTheWeb) {
    await browseTheWeb.isNotSelected(PublicRegisterPage.consent)
    await browseTheWeb.isNotSelected(PublicRegisterPage.withhold)
  }

  async verifyPrepopulatedDetails(browseTheWeb) {
    await browseTheWeb.isSelected(this.option)

    if (this.withholdReason.length > 0) {
      await browseTheWeb.expectElementToContainText(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
  }
}
