import path from 'path'
import { readFileSync } from 'fs'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlRedactionPage from '../pages/lcml.redaction.page.js'
import LcmlRedactionPreviewPage from '../pages/lcml.redaction.preview.page.js'
import { uploadFile } from '../support/site-details-flow.js'
import { getConfig } from '../support/config.js'
import { SAMPLE_FILES } from '../support/lcml-helpers.js'
import {
  applySharedRedactionLicence,
  redactionPath,
  redactionPreviewPath
} from '../support/shared-redaction-licence.js'

const REDACTION_TIMEOUT = 900_000
const UPLOAD_TIMEOUT = 180_000
const REDACTED = '***REDACTED***'

async function expectWhiteOnBlack(marker) {
  await expect(marker).toBeVisible({ timeout: 30_000 })
  await expect(marker).toHaveText(REDACTED)
  const colours = await marker.evaluate((el) => {
    const style = window.getComputedStyle(el)
    return { colour: style.color, background: style.backgroundColor }
  })
  expect(colours.colour).toBe('rgb(255, 255, 255)')
  expect(colours.background).toBe('rgb(11, 12, 12)')
}

async function withApplicantViewDetails(world, read) {
  const context = await world.browserContext.browser().newContext({
    storageState: world.applicantState,
    viewport: { width: 1440, height: 1200 }
  })
  const page = await context.newPage()
  page.setDefaultTimeout(30_000)
  try {
    await page.goto(
      new URL(
        `/marine-licence/view-details/${world.data.marineLicenceId}`,
        getConfig().baseURL
      ).toString()
    )
    await page.waitForLoadState('load')
    return await read(page)
  } finally {
    await context.close()
  }
}

async function openPreview(world) {
  await world.page.goto(
    new URL(
      redactionPreviewPath(world.data.applicationReference),
      getConfig().baseURL
    ).toString()
  )
  await world.page.waitForLoadState('load')
  world.preview = new LcmlRedactionPreviewPage(world.page)
  await expect(world.preview.heading).toBeVisible({ timeout: 30_000 })
}

Given(
  'a submitted marine licence and a signed in caseworker',
  { timeout: REDACTION_TIMEOUT },
  async function () {
    await applySharedRedactionLicence(this)
  }
)

When('the caseworker opens the application for redaction', async function () {
  await this.page.goto(
    new URL(
      redactionPath(this.data.applicationReference),
      getConfig().baseURL
    ).toString()
  )
  await this.page.waitForLoadState('load')
  this.redaction = new LcmlRedactionPage(this.page)
  await expect(this.redaction.heading).toBeVisible({ timeout: 30_000 })
})

When('the caseworker redacts {string}', async function (field) {
  await this.redaction.openEditor(field)
  this.applicantText = await this.redaction.input(field).inputValue()
  await this.redaction.saveRedaction(field, REDACTED)
})

When('the caseworker withholds the location of site {int}', async function (n) {
  await this.redaction.withhold(
    this.redaction.withholdLocation(n),
    `Display location for site ${n}`
  )
})

When(
  'the caseworker withholds the Water Framework Directive assessment',
  async function () {
    this.wfdFileName = (
      await this.redaction.cardText('Water Framework Directive')
    ).match(/assessment upload ([\w-]+\.\w+)/)?.[1]
    expect(this.wfdFileName).toBeTruthy()
    await this.redaction.withhold(
      this.redaction.withholdWaterFrameworkDirectiveDocument(),
      'Remove redaction for the Water Framework Directive assessment'
    )
  }
)

When('the caseworker selects the preview with redactions', async function () {
  const preview = this.redaction.previewButton()
  await expect(preview).toBeVisible({ timeout: 30_000 })
  await preview.click()
  await this.page.waitForURL(/\/marine-licence\/redaction\/[^/]+\/preview$/, {
    timeout: 30_000
  })
  await this.page.waitForLoadState('load')
  this.preview = new LcmlRedactionPreviewPage(this.page)
  await expect(this.preview.heading).toBeVisible({ timeout: 30_000 })
})

Then(
  '{string} shows the redaction marker in white on black',
  async function (field) {
    await expectWhiteOnBlack(this.redaction.redactedLabel(field).first())
  }
)

Then(
  'the preview shows the application name only as the redaction marker in white on black',
  async function () {
    await openPreview(this)
    await expectWhiteOnBlack(
      this.preview.heading.locator('.app-redaction-label')
    )
    expect(this.applicantText).toBeTruthy()
    expect(await this.page.content()).not.toContain(this.applicantText)
  }
)

Then(
  'the site {int} location is shown as redacted in the preview',
  async function (n) {
    await expectWhiteOnBlack(
      this.preview
        .rowValue(`Site ${n}`, 'Site location')
        .locator('.app-redaction-label')
    )
    await expect(
      this.preview.card(`Site ${n}`).getByText('Map view')
    ).toHaveCount(0)

    const coordinates = withheldCoordinates(this)
    expect(coordinates.length).toBeGreaterThan(0)
    const html = await this.page.content()
    for (const coordinate of coordinates) {
      expect(html).not.toContain(coordinate)
    }
  }
)

