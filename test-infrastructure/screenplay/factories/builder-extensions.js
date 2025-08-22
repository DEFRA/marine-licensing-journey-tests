import ActivityDatesFactory from './activity-dates.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

export const siteDetailsExtension = {
  forACircleWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('circle', 'WGS84')
    )
    return builder
  },
  forACircleWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('circle', 'OSGB36')
    )
    return builder
  },
  forATriangleWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('triangle', 'WGS84')
    )
    return builder
  },
  forATriangleWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('triangle', 'OSGB36')
    )
    return builder
  },
  forAQuadrilateralWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('quadrilateral', 'WGS84')
    )
    return builder
  },
  forAQuadrilateralWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('quadrilateral', 'OSGB36')
    )
    return builder
  },
  forAPentagonWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('pentagon', 'WGS84')
    )
    return builder
  },
  forAPentagonWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('pentagon', 'OSGB36')
    )
    return builder
  },
  forARandomPolygonWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createRandomPolygon(5, 'WGS84')
    )
    return builder
  },
  withKMLUpload: (builder) => {
    builder.setProperty('siteDetails', SiteDetailsFactory.createKMLUpload())
    return builder
  },
  withShapefileUpload: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createShapefileUpload()
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
