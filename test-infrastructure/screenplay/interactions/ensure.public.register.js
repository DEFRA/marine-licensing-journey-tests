import { expect } from 'chai'
import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../base/task.js'

export default class EnsurePublicRegisterTask extends Task {
  static MODES = {
    COMPLETED_WITH_DATA: 'completed-with-data',
    COMPLETED_NO_DATA: 'completed-no-data',
    COMPLETED: 'completed',
    NOT_STARTED: 'not-started',
    PRE_POPULATED: 'pre-populated',
    NOT_PRE_POPULATED: 'not-pre-populated'
  }

  static hasBeenCompletedWith(option, withholdReason = '') {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.COMPLETED_WITH_DATA,
      option,
      withholdReason
    )
  }

  static hasNoInformationCompleted() {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.COMPLETED_NO_DATA
    )
  }

  static isCompleted() {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.COMPLETED
    )
  }

  static isNotStarted() {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.NOT_STARTED
    )
  }

  static isPrePopulated(consent) {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.PRE_POPULATED,
      consent
    )
  }

  static isNotPrePopulated() {
    return new EnsurePublicRegisterTask(
      EnsurePublicRegisterTask.MODES.NOT_PRE_POPULATED
    )
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
      case EnsurePublicRegisterTask.MODES.COMPLETED_WITH_DATA:
        await this.verifyPrepopulatedDetails(browseTheWeb)
        break
      case EnsurePublicRegisterTask.MODES.COMPLETED_NO_DATA:
        await this.verifyNoPrepopulatedDetails(browseTheWeb)
        break
      case EnsurePublicRegisterTask.MODES.COMPLETED:
        await this.verifyTaskCompleted(browseTheWeb)
        break
      case EnsurePublicRegisterTask.MODES.NOT_STARTED:
        await this.verifyTaskNotStarted(browseTheWeb)
        break
      case EnsurePublicRegisterTask.MODES.PRE_POPULATED:
        await this.verifyPrePopulated(browseTheWeb)
        break
      case EnsurePublicRegisterTask.MODES.NOT_PRE_POPULATED:
        await this.verifyNoPrepopulatedDetails(browseTheWeb)
        break
      default:
        expect.fail(`Unknown EnsurePublicRegisterTask mode: ${this.mode}`)
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
}