function withheldCoordinates(world) {
  if (world.data.siteType === 'upload') {
    const kml = readFileSync(path.resolve(SAMPLE_FILES.KML), 'utf8')
    return [...new Set(kml.match(/-?\d{1,3}\.\d{4,}/g) ?? [])]
  }
  const { latitude, longitude } = world.data.site
  return [latitude, longitude]
}

Then(
  'the Water Framework Directive assessment is shown as redacted in the preview',
  async function () {
    await expectWhiteOnBlack(
      this.preview
        .card('Water Framework Directive')
        .locator('.app-redaction-label')
    )
    expect(await this.page.content()).not.toContain(this.wfdFileName)
  }
)

const UNREDACTED_CARDS = ['Application overview', 'Other permissions']

Then(
  "the rest of the preview reads as the applicant's View details, with no links to other pages in the service",
  async function () {
    const previewCards = []
    for (const title of UNREDACTED_CARDS) {
      previewCards.push(await this.preview.cardText(title))
    }
    const applicantCards = await withApplicantViewDetails(
      this,
      async (page) => {
        const viewDetails = new LcmlRedactionPreviewPage(page)
        const cards = []
        for (const title of UNREDACTED_CARDS) {
          cards.push(await viewDetails.cardText(title))
        }
        return cards
      }
    )
    expect(previewCards).toEqual(applicantCards)
    expect(await this.preview.serviceLinks()).toEqual([])
  }
)

Then(
  'only the change and remove options are offered for {string}',
  async function (field) {
    await expect(this.redaction.changeLink(field)).toBeVisible({
      timeout: 30_000
    })
    await expect(this.redaction.removeButton(field)).toBeVisible({
      timeout: 30_000
    })
    await expect(this.redaction.saveButton(field)).toBeHidden()
    await expect(this.redaction.copyButton(field)).toBeHidden()
  }
)

Then(
  'the applicant still sees their own text for {string}',
  async function (field) {
    expect(this.applicantText).toBeTruthy()
    const body = await withApplicantViewDetails(this, (page) =>
      page.locator('main').innerText()
    )
    expect(body).toContain(this.applicantText)
    expect(body).not.toContain(REDACTED)
  }
)

When(
  'the caseworker replaces the construction drawing with {string}',
  { timeout: UPLOAD_TIMEOUT },
  async function (fileName) {
    await this.redaction.revealDrawing()
    this.originalDrawing = await this.redaction.drawingFileName()
    await this.redaction.replaceDrawing().click()
    await expect(this.page).toHaveURL(/upload-construction-drawing/, {
      timeout: 30_000
    })
    await uploadFile(this.page, path.join('test/resources', fileName))

    // The replacement is virus scanned, and the wait page polls before sending
    // the caseworker back to the card the document was replaced from.
    await this.page.waitForURL(/marine-licence\/redaction\/[^/]+(#.*)?$/, {
      timeout: 150_000
    })
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the construction drawing is shown as {string}',
  async function (fileName) {
    const text = await this.redaction.cardText('Construction drawing')
    expect(text).toContain(fileName)
    expect(this.originalDrawing).toBeTruthy()
    expect(text).not.toContain(this.originalDrawing)
  }
)

Then(
  'the preview shows the construction drawing as {string} with nothing to mark it as replaced',
  async function (fileName) {
    await openPreview(this)
    const text = await this.preview.cardText('Construction drawing')
    expect(text).toContain(fileName)
    expect(text).not.toContain(this.originalDrawing)
    expect(text).not.toContain(REDACTED)
    expect(text.replace(fileName, '')).not.toMatch(/replace|withheld|redact/i)
  }
)

Then(
  'removing the redaction restores the original construction drawing',
  async function () {
    await this.page.goto(
      new URL(
        redactionPath(this.data.applicationReference),
        getConfig().baseURL
      ).toString()
    )
    await this.page.waitForLoadState('load')
    await this.redaction.removeDrawingRedaction().click()
    await this.page.waitForLoadState('load').catch(() => {})
    await expect(this.redaction.replaceDrawing()).toBeVisible({
      timeout: 30_000
    })
    expect(await this.redaction.cardText('Construction drawing')).toContain(
      this.originalDrawing
    )
  }
)

When(
  'someone who has not signed in opens the redaction page and the redaction preview page',
  async function () {
    const context = await this.browserContext.browser().newContext({
      viewport: { width: 1440, height: 900 }
    })
    this.anonymousContext = context
    this.anonymousLandings = []
    for (const pathFor of [redactionPath, redactionPreviewPath]) {
      const page = await context.newPage()
      page.setDefaultTimeout(60_000)
      await page.goto(
        new URL(
          pathFor(this.data.applicationReference),
          getConfig().baseURL
        ).toString(),
        { waitUntil: 'domcontentloaded' }
      )
      this.anonymousLandings.push(page)
    }
  }
)

Then('both pages send them to the Microsoft sign in page', async function () {
  try {
    for (const page of this.anonymousLandings) {
      await page.waitForURL(/login\.microsoftonline\.com/, {
        timeout: 30_000
      })
    }
  } finally {
    await this.anonymousContext.close()
  }
})
