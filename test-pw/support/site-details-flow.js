import path from 'path'
import {
  generateActivityDates,
  generateActivityDescription
} from '../test-data/site-details.js'

// --- Individual page actions ---

export async function continueFromBeforeYouStart(page) {
  await page.locator('a.govuk-button').click()
}

export async function selectProvideMethod(page, method) {
  if (method === 'enter-manually') {
    await page.locator('#coordinatesType-2').click()
  } else {
    await page.locator('#coordinatesType').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function selectMoreThanOneSite(page, yes) {
  if (yes) {
    await page.locator('#multipleSitesEnabled').click()
  } else {
    await page.locator('#multipleSitesEnabled-2').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterActivityDates(page, dates) {
  await page.locator('#activity-start-date-day').fill(dates.startDate.day)
  await page.locator('#activity-start-date-month').fill(dates.startDate.month)
  await page.locator('#activity-start-date-year').fill(dates.startDate.year)
  await page.locator('#activity-end-date-day').fill(dates.endDate.day)
  await page.locator('#activity-end-date-month').fill(dates.endDate.month)
  await page.locator('#activity-end-date-year').fill(dates.endDate.year)
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterActivityDescription(page, description) {
  await page.locator('#activityDescription').fill(description)
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function selectCoordinatesEntryMethod(page, siteType) {
  if (siteType === 'circle') {
    await page.locator('input[name="coordinatesEntry"][value="single"]').click()
  } else {
    await page
      .locator('input[name="coordinatesEntry"][value="multiple"]')
      .click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function selectCoordinateSystem(page, system) {
  if (system === 'WGS84') {
    await page.locator('#coordinateSystem').click()
  } else {
    await page.locator('#coordinateSystem-2').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterCentrePointWGS84(page, lat, lng) {
  await page.locator('#latitude').fill(String(lat))
  await page.locator('#longitude').fill(String(lng))
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterCentrePointOSGB36(page, eastings, northings) {
  await page.locator('#eastings').fill(String(eastings))
  await page.locator('#northings').fill(String(northings))
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterWidth(page, width) {
  await page.locator('#width').fill(String(width))
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function enterPolygonCoordinatesWGS84(page, coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    if (i >= 3) {
      await page.locator('button:has-text("Add another point")').click()
    }
    await page
      .locator(`#coordinates-${i}-latitude`)
      .fill(String(coordinates[i].latitude))
    await page
      .locator(`#coordinates-${i}-longitude`)
      .fill(String(coordinates[i].longitude))
  }
  await page.locator('#continue').click()
}

export async function enterPolygonCoordinatesOSGB36(page, coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    if (i >= 3) {
      await page.locator('button:has-text("Add another point")').click()
    }
    await page
      .locator(`#coordinates-${i}-eastings`)
      .fill(String(coordinates[i].eastings))
    await page
      .locator(`#coordinates-${i}-northings`)
      .fill(String(coordinates[i].northings))
  }
  await page.locator('#continue').click()
}

export async function enterSiteName(page, name) {
  await page.locator('#siteName').fill(name)
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function selectSameActivityDates(page, same) {
  if (same) {
    await page.locator('#sameActivityDates').click()
  } else {
    await page.locator('#sameActivityDates-2').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function selectSameActivityDescription(page, same) {
  if (same) {
    await page.locator('#sameActivityDescription').click()
  } else {
    await page.locator('#sameActivityDescription-2').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

// --- File upload page actions ---

export async function selectFileType(page, fileType) {
  if (fileType === 'Shapefile') {
    await page.locator('#fileUploadType').click()
  } else {
    await page.locator('#fileUploadType-2').click()
  }
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
}

export async function uploadFile(page, filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath)
  await page.locator('input[type="file"]').setInputFiles(absolutePath)
  await page
    .locator('button[type="submit"]:not([name="analytics"])')
    .click({ timeout: 60_000 })
}

// --- Coordinate entry for a single site ---

async function enterCoordinatesForSite(page, site) {
  await selectCoordinatesEntryMethod(page, site.siteType)
  await selectCoordinateSystem(page, site.coordinateSystem)

  if (site.siteType === 'circle') {
    if (site.coordinateSystem === 'WGS84') {
      await enterCentrePointWGS84(
        page,
        site.circleData.latitude,
        site.circleData.longitude
      )
    } else {
      await enterCentrePointOSGB36(
        page,
        site.circleData.eastings,
        site.circleData.northings
      )
    }
    await enterWidth(page, site.circleData.width)
  } else {
    if (site.coordinateSystem === 'WGS84') {
      await enterPolygonCoordinatesWGS84(page, site.polygonData.coordinates)
    } else {
      await enterPolygonCoordinatesOSGB36(page, site.polygonData.coordinates)
    }
  }
}

// --- Full flow: single site manual entry ---

export async function completeSingleSiteFlow(page, siteDetails) {
  const site = siteDetails.sites[0]

  await continueFromBeforeYouStart(page)
  await selectProvideMethod(page, 'enter-manually')
  await selectMoreThanOneSite(page, false)
  await enterActivityDates(page, site.activityDates)
  await enterActivityDescription(page, site.activityDescription)
  await enterCoordinatesForSite(page, site)
}

// --- Full flow: multi-site manual entry ---

export async function completeMultiSiteFlow(page, siteDetails) {
  const { sites, sameActivityDates, sameActivityDescription } = siteDetails
  const sharedDates = siteDetails.sharedActivityDates || generateActivityDates()
  const sharedDesc =
    siteDetails.sharedActivityDescription || generateActivityDescription()

  await continueFromBeforeYouStart(page)
  await selectProvideMethod(page, 'enter-manually')
  await selectMoreThanOneSite(page, true)

  for (let i = 0; i < sites.length; i++) {
    const site = sites[i]
    const isFirst = i === 0
    const isLast = i === sites.length - 1

    await enterSiteName(page, site.siteName)

    if (isFirst) {
      await selectSameActivityDates(page, sameActivityDates)

      if (sameActivityDates) {
        await enterActivityDates(page, sharedDates)
        await selectSameActivityDescription(page, sameActivityDescription)
        if (sameActivityDescription) {
          await enterActivityDescription(page, sharedDesc)
        }
      }
    }

    if (!sameActivityDates) {
      await enterActivityDates(
        page,
        site.activityDates || generateActivityDates()
      )
      if (isFirst) {
        await selectSameActivityDescription(page, sameActivityDescription)
        if (sameActivityDescription) {
          await enterActivityDescription(page, sharedDesc)
        }
      }
    }

    if (!sameActivityDescription) {
      await enterActivityDescription(
        page,
        site.activityDescription || generateActivityDescription()
      )
    }

    await enterCoordinatesForSite(page, site)

    if (!isLast) {
      await page.locator('button[name="add"]').click()
    }
  }
}

// --- Full flow: single site file upload ---

async function completeSingleSiteFileUploadFlow(page, siteDetails) {
  const site = siteDetails.sites[0]

  await continueFromBeforeYouStart(page)
  await selectProvideMethod(page, 'file-upload')
  await selectFileType(page, siteDetails.fileType)

  if (siteDetails.filePath) {
    await uploadFile(page, siteDetails.filePath)
  }

  if (!siteDetails.expectValidationError) {
    await enterActivityDates(page, site.activityDates)
    await enterActivityDescription(page, site.activityDescription)
  }
}

// --- Full flow: multi-site file upload ---

async function completeMultiSiteFileUploadFlow(page, siteDetails) {
  const { sites, sameActivityDates, sameActivityDescription } = siteDetails
  const sharedDates = siteDetails.sharedActivityDates || generateActivityDates()
  const sharedDesc =
    siteDetails.sharedActivityDescription || generateActivityDescription()

  await continueFromBeforeYouStart(page)
  await selectProvideMethod(page, 'file-upload')
  await selectFileType(page, siteDetails.fileType)
  await uploadFile(page, siteDetails.filePath)

  // Same activity dates preference
  await selectSameActivityDates(page, sameActivityDates)
  if (sameActivityDates) {
    await enterActivityDates(page, sharedDates)
  }

  // Same activity description preference
  await selectSameActivityDescription(page, sameActivityDescription)
  if (sameActivityDescription) {
    await enterActivityDescription(page, sharedDesc)
  }

  // Add missing data from review page
  for (let i = 0; i < sites.length; i++) {
    const siteNumber = i + 1
    const site = sites[i]

    await addMissingSiteName(page, siteNumber, site.siteName)

    if (!sameActivityDates) {
      await addMissingActivityDates(
        page,
        siteNumber,
        site.activityDates || generateActivityDates()
      )
    }

    if (!sameActivityDescription) {
      await addMissingActivityDescription(
        page,
        siteNumber,
        site.activityDescription || generateActivityDescription()
      )
    }
  }
}

// --- Review page helpers for multi-site file upload ---

async function addMissingSiteName(page, siteNumber, siteName) {
  const addLink = page.locator(
    `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Site name")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  )
  await addLink.click()
  await enterSiteName(page, siteName)
}

async function addMissingActivityDates(page, siteNumber, dates) {
  const addLink = page.locator(
    `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  )
  await addLink.click()
  await enterActivityDates(page, dates)
}

async function addMissingActivityDescription(page, siteNumber, description) {
  const addLink = page.locator(
    `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  )
  await addLink.click()
  await enterActivityDescription(page, description)
}

// --- Dispatcher ---

export async function completeSiteDetailsFlow(page, siteDetails) {
  if (siteDetails.coordinatesEntryMethod === 'file-upload') {
    if (siteDetails.multipleSitesEnabled) {
      await completeMultiSiteFileUploadFlow(page, siteDetails)
    } else {
      await completeSingleSiteFileUploadFlow(page, siteDetails)
    }
  } else if (siteDetails.multipleSitesEnabled) {
    await completeMultiSiteFlow(page, siteDetails)
  } else {
    await completeSingleSiteFlow(page, siteDetails)
  }
}

// --- Navigation helpers (for validation tests) ---

export async function navigateToProvideMethodPage(page) {
  await continueFromBeforeYouStart(page)
}

export async function navigateToCoordinatesEntryMethodPage(page, siteDetails) {
  const site = siteDetails.sites[0]
  await continueFromBeforeYouStart(page)
  await selectProvideMethod(page, 'enter-manually')
  await selectMoreThanOneSite(page, false)
  await enterActivityDates(page, site.activityDates)
  await enterActivityDescription(page, site.activityDescription)
}

export async function navigateToCoordinateSystemPage(page, siteDetails) {
  await navigateToCoordinatesEntryMethodPage(page, siteDetails)
  await selectCoordinatesEntryMethod(page, siteDetails.sites[0].siteType)
}

export async function navigateToWGS84CentrePointPage(page, siteDetails) {
  await navigateToCoordinatesEntryMethodPage(page, siteDetails)
  await selectCoordinatesEntryMethod(page, 'circle')
  await selectCoordinateSystem(page, 'WGS84')
}

export async function navigateToOSGB36CentrePointPage(page, siteDetails) {
  await navigateToCoordinatesEntryMethodPage(page, siteDetails)
  await selectCoordinatesEntryMethod(page, 'circle')
  await selectCoordinateSystem(page, 'OSGB36')
}

export async function navigateToWidthPage(page, siteDetails) {
  const site = siteDetails.sites[0]
  await navigateToWGS84CentrePointPage(page, siteDetails)
  await enterCentrePointWGS84(
    page,
    site.circleData.latitude,
    site.circleData.longitude
  )
}

export async function navigateToPolygonOSGB36Page(page, siteDetails) {
  await navigateToCoordinatesEntryMethodPage(page, siteDetails)
  await selectCoordinatesEntryMethod(page, 'boundary')
  await selectCoordinateSystem(page, 'OSGB36')
}

export async function navigateToPolygonWGS84Page(page, siteDetails) {
  await navigateToCoordinatesEntryMethodPage(page, siteDetails)
  await selectCoordinatesEntryMethod(page, 'boundary')
  await selectCoordinateSystem(page, 'WGS84')
}
