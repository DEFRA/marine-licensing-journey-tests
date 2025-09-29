import ActivityDatesFactory from './activity-dates.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

function setExemptionLevelProperties(builder, siteDetails) {
  const firstSite = siteDetails.sites?.[0]

  if (siteDetails.sameActivityDates && firstSite?.activityDates) {
    builder.setProperty('activityDates', firstSite.activityDates)
  }

  if (siteDetails.sameActivityDescription && firstSite?.activityDescription) {
    builder.setProperty('activityDescription', firstSite.activityDescription)
  }
}

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
  forMixedMultipleSites: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createMixedMultipleSites()
    )
    return builder
  },
  forMixedMultipleSitesWithSameActivityDatesAndDescriptions: (builder) => {
    const siteDetails =
      SiteDetailsFactory.createMixedMultipleSitesWithSameActivityDatesAndDescriptions()
    builder.setProperty('siteDetails', siteDetails)

    setExemptionLevelProperties(builder, siteDetails)

    return builder
  },
  forMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions: (
    builder
  ) => {
    const siteDetails =
      SiteDetailsFactory.createMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions()
    builder.setProperty('siteDetails', siteDetails)

    setExemptionLevelProperties(builder, siteDetails)

    return builder
  },
  forMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions: (
    builder
  ) => {
    const siteDetails =
      SiteDetailsFactory.createMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions()
    builder.setProperty('siteDetails', siteDetails)

    setExemptionLevelProperties(builder, siteDetails)

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
