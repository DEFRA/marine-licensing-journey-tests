import {
  createCircleWGS84Data,
  createCircleOSGB36Data,
  createBoundaryWGS84Data,
  createBoundaryOSGB36Data,
  createMixedMultiSiteData
} from './site-details.js'
import {
  createKMLUploadData,
  createShapefileUploadData,
  createMultiSiteKMLUploadData,
  createMultiSiteShapefileUploadData
} from './file-upload.js'

export function withPublicRegister(data, consent = true) {
  return {
    ...data,
    publicRegister: { consent }
  }
}

const DEFAULT_WGS84_BOUNDARY = [
  { latitude: '50.000000', longitude: '-1.000000' },
  { latitude: '50.001000', longitude: '-0.999000' },
  { latitude: '50.000500', longitude: '-0.999500' }
]

const DEFAULT_OSGB36_BOUNDARY = [
  { eastings: '432675', northings: '181310' },
  { eastings: '433000', northings: '181310' },
  { eastings: '433000', northings: '181500' },
  { eastings: '432675', northings: '181500' }
]

export function createCYACircleWGS84Data() {
  return withPublicRegister(createCircleWGS84Data())
}

export function createCYACircleOSGB36Data() {
  return withPublicRegister(createCircleOSGB36Data())
}

export function createCYABoundaryWGS84Data() {
  return withPublicRegister(createBoundaryWGS84Data(DEFAULT_WGS84_BOUNDARY))
}

export function createCYABoundaryOSGB36Data() {
  return withPublicRegister(createBoundaryOSGB36Data(DEFAULT_OSGB36_BOUNDARY))
}

export function createCYAKMLUploadData() {
  return withPublicRegister(createKMLUploadData())
}

export function createCYAShapefileUploadData() {
  return withPublicRegister(createShapefileUploadData())
}

export function createCYAMultiSiteKMLData() {
  return withPublicRegister(
    createMultiSiteKMLUploadData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  )
}

export function createCYAMultiSiteShapefileData() {
  return withPublicRegister(
    createMultiSiteShapefileUploadData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  )
}

export function createCYAMultiSiteManualData() {
  return withPublicRegister(
    createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  )
}
