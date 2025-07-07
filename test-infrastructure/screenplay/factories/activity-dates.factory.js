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

  static createWithCompletion(dateType = 'valid', completed = true) {
    const dateGenerators = {
      valid: () => this.createValidDates(),
      same: () => this.createSameStartAndEndDate(),
      short: () => this.createShortDuration(),
      long: () => this.createLongDuration()
    }

    return {
      dates: dateGenerators[dateType](),
      completed
    }
  }
}
