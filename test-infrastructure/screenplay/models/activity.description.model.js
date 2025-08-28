import { faker } from '@faker-js/faker'

export default class ActivityDescriptionModel {
  static NOTIFICATION_DESCRIPTION_MAX_LENGTH = 4000

  static generateActivityDescription() {
    const activities = [
      'Installation of temporary mooring equipment for marine research vessel operations.',
      'Construction of permanent jetty structure with associated dredging activities.',
      'Deployment of marine monitoring equipment including seabed sensors and data loggers.',
      'Maintenance and repair works on existing offshore infrastructure including cable systems.',
      'Environmental sampling and sediment analysis across designated marine areas.',
      'Installation of marine renewable energy equipment including tidal generators.',
      'Construction of coastal protection structures including rock armour placement.',
      'Marine archaeology survey activities with remote operated vehicle deployment.'
    ]

    const additionalDetails = [
      'All works will be conducted in accordance with marine licensing conditions and environmental guidelines.',
      'Equipment will be deployed using certified marine contractors with appropriate insurance coverage.',
      'Work will be scheduled to avoid sensitive environmental periods including fish spawning seasons.',
      'All materials used will be marine-grade and environmentally compatible substances.',
      'Regular monitoring and reporting will be conducted throughout the project duration.',
      'Emergency response procedures will be implemented to address any environmental incidents.'
    ]

    const activity = faker.helpers.arrayElement(activities)
    const detail = faker.helpers.arrayElement(additionalDetails)

    return `${activity} ${detail}`
  }

  static withOver4000Characters() {
    const longText = faker.lorem.paragraphs(50, ' ')
    return longText.substring(0, this.NOTIFICATION_DESCRIPTION_MAX_LENGTH + 1) // 4001 characters
  }
}
