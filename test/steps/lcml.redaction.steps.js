import path from 'path'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlRedactionPage from '../pages/lcml.redaction.page.js'
import { uploadFile } from '../support/site-details-flow.js'
import { getConfig } from '../support/config.js'
import {
  applySharedRedactionLicence,
  redactionPath
} from '../support/shared-redaction-licence.js'

const REDACTION_TIMEOUT = 900_000
const UPLOAD_TIMEOUT = 180_000
const REDACTED = '***REDACTED***'

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

Then(
  '{string} shows the redaction marker in white on black',
  async function (field) {
    const marker = this.redaction.redactedLabel(field).first()
    await expect(marker).toBeVisible({ timeout: 30_000 })
    await expect(marker).toHaveText(REDACTED)
    const colours = await marker.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return { colour: style.color, background: style.backgroundColor }
    })
    expect(colours.colour).toBe('rgb(255, 255, 255)')
    expect(colours.background).toBe('rgb(11, 12, 12)')
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
    const context = await this.browserContext.browser().newContext({
      storageState: this.applicantState,
      viewport: { width: 1440, height: 1200 }
    })
    const page = await context.newPage()
    page.setDefaultTimeout(30_000)
    try {
      await page.goto(
        new URL(
          `/marine-licence/view-details/${this.data.marineLicenceId}`,
          getConfig().baseURL
        ).toString()
      )
      await page.waitForLoadState('load')
      const body = await page.locator('main').innerText()
      expect(body).toContain(this.applicantText)
      expect(body).not.toContain(REDACTED)
    } finally {
      await context.close()
    }
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
  'removing the redaction restores the original construction drawing',
  async function () {
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
  'someone who has not signed in opens the redaction page',
  async function () {
    const context = await this.browserContext.browser().newContext({
      viewport: { width: 1440, height: 900 }
    })
    this.anonymousPage = await context.newPage()
    this.anonymousPage.setDefaultTimeout(60_000)
    await this.anonymousPage.goto(
      new URL(
        redactionPath(this.data.applicationReference),
        getConfig().baseURL
      ).toString(),
      { waitUntil: 'domcontentloaded' }
    )
  }
)

Then('they are sent to the Microsoft sign in page', async function () {
  await this.anonymousPage.waitForURL(/login\.microsoftonline\.com/, {
    timeout: 30_000
  })
  await this.anonymousPage.context().close()
})
