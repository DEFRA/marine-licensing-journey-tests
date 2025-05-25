import { faker } from '@faker-js/faker'

export default class MarineProjectModel {
  static PROJECT_NAME_MAX_LENGTH = 250

  static generateProjectName() {
    // Simple, realistic project name for testing
    const activities = [
      'Wind Farm',
      'Cable Installation',
      'Marina Construction'
    ]
    const locations = ['Norfolk Coast', 'Thames Estuary', 'Bristol Channel']
    const descriptors = ['Development', 'Extension', 'Phase 1']

    const activity = faker.helpers.arrayElement(activities)
    const location = faker.helpers.arrayElement(locations)
    const descriptor = faker.helpers.arrayElement(descriptors)

    return `${location} ${activity} - ${descriptor}`
  }

  static generateOversizedProjectName() {
    return 'Construction of an Eco-Conscious Offshore Wind Farm Featuring Advanced Turbine Technology, Renewable Energy Integration Systems, and Marine Environmental Safeguards to Protect Biodiversity Across Coastal and Open Water Ecosystems While Promoting Sustainable Energy Solutions'
  }
}
