import { faker } from '@faker-js/faker'

const ACTIVITY_TYPES = [
  { code: 'CON', display: 'Construction', supportsPurpose: true },
  {
    code: 'DEPOSIT',
    display: 'Deposit of a substance or object',
    supportsPurpose: true
  },
  {
    code: 'REMOVAL',
    display: 'Removal of a substance or object',
    supportsPurpose: true
  },
  { code: 'DREDGE', display: 'Dredging', supportsPurpose: true },
  {
    code: 'INCINERATION',
    display: 'Incineration of a substance or object',
    supportsPurpose: false
  },
  {
    code: 'EXPLOSIVES',
    display: 'Use of an explosive substance',
    supportsPurpose: false
  },
  {
    code: 'SCUTTLING',
    display: 'Sinking of a vessel or floating container',
    supportsPurpose: false
  }
]

const ARTICLE_CODES = [
  {
    code: '13',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/13',
    display:
      'Article 13 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17',
    display:
      'Article 17 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17A',
    display:
      'Article 17A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17B',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17B',
    display:
      'Article 17B of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '18A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/18A',
    display:
      'Article 18A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '20',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/20',
    display:
      'Article 20 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '21',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/21',
    display:
      'Article 21 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '25',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/25',
    display:
      'Article 25 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '25A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/25A',
    display:
      'Article 25A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '26',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/26',
    display:
      'Article 26 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '26A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/26A',
    display:
      'Article 26A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '34',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/34',
    display:
      'Article 34 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '35',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/35',
    display:
      'Article 35 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  }
]

const ACTIVITY_PURPOSES = [
  'coastalProtectionDrainageOrFloodDefence',
  'crossrailAct',
  'deepseaMining',
  'defenceMiningCrossrail',
  'dredgedMaterial',
  'emergency',
  'fishing',
  'hullCleaning',
  'maintenance',
  'markersMooringsAidsToNavigation',
  'markersMooringsAndAidToNavigation',
  'miscellaneous',
  'navigationalDredging',
  'ObstructionsDanger',
  'pollutionResponse',
  'pontoons',
  'scientificResearch',
  'shellfish',
  'waste'
]

const ACTIVITY_PURPOSE_DISPLAY = {
  CON: {
    25: 'Moorings or aids to navigation',
    '25A': 'Pontoons',
    35: 'Bored tunnels'
  },
  DEPOSIT: {
    13: 'Shellfish propagation or cultivation',
    17: 'Scientific instruments and associated equipment',
    20: 'Flood or flood risk',
    25: 'Moorings or aids to navigation',
    '25A': 'Pontoons',
    26: 'Markers for European marine sites and conservation zones',
    '26A': 'Temporary markers',
    34: 'Cables and pipelines'
  },
  REMOVAL: {
    13: 'Shellfish propagation or cultivation',
    17: 'Scientific instruments and associated equipment',
    '17A': 'Samples for testing or analysis',
    '17B': 'Accidental deposits',
    20: 'Flood or flood risk',
    21: 'Dead animals',
    25: 'Moorings or aids to navigation',
    '25A': 'Pontoons',
    26: 'Markers for European marine sites and conservation zones',
    '26A': 'Temporary markers',
    34: 'Cables and pipelines'
  },
  DREDGE: {
    '18A': 'Navigational dredging',
    20: 'Flood or flood risk',
    34: 'Cables and pipelines'
  }
}

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
    ADV_TYPE: 'EXE',
    ACTIVITY_TYPE: iatContext.activityType.code,
    ARTICLE: iatContext.articleCode.code,
    outcomeType: `WO_EXE_AVAILABLE_ARTICLE_${iatContext.articleCode.code}`,
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
