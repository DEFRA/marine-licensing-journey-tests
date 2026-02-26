import { generateIatContext, generateProjectName } from './exemption.js'
import {
  generateActivityDates,
  generateActivityDescription
} from './site-details.js'

// --- Base factory ---

function createFileUploadData(
  fileType,
  filePath,
  { expectValidationError = false } = {}
) {
  return {
    projectName: generateProjectName(),
    iatContext: generateIatContext(),
    siteDetails: {
      coordinatesEntryMethod: 'file-upload',
      fileType,
      ...(filePath && { filePath }),
      expectValidationError,
      multipleSitesEnabled: false,
      sites: [
        {
          activityDates: generateActivityDates(),
          activityDescription: generateActivityDescription()
        }
      ]
    }
  }
}

// --- KML single-site factories ---

export function createKMLUploadData() {
  return createFileUploadData(
    'KML',
    'test/resources/EXE_2025_00009-LOCATIONS.kml'
  )
}

export function createKMLVirusUploadData() {
  return createFileUploadData('KML', 'test/resources/nasty-virus-here.kml', {
    expectValidationError: true
  })
}

export function createKMLFileUploadData() {
  return createFileUploadData('KML', null)
}

export function createKMLWrongFileTypeData() {
  return createFileUploadData(
    'KML',
    'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html',
    { expectValidationError: true }
  )
}

export function createKMLLargeFileData() {
  return createFileUploadData('KML', 'test/resources/large.kml', {
    expectValidationError: true
  })
}

export function createKMLEmptyFileData() {
  return createFileUploadData('KML', 'test/resources/empty.kml', {
    expectValidationError: true
  })
}

// --- Shapefile single-site factories ---

export function createShapefileUploadData() {
  return createFileUploadData('Shapefile', 'test/resources/valid-shapefile.zip')
}

export function createShapefileVirusUploadData() {
  return createFileUploadData(
    'Shapefile',
    'test/resources/mygeodata-virus.zip',
    { expectValidationError: true }
  )
}

export function createShapefileFileUploadData() {
  return createFileUploadData('Shapefile', null)
}

export function createShapefileWrongFileTypeData() {
  return createFileUploadData(
    'Shapefile',
    'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html',
    { expectValidationError: true }
  )
}

export function createShapefileLargeFileData() {
  return createFileUploadData(
    'Shapefile',
    'test/resources/mygeodata-large.zip',
    { expectValidationError: true }
  )
}

export function createShapefileEmptyFileData() {
  return createFileUploadData(
    'Shapefile',
    'test/resources/empty-shapefile.zip',
    { expectValidationError: true }
  )
}

// --- Shapefile missing files factory ---

export function createShapefileMissingFileData(fileDescription) {
  const fileMap = {
    'missing .shp file': 'test/resources/missing_shp_file.zip',
    'missing .shx file': 'test/resources/missing_shx_file.zip',
    'missing .dbf file': 'test/resources/missing_dbf_file.zip',
    'missing .shp .shx and .dbf files':
      'test/resources/missing_shp_shx_dbf_files.zip',
    'missing .prj file': 'test/resources/missing_prj_file.zip'
  }

  const filePath = fileMap[fileDescription]
  if (!filePath) {
    throw new Error(`Unknown file description: ${fileDescription}`)
  }

  return createFileUploadData('Shapefile', filePath, {
    expectValidationError: true
  })
}

// --- Multi-site file upload factories ---

const KML_SITE_NAMES = [
  'Kentish Flats and Kentish Flats Extension',
  'Thanet Offshore Wind Farm'
]

const SHAPEFILE_SITE_NAMES = [
  'Kentish Flats and Kentish Flats Extension',
  'Thanet Offshore Wind Farm',
  'Greater Gabbard Wind Farm',
  'London Array Offshore Wind Farm',
  'Galloper Wind Farm',
  'Race Bank Wind Farm',
  'Dudgeon Offshore Wind Farm'
]

function createMultiSiteFileUploadData(
  fileType,
  filePath,
  numberOfSites,
  siteNamePatterns,
  { sameActivityDates = false, sameActivityDescription = false } = {}
) {
  const sites = Array.from({ length: numberOfSites }, (_, i) => {
    const site = {
      siteName: siteNamePatterns[i] || `Marine Site ${i + 1}`
    }

    if (!sameActivityDates) {
      site.activityDates = generateActivityDates()
    }

    if (!sameActivityDescription) {
      site.activityDescription = generateActivityDescription()
    }

    return site
  })

  return {
    projectName: generateProjectName(),
    iatContext: generateIatContext(),
    siteDetails: {
      coordinatesEntryMethod: 'file-upload',
      fileType,
      filePath,
      multipleSitesEnabled: true,
      sameActivityDates,
      sameActivityDescription,
      ...(sameActivityDates && {
        sharedActivityDates: generateActivityDates()
      }),
      ...(sameActivityDescription && {
        sharedActivityDescription: generateActivityDescription()
      }),
      sites
    }
  }
}

export function createMultiSiteKMLUploadData(options) {
  return createMultiSiteFileUploadData(
    'KML',
    'test/resources/EXE_2025_00098-LOCATIONS.kml',
    2,
    KML_SITE_NAMES,
    options
  )
}

export function createMultiSiteShapefileUploadData(options) {
  return createMultiSiteFileUploadData(
    'Shapefile',
    'test/resources/Suffolk MMO shapefiles.zip',
    7,
    SHAPEFILE_SITE_NAMES,
    options
  )
}
