import { faker } from '@faker-js/faker'
import {
  ACTIVITY_PURPOSE_DISPLAY,
  ACTIVITY_PURPOSES,
  ACTIVITY_TYPES,
  ARTICLE_CODES
} from './iat-constants.js'

export default class IatContextFactory {
  static generate(overrides = {}) {
    if (Object.keys(overrides).length > 0) {
      return this.generateWithOverrides(overrides)
    }

    const includeNonPurposeCombinations = faker.datatype.boolean()

    if (includeNonPurposeCombinations) {
      return this.generateNonPurposeCombination()
    }

    return this.generateFromAllValidCombinations()
  }

  static generateNonPurposeCombination() {
    const activityTypesWithoutPurpose = ACTIVITY_TYPES.filter(
      (at) => !at.supportsPurpose
    )
    const activityType = faker.helpers.arrayElement(activityTypesWithoutPurpose)
    const articleCode = faker.helpers.arrayElement(ARTICLE_CODES)

    return this.generateWithOverrides({
      activityType,
      articleCode
    })
  }

  static generateWithOverrides(overrides) {
    const activityType =
      overrides.activityType || faker.helpers.arrayElement(ACTIVITY_TYPES)
    const articleCode = this.selectArticleCode(activityType, overrides)
    const activityPurpose = this.selectActivityPurpose(activityType, overrides)
    const pdfUrl = this.generatePdfUrl(overrides)

    return {
      activityType,
      articleCode,
      activityPurpose,
      pdfUrl
    }
  }

  static selectArticleCode(activityType, overrides) {
    if (overrides.articleCode) {
      return overrides.articleCode
    }

    const purposeMap = ACTIVITY_PURPOSE_DISPLAY[activityType.code]
    const validArticleCodes = purposeMap ? Object.keys(purposeMap) : []

    const selectedArticleCode =
      validArticleCodes.length > 0
        ? faker.helpers.arrayElement(validArticleCodes)
        : faker.helpers.arrayElement(ARTICLE_CODES).code

    return ARTICLE_CODES.find((ac) => ac.code === selectedArticleCode)
  }

  static selectActivityPurpose(activityType, overrides) {
    if (overrides.activityPurpose) {
      return overrides.activityPurpose
    }

    return activityType.supportsPurpose
      ? faker.helpers.arrayElement(ACTIVITY_PURPOSES)
      : null
  }

  static generatePdfUrl(overrides) {
    return (
      overrides.pdfUrl ||
      `https://marinelicensing.marinemanagement.org.uk/path/journey/self-service/outcome-document/${faker.string.uuid()}`
    )
  }

  static getAllValidCombinations() {
    const combinations = []

    for (const [activityTypeCode, articleMap] of Object.entries(
      ACTIVITY_PURPOSE_DISPLAY
    )) {
      const activityType = ACTIVITY_TYPES.find(
        (at) => at.code === activityTypeCode
      )

      for (const articleCodeString of Object.keys(articleMap)) {
        const articleCode = ARTICLE_CODES.find(
          (ac) => ac.code === articleCodeString
        )

        combinations.push({
          activityType,
          articleCode,
          purpose: articleMap[articleCodeString]
        })
      }
    }

    return combinations
  }

  static generateFromAllValidCombinations() {
    const allCombinations = this.getAllValidCombinations()
    const selected = faker.helpers.arrayElement(allCombinations)

    return this.generateWithOverrides({
      activityType: selected.activityType,
      articleCode: selected.articleCode
    })
  }
}
