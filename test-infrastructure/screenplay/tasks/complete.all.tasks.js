import { expect } from 'chai'
import {
  CompleteProjectName,
  CompletePublicRegisterTask,
  CompleteSiteDetails,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'

export default class CompleteAllTasks extends Task {
  static now() {
    return new CompleteAllTasks()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('complete all tasks'))
    }

    await actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await actor.attemptsTo(CompleteProjectName.now())
    await actor.attemptsTo(SelectTheTask.withName('Site details'))
    await actor.attemptsTo(CompleteSiteDetails.andSave())
    await actor.attemptsTo(
      SelectTheTask.withName('Sharing your project information publicly')
    )
    await actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
}
