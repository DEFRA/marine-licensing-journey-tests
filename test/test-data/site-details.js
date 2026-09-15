import { faker } from '@faker-js/faker'
import { generateIatContext, generateProjectName } from './exemption.js'

export function generateActivityDates() {
  const futureYear = new Date().getFullYear() + 1
  const startMonth = faker.number.int({ min: 1, max: 6 })
  const endMonth = faker.number.int({ min: 7, max: 12 })
  return {
    startDate: {
      day: String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0'),
      month: String(startMonth).padStart(2, '0'),
      year: String(futureYear)
    },
    endDate: {
      day: String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0'),
      month: String(endMonth).padStart(2, '0'),
      year: String(futureYear)
    }
  }
}

export function generateLiveActivityDates() {
  const today = new Date()
  const startDay = today.getDate()
  const startMonth = today.getMonth() + 1
  const startYear = today.getFullYear()

  let endMonth = startMonth + 6
  let endYear = startYear
  if (endMonth > 12) {
    endMonth -= 12
    endYear += 1
  }

  return {
    startDate: {
      day: String(startDay).padStart(2, '0'),
      month: String(startMonth).padStart(2, '0'),
      year: String(startYear)
    },
    endDate: {
      day: String(Math.min(startDay, 28)).padStart(2, '0'),
      month: String(endMonth).padStart(2, '0'),
      year: String(endYear)
    }
  }
}

function toDateParts(date) {
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: String(date.getFullYear())
  }
}

function datesFromDayOffsets(startOffset, endOffset) {
  const start = new Date()
  start.setDate(start.getDate() + startOffset)
  const end = new Date()
  end.setDate(end.getDate() + endOffset)
  return { startDate: toDateParts(start), endDate: toDateParts(end) }
}

export function generateScheduledActivityDates() {
  return datesFromDayOffsets(30, 60)
}

export function generateExpiredActivityDates() {
  return datesFromDayOffsets(-60, -30)
}

export function createTwoSiteDatesData(firstDates, secondDates) {
  return baseSiteData({
    coordinatesEntryMethod: 'enter-manually',
    multipleSitesEnabled: true,
    sameActivityDates: false,
    sameActivityDescription: false,
    sites: [
      {
        siteName: 'Dated Site Alpha',
        siteNumber: 1,
        siteType: 'circle',
        coordinateSystem: 'WGS84',
        circleData: {
          latitude: '51.507412',
          longitude: '-0.127812',
          width: '20'
        },
        activityDates: firstDates,
        activityDescription: generateActivityDescription()
      },
      {
        siteName: 'Dated Site Beta',
        siteNumber: 2,
        siteType: 'circle',
        coordinateSystem: 'WGS84',
        circleData: {
          latitude: '50.812000',
          longitude: '-1.087000',
          width: '20'
        },
        activityDates: secondDates,
        activityDescription: generateActivityDescription()
      }
    ]
  })
}

export function generateActivityDescription() {
  return faker.lorem.sentence(10)
}

function baseSiteData(siteDetailsOverrides) {
  return {
    projectName: generateProjectName(),
    iatContext: generateIatContext(),
    siteDetails: siteDetailsOverrides
  }
}

function singleSite(site) {
  return {
    coordinatesEntryMethod: 'enter-manually',
    multipleSitesEnabled: false,
    sites: [
      {
        siteName: 'Main Research Site',
        activityDates: generateActivityDates(),
        activityDescription: generateActivityDescription(),
        ...site
      }
    ]
  }
}

export function createCircleWGS84Data(overrides = {}) {
  return baseSiteData(
    singleSite({
      siteType: 'circle',
      coordinateSystem: 'WGS84',
      circleData: {
        latitude: '51.507412',
        longitude: '-0.127812',
        width: '20'
      },
      ...overrides
    })
  )
}

export function createCircleOSGB36Data(overrides = {}) {
  return baseSiteData(
    singleSite({
      siteType: 'circle',
      coordinateSystem: 'OSGB36',
      circleData: {
        eastings: '432675',
        northings: '181310',
        width: '20'
      },
      ...overrides
    })
  )
}

export function createBoundaryWGS84Data(coordinates) {
  return baseSiteData(
    singleSite({
      siteType: 'boundary',
      coordinateSystem: 'WGS84',
      polygonData: { coordinates }
    })
  )
}

export function createBoundaryOSGB36Data(coordinates) {
  return baseSiteData(
    singleSite({
      siteType: 'boundary',
      coordinateSystem: 'OSGB36',
      polygonData: { coordinates }
    })
  )
}

