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
      'Marine archaeology survey activities with remote operated vehicle deployment.',
      'Deployment of oceanographic buoys and weather monitoring stations.',
      'Installation of subsea telecommunications infrastructure and fibre optic cables.',
      'Construction of offshore aquaculture facilities and fish farming equipment.',
      'Placement of scientific research equipment for marine biodiversity studies.',
      'Installation of coastal erosion monitoring systems and measurement devices.',
      'Deployment of wave energy converters and marine current turbines.',
      'Construction of marine access platforms and diving support structures.',
      'Installation of pipeline infrastructure for offshore resource transportation.'
    ]

    const additionalDetails = [
      'All works will be conducted in accordance with marine licensing conditions and environmental guidelines.',
      'Equipment will be deployed using certified marine contractors with appropriate insurance coverage.',
      'Work will be scheduled to avoid sensitive environmental periods including fish spawning seasons.',
      'All materials used will be marine-grade and environmentally compatible substances.',
      'Regular monitoring and reporting will be conducted throughout the project duration.',
      'Emergency response procedures will be implemented to address any environmental incidents.',
      'Operations will comply with Maritime and Coastguard Agency safety regulations.',
      'Environmental impact assessments will be undertaken prior to commencement.',
      'All personnel will hold relevant marine construction qualifications and certifications.',
      'Activities will be coordinated with local harbour authorities and navigation services.',
      'Comprehensive insurance and liability coverage will be maintained throughout operations.',
      'Real-time environmental monitoring will be conducted during all marine activities.'
    ]

    const closingDetails = [
      'All activities have been risk-assessed and appropriate mitigation measures identified.',
      'Navigation warnings will be issued through Notices to Mariners where required.',
      'Marine mammal observers will be deployed during sensitive operations.',
      'Archaeological exclusion zones will be established and maintained throughout works.',
      'Weather windows and sea state conditions will be carefully monitored.',
      'Post-installation surveys will be conducted to verify environmental compliance.',
      'Vessel movements will be logged and reported to relevant maritime authorities.',
      'Decommissioning plans have been prepared for all temporary structures.',
      'Marine spatial planning considerations have been incorporated into project design.',
      'Stakeholder consultation has been undertaken with local fishing communities.',
      'Biosecurity protocols will be implemented to prevent invasive species introduction.',
      'Carbon footprint minimisation strategies have been integrated into operations.'
    ]

    const activity = faker.helpers.arrayElement(activities)
    const detail = faker.helpers.arrayElement(additionalDetails)
    const closing = faker.helpers.arrayElement(closingDetails)

    return `${activity} ${detail} ${closing}`
  }

  static withOver4000Characters() {
    const longText = faker.lorem.paragraphs(50, ' ')
    return longText.substring(0, this.NOTIFICATION_DESCRIPTION_MAX_LENGTH + 1) // 4001 characters
  }
}
