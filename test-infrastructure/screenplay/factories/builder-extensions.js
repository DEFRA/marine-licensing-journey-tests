import CoordinateFiles from '~/test-infrastructure/helpers/coordinate-files.js'
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

function loadExpectedSitesFromFile(siteDetails) {
  if (siteDetails.filePath) {
    const expectedData = CoordinateFiles.loadExpectedCoordinates(
      siteDetails.filePath
    )
    if (expectedData?.extractedSites) {
      siteDetails.expectedSites = expectedData.extractedSites
    }
  }
}

function createMultiSiteBuilder(siteDetails, builder) {
  loadExpectedSitesFromFile(siteDetails)
  builder.setProperty('siteDetails', siteDetails)
  setExemptionLevelProperties(builder, siteDetails)
  return builder
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
  forMixedMultipleSitesWithSameActivityDatesAndDescriptions: (builder) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMixedMultipleSitesWithSameActivityDatesAndDescriptions(),
      builder
    ),
  forMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions(),
      builder
    ),
  forMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions(),
      builder
    ),
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
  },
  forMultiSiteKMLUpload: (builder) => {
    const siteDetails = SiteDetailsFactory.createMultiSiteKMLUpload()
    loadExpectedSitesFromFile(siteDetails)
    builder.setProperty('siteDetails', siteDetails)
    return builder
  },

  forMultiSiteKMLUploadWithSameActivityDatesAndDescriptions: (builder) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteKMLUpload({
        sameActivityDates: true,
        sameActivityDescription: true
      }),
      builder
    ),

  forMultiSiteKMLUploadWithDifferentActivityDatesAndSameDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteKMLUpload({
        sameActivityDates: false,
        sameActivityDescription: true
      }),
      builder
    ),

  forMultiSiteKMLUploadWithSameActivityDatesAndDifferentDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteKMLUpload({
        sameActivityDates: true,
        sameActivityDescription: false
      }),
      builder
    ),

  forMultiSiteKMLUploadWithDifferentActivityDatesAndDifferentDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteKMLUpload({
        sameActivityDates: false,
        sameActivityDescription: false
      }),
      builder
    ),

  forMultiSiteShapefileUpload: (builder) => {
    const siteDetails = SiteDetailsFactory.createMultiSiteShapefileUpload()
    loadExpectedSitesFromFile(siteDetails)
    builder.setProperty('siteDetails', siteDetails)
    return builder
  },

  forMultiSiteShapefileUploadWithSameActivityDatesAndDescriptions: (builder) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteShapefileUpload({
        sameActivityDates: true,
        sameActivityDescription: true
      }),
      builder
    ),

  forMultiSiteShapefileUploadWithDifferentActivityDatesAndSameDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteShapefileUpload({
        sameActivityDates: false,
        sameActivityDescription: true
      }),
      builder
    ),

  forMultiSiteShapefileUploadWithSameActivityDatesAndDifferentDescriptions: (
    builder
  ) =>
    createMultiSiteBuilder(
      SiteDetailsFactory.createMultiSiteShapefileUpload({
        sameActivityDates: true,
        sameActivityDescription: false
      }),
      builder
    ),

  forMultiSiteShapefileUploadWithDifferentActivityDatesAndDifferentDescriptions:
    (builder) =>
      createMultiSiteBuilder(
        SiteDetailsFactory.createMultiSiteShapefileUpload({
          sameActivityDates: false,
          sameActivityDescription: false
        }),
        builder
      )
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
