import { faker } from '@faker-js/faker'

export default class ActivityDatesModel {
  static formatDateToObject(date) {
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    }
  }

  static createEmptyDate() {
    return {
      day: '',
      month: '',
      year: ''
    }
  }

  static generateDate(options = {}) {
    const { calculatedStartDate, calculatedEndDate } = this.calculateDates(
      options,
      options.duration || 'normal'
    )

    return {
      startDate: calculatedStartDate
        ? this.formatDateToObject(calculatedStartDate)
        : this.createEmptyDate(),
      endDate: calculatedEndDate
        ? this.formatDateToObject(calculatedEndDate)
        : this.createEmptyDate()
    }
  }

  static calculateDates(options, duration) {
    const { startDate, endDate, sameDate, useToday, startOnly, endOnly } =
      options

    if (sameDate) return this.createSameDates()
    if (useToday) return this.createTodayBasedDates()
    if (startOnly) return this.createStartOnlyDates()
    if (endOnly) return this.createEndOnlyDates()

    return this.createDurationBasedDates(startDate, endDate, duration)
  }

  static createSameDates() {
    const date = faker.date.future({ years: 1 })
    return { calculatedStartDate: date, calculatedEndDate: date }
  }

  static createTodayBasedDates() {
    const calculatedStartDate = new Date()
    const calculatedEndDate = faker.date.soon({
      days: 7,
      refDate: calculatedStartDate
    })
    return { calculatedStartDate, calculatedEndDate }
  }

  static createStartOnlyDates() {
    return {
      calculatedStartDate: faker.date.future({ years: 1 }),
      calculatedEndDate: null
    }
  }

  static createEndOnlyDates() {
    return {
      calculatedStartDate: null,
      calculatedEndDate: faker.date.future({ years: 1 })
    }
  }

  static createDurationBasedDates(startDate, endDate, duration) {
    const calculatedStartDate =
      startDate || this.generateStartByDuration(duration)
    const calculatedEndDate =
      endDate || this.generateEndByDuration(calculatedStartDate, duration)
    return { calculatedStartDate, calculatedEndDate }
  }

  static generateStartByDuration(duration) {
    switch (duration) {
      case 'short':
        return faker.date.soon({ days: 30 })
      case 'long':
        return faker.date.soon({ days: 90 })
      default:
        return faker.date.future({ years: 1 })
    }
  }

  static generateEndByDuration(startDate, duration) {
    switch (duration) {
      case 'short':
        return faker.date.soon({ days: 7, refDate: startDate })
      case 'long':
        return faker.date.future({ years: 1, refDate: startDate })
      default:
        return faker.date.soon({ days: 180, refDate: startDate })
    }
  }

  static generateValidActivityDates() {
    return this.generateDate()
  }

  static generateSameStartAndEndDate() {
    return this.generateDate({ sameDate: true })
  }

  static generateShortDurationActivityDates() {
    return this.generateDate({ duration: 'short' })
  }

  static generateLongDurationActivityDates() {
    return this.generateDate({ duration: 'long' })
  }

  static generateTodayAsStartDate() {
    return this.generateDate({ useToday: true })
  }

  static generateEndDateOnly() {
    return this.generateDate({ endOnly: true })
  }

  static generateStartDateOnly() {
    return this.generateDate({ startOnly: true })
  }

  static generateEndDate(day, month, year) {
    return {
      day: day.toString(),
      month: month.toString(),
      year: year.toString()
    }
  }

  static generateStartDate(day, month, year) {
    return {
      day: day.toString(),
      month: month.toString(),
      year: year.toString()
    }
  }
}