export function createCustomCircleWGS84Data(overrides) {
  const defaults = {
    latitude: '51.507412',
    longitude: '-0.127812',
    width: '20'
  }
  return baseSiteData(
    singleSite({
      siteType: 'circle',
      coordinateSystem: 'WGS84',
      circleData: { ...defaults, ...overrides }
    })
  )
}

export function createCustomCircleOSGB36Data(overrides) {
  const defaults = {
    eastings: '432675',
    northings: '181310',
    width: '20'
  }
  return baseSiteData(
    singleSite({
      siteType: 'circle',
      coordinateSystem: 'OSGB36',
      circleData: { ...defaults, ...overrides }
    })
  )
}

export function create20PointPolygonWGS84Data() {
  const coordinates = [
    { latitude: '50.000000', longitude: '-1.000000' },
    { latitude: '50.001000', longitude: '-1.000000' },
    { latitude: '50.001500', longitude: '-0.999800' },
    { latitude: '50.002000', longitude: '-0.999600' },
    { latitude: '50.002500', longitude: '-0.999400' },
    { latitude: '50.003000', longitude: '-0.999200' },
    { latitude: '50.003500', longitude: '-0.999000' },
    { latitude: '50.004000', longitude: '-0.998800' },
    { latitude: '50.004500', longitude: '-0.998600' },
    { latitude: '50.005000', longitude: '-0.998400' },
    { latitude: '50.005000', longitude: '-0.998200' },
    { latitude: '50.004500', longitude: '-0.998000' },
    { latitude: '50.004000', longitude: '-0.997800' },
    { latitude: '50.003500', longitude: '-0.997600' },
    { latitude: '50.003000', longitude: '-0.997400' },
    { latitude: '50.002500', longitude: '-0.997200' },
    { latitude: '50.002000', longitude: '-0.997000' },
    { latitude: '50.001500', longitude: '-0.997200' },
    { latitude: '50.001000', longitude: '-0.997400' },
    { latitude: '50.000500', longitude: '-0.998000' }
  ]
  return createBoundaryWGS84Data(coordinates)
}

export function createMixedMultiSiteData({
  sameActivityDates = false,
  sameActivityDescription = false
} = {}) {
  const sharedDates = sameActivityDates ? generateActivityDates() : undefined
  const sharedDesc = sameActivityDescription
    ? generateActivityDescription()
    : undefined

  const sites = [
    {
      siteName: 'Circular Research Area Alpha',
      siteNumber: 1,
      siteType: 'circle',
      coordinateSystem: 'WGS84',
      circleData: {
        latitude: '51.507412',
        longitude: '-0.127812',
        width: '20'
      },
      activityDates: sameActivityDates ? undefined : generateActivityDates(),
      activityDescription: sameActivityDescription
        ? undefined
        : generateActivityDescription()
    },
    {
      siteName: 'Triangular Survey Zone Beta',
      siteNumber: 2,
      siteType: 'boundary',
      coordinateSystem: 'WGS84',
      polygonData: {
        coordinates: [
          { latitude: '50.000000', longitude: '-1.000000' },
          { latitude: '50.001000', longitude: '-0.999000' },
          { latitude: '50.000500', longitude: '-0.999500' }
        ]
      },
      activityDates: sameActivityDates ? undefined : generateActivityDates(),
      activityDescription: sameActivityDescription
        ? undefined
        : generateActivityDescription()
    },
    {
      siteName: 'Circular Monitoring Point Gamma',
      siteNumber: 3,
      siteType: 'circle',
      coordinateSystem: 'OSGB36',
      circleData: { eastings: '432675', northings: '181310', width: '20' },
      activityDates: sameActivityDates ? undefined : generateActivityDates(),
      activityDescription: sameActivityDescription
        ? undefined
        : generateActivityDescription()
    },
    {
      siteName: 'Quadrilateral Study Area Delta',
      siteNumber: 4,
      siteType: 'boundary',
      coordinateSystem: 'OSGB36',
      polygonData: {
        coordinates: [
          { eastings: '432675', northings: '181310' },
          { eastings: '433000', northings: '181310' },
          { eastings: '433000', northings: '181500' },
          { eastings: '432675', northings: '181500' }
        ]
      },
      activityDates: sameActivityDates ? undefined : generateActivityDates(),
      activityDescription: sameActivityDescription
        ? undefined
        : generateActivityDescription()
    }
  ]

  return baseSiteData({
    coordinatesEntryMethod: 'enter-manually',
    multipleSitesEnabled: true,
    sameActivityDates,
    sameActivityDescription,
    sharedActivityDates: sharedDates,
    sharedActivityDescription: sharedDesc,
    sites
  })
}
