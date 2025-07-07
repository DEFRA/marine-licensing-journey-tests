import ActivityDatesFactory from './activity-dates.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

export const siteDetailsExtension = {
  forACircleWithWGS84Coordinates: (builder) => {
    builder.setProperty('siteDetails', SiteDetailsFactory.createCircleWGS84())
    return builder
  },
  forACircleWithOSGB36Coordinates: (builder) => {
    builder.setProperty('siteDetails', SiteDetailsFactory.createCircleOSGB36())
    return builder
  },
  forABoundaryWithWGS84Coordinates: (builder) => {
    builder.setProperty('siteDetails', SiteDetailsFactory.createBoundaryWGS84())
    return builder
  },
  forABoundaryWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createBoundaryOSGB36()
    )
    return builder
  },
  forATriangleWithWGS84Coordinates: (builder) => {
    builder.setProperty('siteDetails', SiteDetailsFactory.createTriangleWGS84())
    return builder
  },
  forATriangleWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createTriangleOSGB36()
    )
    return builder
  }
}

export const activityDatesExtension = {
  withValidDates: (builder) => {
    builder.setProperty(
      'activityDates',
      ActivityDatesFactory.createValidDates()
    )
    return builder
  },
  withSameStartAndEndDate: (builder) => {
    builder.setProperty(
      'activityDates',
      ActivityDatesFactory.createSameStartAndEndDate()
    )
    return builder
  },
  withShortDuration: (builder) => {
    builder.setProperty(
      'activityDates',
      ActivityDatesFactory.createShortDuration()
    )
    return builder
  },
  withLongDuration: (builder) => {
    builder.setProperty(
      'activityDates',
      ActivityDatesFactory.createLongDuration()
    )
    return builder
  },
  asCompleted: (builder) => {
    builder.setTaskCompleted('activityDates')
    return builder
  }
}

export function createExtensionGetter(builder, extensionProvider) {
  const extensionObject = {}

  for (const [methodName, methodFunction] of Object.entries(
    extensionProvider
  )) {
    extensionObject[methodName] = () => methodFunction(builder)
  }

  return extensionObject
}
