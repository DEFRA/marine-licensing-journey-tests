import { ActivityDatesModel } from '../models/index.js'

export default class ActivityDatesFactory {
  static createValidDates() {
    return ActivityDatesModel.generateValidActivityDates()
  }
}
