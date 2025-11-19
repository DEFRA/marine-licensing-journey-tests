import { faker } from '@faker-js/faker'
import CoordinateFiles from '~/test-infrastructure/helpers/coordinate-files.js'
import ActivityDescriptionModel from '../models/activity.description.model.js'
import ActivityDatesFactory from './activity-dates.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

function setExemptionLevelProperties(builder, siteDetails) {
  if (siteDetails.sameActivityDates) {
    builder.setProperty(
      'activityDates',
      ActivityDatesFactory.createValidDates()
    )
  }

  if (siteDetails.sameActivityDescription) {
    builder.setProperty(
      'activityDescription',
      ActivityDescriptionModel.generateActivityDescription()
    )
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

function selectRandomMultiSiteMethod(builder, methodNames) {
  const chosenMethod = faker.helpers.arrayElement(methodNames)
  return siteDetailsExtension[chosenMethod](builder)
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
  forACircleWithCustomOSGB36Coordinates: (builder, eastings, northings) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.createCircleWithCustomOSGB36Coordinates(
        eastings,
        northings
      )
    )
    return builder
  },
  forABoundaryWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('boundary', 'WGS84')
    )
    return builder
  },
  forABoundaryWithOSGB36Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('boundary', 'OSGB36')
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
  forAComplex20PointPolygonWithWGS84Coordinates: (builder) => {
    builder.setProperty(
      'siteDetails',
      SiteDetailsFactory.create('complex20PointPolygon', 'WGS84')
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
      ),

  forRandomMultiSiteWithSameActivityDatesAndDescriptions: (builder) =>
    selectRandomMultiSiteMethod(builder, [
      'forMultiSiteKMLUploadWithSameActivityDatesAndDescriptions',
      'forMixedMultipleSitesWithSameActivityDatesAndDescriptions'
    ]),

  forRandomMultiSiteWithDifferentActivityDatesAndSameDescriptions: (builder) =>
    selectRandomMultiSiteMethod(builder, [
      'forMultiSiteKMLUploadWithDifferentActivityDatesAndSameDescriptions',
      'forMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions'
    ]),

  forRandomMultiSiteWithSameActivityDatesAndDifferentDescriptions: (builder) =>
    selectRandomMultiSiteMethod(builder, [
      'forMultiSiteKMLUploadWithSameActivityDatesAndDifferentDescriptions',
      'forMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions'
    ])
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
    extensionObject[methodName] = (...args) => methodFunction(builder, ...args)
  }

  return extensionObject
}
