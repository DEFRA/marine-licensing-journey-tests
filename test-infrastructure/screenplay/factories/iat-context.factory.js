import { faker } from '@faker-js/faker'
import {
  ACTIVITY_PURPOSES,
  ACTIVITY_TYPES,
  ARTICLE_CODES,
  ACTIVITY_PURPOSE_DISPLAY
} from './iat-constants.js'

export default class IatContextFactory {
  static generateIatContext(overrides = {}) {
    const activityType =
      overrides.activityType || faker.helpers.arrayElement(ACTIVITY_TYPES)
    const purposeMap = ACTIVITY_PURPOSE_DISPLAY[activityType.code]
    const validArticleCodes = purposeMap ? Object.keys(purposeMap) : []

    const selectedArticleCode =
      overrides.articleCode?.code ||
      (validArticleCodes.length > 0
        ? faker.helpers.arrayElement(validArticleCodes)
        : faker.helpers.arrayElement(ARTICLE_CODES).code)

    const articleCode = ARTICLE_CODES.find(
      (ac) => ac.code === selectedArticleCode
    )

    const activityPurpose =
      overrides.activityPurpose ||
      (activityType.supportsPurpose
        ? faker.helpers.arrayElement(ACTIVITY_PURPOSES)
        : null)

    const pdfUrl =
      overrides.pdfUrl ||
      `https://marinelicensing.marinemanagement.org.uk/path/journey/self-service/outcome-document/${faker.string.uuid()}`

    return {
      activityType,
      articleCode,
      activityPurpose,
      pdfUrl
    }
  }

  static generateValidPurposeCombination() {
    const activityTypesWithPurpose = ACTIVITY_TYPES.filter(
      (at) => at.supportsPurpose
    )
    const activityType = faker.helpers.arrayElement(activityTypesWithPurpose)
    const purposeMap = ACTIVITY_PURPOSE_DISPLAY[activityType.code]
    const validArticleCodes = Object.keys(purposeMap)
    const selectedArticleCode = faker.helpers.arrayElement(validArticleCodes)
    const articleCode = ARTICLE_CODES.find(
      (ac) => ac.code === selectedArticleCode
    )

    return this.generateIatContext({
      activityType,
      articleCode
    })
  }

  static generateInvalidPurposeCombination() {
    const activityTypesWithoutPurpose = ACTIVITY_TYPES.filter(
      (at) => !at.supportsPurpose
    )
    const activityType = faker.helpers.arrayElement(activityTypesWithoutPurpose)
    const articleCode = faker.helpers.arrayElement(ARTICLE_CODES)

    return this.generateIatContext({
      activityType,
      articleCode
    })
  }
}
