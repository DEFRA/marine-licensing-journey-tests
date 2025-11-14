export const ACTIVITY_TYPES = [
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

export const ARTICLE_CODES = [
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

export const ACTIVITY_PURPOSES = [
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

export const ACTIVITY_PURPOSE_DISPLAY = {
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

export function getActivityPurposeDisplay(activityTypeCode, articleCode) {
  if (!activityTypeCode || !articleCode) {
    return null
  }

  const purposeMap = ACTIVITY_PURPOSE_DISPLAY[activityTypeCode]
  if (!purposeMap) {
    return null
  }

  return purposeMap[articleCode] || null
}
