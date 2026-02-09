import { faker } from '@faker-js/faker'
import {
  ACTIVITY_TYPES,
  ARTICLE_CODES
} from '../../test-infrastructure/screenplay/factories/iat-constants.js'

const ACTIVITIES = [
  'Wind Farm',
  'Cable Installation',
  'Marina Construction',
  'Offshore Platform',
  'Tidal Energy Array',
  'Subsea Pipeline',
  'Coastal Defence',
  'Port Development',
  'Breakwater Construction'
]

const LOCATIONS = [
  'Norfolk Coast',
  'Thames Estuary',
  'Bristol Channel',
  'Solent Waters',
  'Wash Estuary',
  'Humber Estuary',
  'Severn Estuary',
  'Morecambe Bay',
  'Cardigan Bay'
]

const DESCRIPTORS = [
  'Development',
  'Extension',
  'Phase 1',
  'Phase 2',
  'Expansion',
  'Upgrade',
  'Maintenance',
  'Construction'
]

export function generateProjectName() {
  const activity = faker.helpers.arrayElement(ACTIVITIES)
  const location = faker.helpers.arrayElement(LOCATIONS)
  const descriptor = faker.helpers.arrayElement(DESCRIPTORS)
  const num = faker.number.int({ min: 1000, max: 9999 })
  return `${location} ${activity} - ${descriptor} ${num}`
}

export function generateIatContext() {
  const nonPurposeTypes = ACTIVITY_TYPES.filter((at) => !at.supportsPurpose)
  const activityType = faker.helpers.arrayElement(nonPurposeTypes)
  const articleCode = faker.helpers.arrayElement(ARTICLE_CODES)
  const pdfUrl = `https://marinelicensing.marinemanagement.org.uk/path/journey/self-service/outcome-document/${faker.string.uuid()}`

  return { activityType, articleCode, activityPurpose: null, pdfUrl }
}

export function buildNavigationUrl(basePath, iatContext) {
  if (!iatContext) return basePath

  const params = new URLSearchParams({
    ACTIVITY_TYPE: iatContext.activityType.code,
    ARTICLE: iatContext.articleCode.code,
    pdfDownloadUrl: iatContext.pdfUrl
  })

  return `${basePath}?${params.toString()}`
}

export function createValidProjectNameData() {
  return {
    projectName: generateProjectName(),
    cookiePreferences: 'accept',
    projectNameTaskCompleted: false,
    iatContext: generateIatContext()
  }
}

export function createValidProjectNameWithDatesData() {
  return {
    ...createValidProjectNameData(),
    activityDates: {
      startDate: { day: '01', month: '06', year: '2026' },
      endDate: { day: '30', month: '12', year: '2026' }
    }
  }
}

export function createPublicRegisterConsentData() {
  return {
    ...createValidProjectNameData(),
    publicRegister: { consent: true }
  }
}

export function createPublicRegisterWithholdData() {
  return {
    ...createValidProjectNameData(),
    publicRegister: {
      consent: false,
      reason: faker.helpers.arrayElement([
        'Commercial sensitivity regarding proprietary technology',
        'Protection of intellectual property',
        'Security concerns related to infrastructure locations'
      ])
    }
  }
}

export function generateLongReason() {
  const longText = faker.lorem.paragraphs(30, ' ')
  return longText.substring(0, 1001)
}
