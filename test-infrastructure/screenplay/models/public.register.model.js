import { faker } from '@faker-js/faker'

export default class PublicRegisterModel {
  static REASON_MAX_LENGTH = 1000

  static generateWithholdingReason() {
    const reasons = [
      'Commercial sensitivity regarding proprietary technology',
      'Protection of intellectual property',
      'Security concerns related to infrastructure locations',
      'Environmental data requires further analysis',
      'Commercially sensitive cost information'
    ]

    return faker.helpers.arrayElement(reasons)
  }

  static generateReasonExceedingMaxLength() {
    const longText = faker.lorem.paragraphs(30, ' ')
    return longText.substring(0, this.REASON_MAX_LENGTH + 1) // 1001 characters
  }
}
