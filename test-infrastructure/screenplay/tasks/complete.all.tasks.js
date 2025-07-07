import { expect } from 'chai'
import {
  CompleteActivityDates,
  CompleteActivityDescription,
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
    await actor.attemptsTo(SelectTheTask.withName('Activity description'))
    await actor.attemptsTo(CompleteActivityDescription.now())
    await actor.attemptsTo(SelectTheTask.withName('Activity dates'))
    await actor.attemptsTo(CompleteActivityDates.now())
    await actor.attemptsTo(SelectTheTask.withName('Site details'))
    await actor.attemptsTo(CompleteSiteDetails.andSave())
    await actor.attemptsTo(SelectTheTask.withName('Public register'))
    await actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
}
