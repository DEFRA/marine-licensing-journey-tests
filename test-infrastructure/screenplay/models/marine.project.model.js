import { faker } from '@faker-js/faker'

export default class MarineProjectModel {
  static generateProjectName() {
    const activity = faker.helpers.arrayElement(this.ACTIVITIES)
    const location = faker.helpers.arrayElement(this.LOCATIONS)
    const descriptor = faker.helpers.arrayElement(this.DESCRIPTORS)
    const randomNumber = faker.number.int({ min: 1000, max: 9999 })

    return `${location} ${activity} - ${descriptor} ${randomNumber}`
  }

  static ACTIVITIES = [
    'Wind Farm',
    'Cable Installation',
    'Marina Construction',
    'Offshore Platform',
    'Tidal Energy Array',
    'Subsea Pipeline',
    'Coastal Defence',
    'Port Development',
    'Breakwater Construction',
    'Floating Solar Farm',
    'Wave Energy Converter',
    'Aquaculture Farm',
    'Research Station',
    'Navigation Beacon',
    'Telecommunications Cable',
    'Geological Survey',
    'Environmental Monitoring',
    'Dredging Operation',
    'Pontoon Installation',
    'Seawall Reinforcement'
  ]

  static LOCATIONS = [
    'Norfolk Coast',
    'Thames Estuary',
    'Bristol Channel',
    'Solent Waters',
    'Wash Estuary',
    'Humber Estuary',
    'Severn Estuary',
    'Morecambe Bay',
    'Cardigan Bay',
    'Liverpool Bay',
    'Outer Thames',
    'Dover Strait',
    'Yorkshire Coast',
    'Lincolnshire Waters',
    'Suffolk Coastal',
    'Devon Waters',
    'Cornwall Peninsula',
    'Isle of Wight',
    'Anglesey Waters',
    'Forth Estuary',
    'Tyne Estuary',
    'Mersey Estuary',
    'Blackwater Estuary',
    'Medway Waters',
    'Portsmouth Harbour'
  ]

  static DESCRIPTORS = [
    'Development',
    'Extension',
    'Phase 1',
    'Phase 2',
    'Phase 3',
    'Expansion',
    'Upgrade',
    'Maintenance',
    'Decommissioning',
    'Pilot Project',
    'Trial Installation',
    'Emergency Repair',
    'Seasonal Works',
    'Environmental Study',
    'Feasibility Study',
    'Site Investigation',
    'Construction',
    'Installation',
    'Modernisation',
    'Refurbishment',
    'Relocation',
    'Temporary Works',
    'Permanent Installation',
    'Research Programme'
  ]
}
