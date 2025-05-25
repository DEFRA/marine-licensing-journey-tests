import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../base/task.js'

export default class EnsurePublicRegisterTask extends Task {
  static hasBeenCompletedWith(option, withholdReason = '') {
    return new EnsurePublicRegisterTask(true, option, withholdReason)
  }

  static hasNoInformationCompleted() {
    return new EnsurePublicRegisterTask(false, '')
  }

  static isCompleted() {
    return new EnsurePublicRegisterTask('completed')
  }

  static isNotStarted() {
    return new EnsurePublicRegisterTask('not-started')
  }

  static isPrePopulated(consent) {
    return new EnsurePublicRegisterTask('pre-populated', consent)
  }

  static isNotPrePopulated() {
    return new EnsurePublicRegisterTask('not-pre-populated')
  }

  constructor(mode, option = null, withholdReason = '') {
    super()
    this.mode = mode
    this.option = option
    this.withholdReason = withholdReason
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.mode) {
      case true:
        await this.verifyPrepopulatedDetails(browseTheWeb)
        break
      case false:
        await this.verifyNoPrepopulatedDetails(browseTheWeb)
        break
      case 'completed':
        await this.verifyTaskCompleted(browseTheWeb)
        break
      case 'not-started':
        await this.verifyTaskNotStarted(browseTheWeb)
        break
      case 'pre-populated':
        await this.verifyPrePopulated(browseTheWeb)
        break
      case 'not-pre-populated':
        await this.verifyNotPrePopulated(browseTheWeb)
        break
    }
  }

  async verifyNoPrepopulatedDetails(browseTheWeb) {
    await browseTheWeb.isNotSelected(PublicRegisterPage.consent)
    await browseTheWeb.isNotSelected(PublicRegisterPage.withhold)
  }

  async verifyPrepopulatedDetails(browseTheWeb) {
    const selector = PublicRegisterPage.getConsentSelector(this.option)
    await browseTheWeb.isSelected(selector)

    if (this.withholdReason.length > 0) {
      await browseTheWeb.expectElementToContainText(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
  }

  async verifyTaskCompleted(browseTheWeb) {
    await browseTheWeb.expectElementToContainText(
      '[data-testid="public-register-task"]',
      'Completed'
    )
  }

  async verifyTaskNotStarted(browseTheWeb) {
    await browseTheWeb.expectElementToContainText(
      '[data-testid="public-register-task"]',
      'Not started'
    )
  }

  async verifyPrePopulated(browseTheWeb) {
    const selector = PublicRegisterPage.getConsentSelector(this.option)
    await browseTheWeb.isSelected(selector)
  }

  async verifyNotPrePopulated(browseTheWeb) {
    await browseTheWeb.isNotSelected(PublicRegisterPage.consent)
    await browseTheWeb.isNotSelected(PublicRegisterPage.withhold)
  }
}
