import { faker } from '@faker-js/faker'

export default class ActivityDatesModel {
  static generateValidActivityDates() {
    const startDate = faker.date.future({ years: 1 })
    const endDate = faker.date.soon({ days: 180, refDate: startDate })

    return {
      startDate: {
        day: startDate.getDate().toString().padStart(2, '0'),
        month: (startDate.getMonth() + 1).toString().padStart(2, '0'),
        year: startDate.getFullYear().toString()
      },
      endDate: {
        day: endDate.getDate().toString().padStart(2, '0'),
        month: (endDate.getMonth() + 1).toString().padStart(2, '0'),
        year: endDate.getFullYear().toString()
      }
    }
  }

  static generateSameStartAndEndDate() {
    const date = faker.date.future({ years: 1 })

    const dateObj = {
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    }

    return {
      startDate: dateObj,
      endDate: dateObj
    }
  }

  static generateShortDurationActivityDates() {
    const startDate = faker.date.soon({ days: 30 })
    const endDate = faker.date.soon({ days: 7, refDate: startDate })

    return {
      startDate: {
        day: startDate.getDate().toString().padStart(2, '0'),
        month: (startDate.getMonth() + 1).toString().padStart(2, '0'),
        year: startDate.getFullYear().toString()
      },
      endDate: {
        day: endDate.getDate().toString().padStart(2, '0'),
        month: (endDate.getMonth() + 1).toString().padStart(2, '0'),
        year: endDate.getFullYear().toString()
      }
    }
  }

  static generateLongDurationActivityDates() {
    const startDate = faker.date.soon({ days: 90 })
    const endDate = faker.date.future({ years: 1, refDate: startDate })

    return {
      startDate: {
        day: startDate.getDate().toString().padStart(2, '0'),
        month: (startDate.getMonth() + 1).toString().padStart(2, '0'),
        year: startDate.getFullYear().toString()
      },
      endDate: {
        day: endDate.getDate().toString().padStart(2, '0'),
        month: (endDate.getMonth() + 1).toString().padStart(2, '0'),
        year: endDate.getFullYear().toString()
      }
    }
  }

  static generateTodayAsStartDate() {
    const today = new Date()
    const endDate = faker.date.soon({ days: 7, refDate: today })

    return {
      startDate: {
        day: today.getDate().toString().padStart(2, '0'),
        month: (today.getMonth() + 1).toString().padStart(2, '0'),
        year: today.getFullYear().toString()
      },
      endDate: {
        day: endDate.getDate().toString().padStart(2, '0'),
        month: (endDate.getMonth() + 1).toString().padStart(2, '0'),
        year: endDate.getFullYear().toString()
      }
    }
  }
}
