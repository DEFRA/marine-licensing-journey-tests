import { faker } from '@faker-js/faker'

export default class MarineProjectModel {
  static PROJECT_NAME_MAX_LENGTH = 250

  static MARINE_ACTIVITIES = [
    'Offshore Wind Farm',
    'Marine Cable Installation',
    'Coastal Defence Works',
    'Port Development',
    'Marina Construction',
    'Pier Extension',
    'Breakwater Construction',
    'Dredging Operations',
    'Aquaculture Development',
    'Tidal Energy Project',
    'Wave Energy Installation',
    'Submarine Cable Laying',
    'Jetty Construction',
    'Seawall Reinforcement',
    'Harbour Expansion'
  ]

  static MARINE_LOCATIONS = [
    'North Sea',
    'English Channel',
    'Irish Sea',
    'Bristol Channel',
    'Solent',
    'Thames Estuary',
    'Humber Estuary',
    'Severn Estuary',
    'Morecambe Bay',
    'Cardigan Bay',
    'Lyme Bay',
    'Liverpool Bay',
    'Wash',
    'Norfolk Coast',
    'Yorkshire Coast',
    'Cornish Coast',
    'Welsh Coast',
    'Scottish Waters'
  ]

  static PROJECT_DESCRIPTORS = [
    'Phase 1',
    'Phase 2',
    'Extension',
    'Upgrade',
    'Maintenance',
    'Replacement',
    'Emergency',
    'Temporary',
    'Permanent',
    'Pilot',
    'Commercial',
    'Research',
    'Development',
    'Demonstration'
  ]

  static generateProjectName(options = {}) {
    const {
      includeLocation = faker.datatype.boolean(),
      includeDescriptor = faker.datatype.boolean(),
      maxLength = this.PROJECT_NAME_MAX_LENGTH
    } = options

    const activity = faker.helpers.arrayElement(this.MARINE_ACTIVITIES)
    const location = includeLocation
      ? faker.helpers.arrayElement(this.MARINE_LOCATIONS)
      : null
    const descriptor = includeDescriptor
      ? faker.helpers.arrayElement(this.PROJECT_DESCRIPTORS)
      : null

    let projectName = activity

    if (location) {
      projectName = `${location} ${projectName}`
    }

    if (descriptor) {
      projectName = `${projectName} - ${descriptor}`
    }

    if (projectName.length > maxLength) {
      projectName = projectName.substring(0, maxLength).trim()
      const lastSpace = projectName.lastIndexOf(' ')
      if (lastSpace > 0) {
        projectName = projectName.substring(0, lastSpace)
      }
    }

    return projectName
  }

  static generateOversizedProjectName() {
    const baseProject = this.generateProjectName({
      includeLocation: true,
      includeDescriptor: true
    })

    const additionalText =
      ' Featuring Advanced Technology, Environmental Safeguards, Biodiversity Protection, Sustainable Energy Solutions, Marine Ecosystem Conservation, and Comprehensive Environmental Impact Assessment'

    return baseProject + additionalText
  }

  static generateValidProjectName() {
    return this.generateProjectName({
      maxLength: this.PROJECT_NAME_MAX_LENGTH - 10
    })
  }

  static generateBoundaryTestNames() {
    return {
      empty: '',
      singleChar: 'A',
      exactlyMaxLength: 'A'.repeat(this.PROJECT_NAME_MAX_LENGTH),
      overMaxLength: 'A'.repeat(this.PROJECT_NAME_MAX_LENGTH + 1),
      realistic: this.generateValidProjectName(),
      oversized: this.generateOversizedProjectName()
    }
  }

  static generateCompleteProject() {
    return {
      projectName: this.generateValidProjectName(),
      id: faker.database.mongodbObjectId(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }
  }
}
