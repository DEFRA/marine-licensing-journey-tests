import { faker } from '@faker-js/faker'
import {
  ACTIVITY_TYPES,
  ARTICLE_CODES,
  ACTIVITY_PURPOSES,
  ACTIVITY_PURPOSE_DISPLAY
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
  const activityType = faker.helpers.arrayElement(ACTIVITY_TYPES)
  const articleCode = faker.helpers.arrayElement(ARTICLE_CODES)
  const pdfUrl = `https://marinelicensing.marinemanagement.org.uk/path/journey/self-service/outcome-document/${faker.string.uuid()}`

  let activityPurpose = null
  if (activityType.supportsPurpose) {
    const purposeMap = ACTIVITY_PURPOSE_DISPLAY[activityType.code]
    if (purposeMap && purposeMap[articleCode.code]) {
      activityPurpose = purposeMap[articleCode.code]
    } else {
      activityPurpose = faker.helpers.arrayElement(ACTIVITY_PURPOSES)
    }
  }

  return { activityType, articleCode, activityPurpose, pdfUrl }
}

const ACTIVITY_SUBTYPE_KEYS = {
  CON: 'EXE_ACTIVITY_SUBTYPE_CONSTRUCTION',
  DEPOSIT: 'EXE_ACTIVITY_SUBTYPE_DEPOSIT',
  REMOVAL: 'EXE_ACTIVITY_SUBTYPE_REMOVAL',
  DREDGE: 'EXE_ACTIVITY_SUBTYPE_DREDGING'
}

export function buildNavigationUrl(basePath, iatContext) {
  if (!iatContext) return basePath

  const params = new URLSearchParams({
    ACTIVITY_TYPE: iatContext.activityType.code,
    ARTICLE: iatContext.articleCode.code,
    pdfDownloadUrl: iatContext.pdfUrl
  })

  if (iatContext.activityType.supportsPurpose && iatContext.activityPurpose) {
    const subtypeKey = ACTIVITY_SUBTYPE_KEYS[iatContext.activityType.code]
    if (subtypeKey) {
      params.set(subtypeKey, iatContext.activityPurpose)
    }
  }

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
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const endDate = new Date(now.getFullYear(), now.getMonth() + 7, 28)

  return {
    ...createValidProjectNameData(),
    activityDates: {
      startDate: {
        day: String(startDate.getDate()).padStart(2, '0'),
        month: String(startDate.getMonth() + 1).padStart(2, '0'),
        year: String(startDate.getFullYear())
      },
      endDate: {
        day: String(endDate.getDate()).padStart(2, '0'),
        month: String(endDate.getMonth() + 1).padStart(2, '0'),
        year: String(endDate.getFullYear())
      }
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
