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
