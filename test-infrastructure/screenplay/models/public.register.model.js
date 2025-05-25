import { faker } from '@faker-js/faker'

export default class PublicRegisterModel {
  static REASON_MAX_LENGTH = 1000

  static WITHHOLDING_REASONS = [
    'Commercial sensitivity regarding proprietary technology and operational methods',
    'Protection of intellectual property related to innovative marine engineering solutions',
    'Confidential business information that could affect competitive advantage',
    'Security concerns related to critical infrastructure locations and specifications',
    'Environmental data that requires further analysis before public disclosure',
    'Commercially sensitive cost information and financial arrangements',
    'Technical specifications that constitute trade secrets',
    'Ongoing negotiations with stakeholders that require confidentiality',
    'Preliminary environmental impact data pending final assessment',
    'Proprietary survey data and methodological approaches',
    'Commercial arrangements with suppliers and contractors',
    'Risk assessment data that requires expert interpretation',
    'Detailed operational procedures that constitute competitive advantage',
    'Financial modelling and commercial viability assessments',
    'Stakeholder consultation responses containing sensitive information'
  ]

  static REASON_THEMES = {
    commercial: [
      'Commercial sensitivity',
      'Competitive advantage',
      'Proprietary information',
      'Trade secrets',
      'Financial confidentiality'
    ],
    security: [
      'Security concerns',
      'Critical infrastructure protection',
      'Operational security',
      'Location sensitivity'
    ],
    technical: [
      'Technical specifications',
      'Proprietary technology',
      'Innovative methods',
      'Engineering solutions'
    ],
    environmental: [
      'Environmental data analysis',
      'Impact assessment pending',
      'Survey data interpretation',
      'Ecological sensitivity'
    ]
  }

  static generateConsentChoice(shouldConsent = null) {
    if (shouldConsent !== null) {
      return shouldConsent ? 'no' : 'yes'
    }
    return faker.helpers.arrayElement(['yes', 'no'])
  }

  static generateWithholdingReason(options = {}) {
    const { theme, maxLength = this.REASON_MAX_LENGTH } = options

    let reason

    if (theme && this.REASON_THEMES[theme]) {
      const themeReasons = this.REASON_THEMES[theme]
      const baseReason = faker.helpers.arrayElement(themeReasons)
      reason = `${baseReason} - ${faker.lorem.sentence()}`
    } else {
      reason = faker.helpers.arrayElement(this.WITHHOLDING_REASONS)
    }

    if (faker.datatype.boolean(0.3)) {
      reason += ` ${faker.lorem.sentence()}`
    }

    if (reason.length > maxLength) {
      reason = reason.substring(0, maxLength).trim()
      const lastPeriod = reason.lastIndexOf('.')
      if (lastPeriod > 0) {
        reason = reason.substring(0, lastPeriod + 1)
      }
    }

    return reason
  }

  static generateOversizedReason() {
    const baseText = faker.lorem.paragraphs(10, ' ')
    return baseText.substring(0, this.REASON_MAX_LENGTH + 1)
  }

  static generateBoundaryTestReasons() {
    return {
      empty: '',
      singleChar: 'A',
      exactlyMaxLength: 'A'.repeat(this.REASON_MAX_LENGTH),
      overMaxLength: 'A'.repeat(this.REASON_MAX_LENGTH + 1),
      realistic: this.generateWithholdingReason(),
      oversized: this.generateOversizedReason()
    }
  }

  static generatePublicRegisterData(options = {}) {
    const { withhold = faker.datatype.boolean() } = options

    const consent = withhold ? 'yes' : 'no'
    const data = { consent }

    if (consent === 'yes') {
      data.reason = this.generateWithholdingReason()
    }

    return data
  }

  static generateTestScenarios() {
    return {
      allowPublicRegister: {
        consent: 'no'
      },
      withholdFromPublicRegister: {
        consent: 'yes',
        reason: this.generateWithholdingReason()
      },
      withholdWithCommercialReason: {
        consent: 'yes',
        reason: this.generateWithholdingReason({ theme: 'commercial' })
      },
      withholdWithSecurityReason: {
        consent: 'yes',
        reason: this.generateWithholdingReason({ theme: 'security' })
      },
      withholdWithTechnicalReason: {
        consent: 'yes',
        reason: this.generateWithholdingReason({ theme: 'technical' })
      },
      withholdWithEnvironmentalReason: {
        consent: 'yes',
        reason: this.generateWithholdingReason({ theme: 'environmental' })
      }
    }
  }

  static generateInvalidData() {
    return {
      missingConsent: {},
      missingReason: { consent: 'yes' },
      emptyReason: { consent: 'yes', reason: '' },
      oversizedReason: {
        consent: 'yes',
        reason: this.generateOversizedReason()
      },
      invalidConsent: { consent: 'invalid' }
    }
  }
}
