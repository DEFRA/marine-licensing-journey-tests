import { ActivityDatesModel } from '../models/index.js'

export default class ActivityDatesFactory {
  static createValidDates() {
    return ActivityDatesModel.generateValidActivityDates()
  }

  static createSameStartAndEndDate() {
    return ActivityDatesModel.generateSameStartAndEndDate()
  }

  static createShortDuration() {
    return ActivityDatesModel.generateShortDurationActivityDates()
  }

  static createLongDuration() {
    return ActivityDatesModel.generateLongDurationActivityDates()
  }

  static createCompletedDates() {
    return {
      dates: this.createValidDates(),
      completed: true
    }
  }
}
