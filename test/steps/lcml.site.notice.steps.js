import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  submitMarineLicence,
  publicViewDetailsUrl
} from '../support/lcml-helpers.js'
import { completePublicNoticeTask } from '../support/d365.js'
import {
  sendSiteNoticeMessage,
  sendSiteNoticeEvidenceRejectionMessage,
  SITE_NOTICE_MESSAGE_SUMMARY
} from '../support/mas-queue.js'
import { getConfig } from '../support/config.js'
import {
  waitForActionRequired,
  applicationTask,
  openViewDetailsWithTask
} from '../support/lcml-application-tasks.js'
import LcmlSiteNoticePage from '../pages/lcml.site.notice.page.js'
import LcmlSiteNoticePrintPage from '../pages/lcml.site.notice.print.page.js'

const SITE_NOTICE_TASK = 'Display a site notice'
const REQUEST_RELATES_TO = {
  'marine users': 'MARINE_USERS',
  'marine and community users': 'BOTH'
}

const EVIDENCE = LcmlSiteNoticePage.EVIDENCE_ITEMS
const CLOSE_UP_PHOTO = 'test/resources/site-notice-close-up.png'
const POSITION_PHOTO = 'test/resources/site-notice-position.jpg'
const EMPTY_PHOTO = 'test/resources/site-notice-empty.png'
const LOCATION_NAME = 'Harbour noticeboard by the north pier'
const LONG_DATE = { day: 'numeric', month: 'long', year: 'numeric' }

const dateParts = (date) => ({
  day: String(date.getDate()),
  month: String(date.getMonth() + 1),
  year: String(date.getFullYear())
})

function daysFromToday(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

async function addLocationEvidence(siteNotice, number, name, displayed) {
  await siteNotice.openEvidenceItem(EVIDENCE.locationName, number)
  await siteNotice.saveLocationName(name)
  await siteNotice.waitForDisplayPage()

  await siteNotice.openEvidenceItem(EVIDENCE.dateDisplayed, number)
  await siteNotice.saveDateDisplayed(dateParts(displayed))
  await siteNotice.waitForDisplayPage()

  await siteNotice.openEvidenceItem(EVIDENCE.closeUpPhoto, number)
  await siteNotice.uploadPhoto(CLOSE_UP_PHOTO)
  await siteNotice.waitForDisplayPage()

  await siteNotice.openEvidenceItem(EVIDENCE.positionPhoto, number)
  await siteNotice.uploadPhoto(POSITION_PHOTO)
  await siteNotice.waitForDisplayPage()

  return {
    [EVIDENCE.locationName]: name,
    [EVIDENCE.dateDisplayed]: displayed.toLocaleDateString('en-GB', LONG_DATE),
    [EVIDENCE.closeUpPhoto]: CLOSE_UP_PHOTO.split('/').pop(),
    [EVIDENCE.positionPhoto]: POSITION_PHOTO.split('/').pop()
  }
}

async function openSiteNoticeTask(world) {
  await openViewDetailsWithTask(world, SITE_NOTICE_TASK)
  await applicationTask(world.page, SITE_NOTICE_TASK)
    .getByRole('link', { name: SITE_NOTICE_TASK })
    .click()
  await world.page.waitForURL(LcmlSiteNoticePage.DISPLAY_PATH, {
    timeout: 30_000
  })
  await expect(world.page.locator('h1')).toHaveText(SITE_NOTICE_TASK, {
    timeout: 30_000
  })
}

When(
  /^the caseworker sends the applicant a site notice for (marine users|marine and community users)$/,
  { timeout: 300_000 },
  async function (audience) {
    await sendSiteNoticeMessage(
      this.data.applicationReference,
      REQUEST_RELATES_TO[audience]
    )
    await waitForActionRequired(this)
  }
)

When(
  'the applicant opens the Display a site notice task',
  { timeout: 300_000 },
  async function () {
    await openSiteNoticeTask(this)
  }
)

Given(
  'an applicant asked to display a site notice is on the Display a site notice page',
  { timeout: 600_000 },
  async function () {
    await completeManualCircleApp(this)
    await submitMarineLicence(this)
    await sendSiteNoticeMessage(this.data.applicationReference, 'BOTH')
    await waitForActionRequired(this)
    await openSiteNoticeTask(this)
  }
)

When(
  'the applicant uploads an empty file as the close-up photo',
  { timeout: 180_000 },
  async function () {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    await siteNotice.openEvidenceItem(EVIDENCE.closeUpPhoto)
    await siteNotice.uploadPhoto(EMPTY_PHOTO)
  }
)

When(
  'the applicant adds all the site notice evidence for the location',
  { timeout: 300_000 },
  async function () {
    this.data.siteNoticeEvidence = await addLocationEvidence(
      new LcmlSiteNoticePage(this.page),
      1,
      LOCATION_NAME,
      daysFromToday(-1)
    )
  }
)

When(
  'the applicant changes the close-up photo to a different file',
  { timeout: 180_000 },
  async function () {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    await siteNotice.openEvidenceItem(EVIDENCE.closeUpPhoto)
    await siteNotice.uploadPhoto(POSITION_PHOTO)
    await siteNotice.waitForDisplayPage()
  }
)

When('the applicant goes back from the site notice page', async function () {
  await this.page.getByRole('link', { name: 'Back', exact: true }).click()
  await this.page.waitForURL(/\/marine-licence\/view-details\//, {
    timeout: 30_000
  })
  await this.page.waitForLoadState('load')
})

Then(
  'View details shows the {string} task as {string}',
  { timeout: 300_000 },
  async function (title, status) {
    await openViewDetailsWithTask(this, title)
    await expect(applicationTask(this.page, title)).toHaveCount(1)
    await expect(applicationTask(this.page, title)).toContainText(status)
  }
)

Then(
  'the site notice evidence error {string} is displayed',
  async function (error) {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    await expect(siteNotice.errorSummary()).toContainText(error, {
      timeout: 30_000
    })
    await expect(this.page.locator('.govuk-error-message')).toContainText(error)
  }
)

Then('the site notice evidence page has no Cancel link', async function () {
  await expect(
    this.page.getByRole('link', { name: 'Cancel', exact: true })
  ).toHaveCount(0)
  await expect(
    this.page.getByRole('link', { name: 'Back', exact: true })
  ).toHaveCount(1)
})

Then(
  "each site notice evidence item shows the applicant's answer with a Change link",
  async function () {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    for (const [item, answer] of Object.entries(this.data.siteNoticeEvidence)) {
      await expect(siteNotice.evidenceValue(item)).toHaveText(answer)
      await expect(siteNotice.evidenceLink(item)).toHaveText(/^\s*Change\b/)
    }
  }
)

Then('the close-up photo evidence shows only the new file', async function () {
  const value = new LcmlSiteNoticePage(this.page).evidenceValue(
    EVIDENCE.closeUpPhoto
  )
  await expect(value).toHaveText(POSITION_PHOTO.split('/').pop())
  await expect(value).not.toContainText(CLOSE_UP_PHOTO.split('/').pop())
})

Then(
  'the Display a site notice page is read-only and says when the evidence was submitted',
  { timeout: 300_000 },
  async function () {
    await openSiteNoticeTask(this)
    const siteNotice = new LcmlSiteNoticePage(this.page)
    const today = new Date().toLocaleDateString('en-GB', LONG_DATE)
    await expect(siteNotice.submissionNote()).toContainText(
      `Evidence was submitted ${today} by`
    )
    for (const [item, answer] of Object.entries(this.data.siteNoticeEvidence)) {
      await expect(siteNotice.evidenceValue(item)).toHaveText(answer)
    }
    await expect(siteNotice.evidenceCard().locator('a')).toHaveCount(0)
    await expect(siteNotice.sendEvidenceButton()).toHaveCount(0)
    await expect(
      this.page.getByRole('button', { name: 'Add another location' })
    ).toHaveCount(0)
  }
)

Then(
  'sending the evidence shows the {string} task as {string} on View details',
  { timeout: 300_000 },
  async function (title, status) {
    const send = new LcmlSiteNoticePage(this.page).sendEvidenceButton()
    await expect(send).toBeVisible()
    await send.click()
    await this.page.waitForURL(/\/marine-licence\/view-details\//, {
      timeout: 30_000
    })
    await this.page.waitForLoadState('load')
    await expect(applicationTask(this.page, title)).toHaveCount(1)
    await expect(applicationTask(this.page, title)).toContainText(status)
  }
)

const SITE_NOTICE_LINK = 'View and print the site notice (opens in new tab)'

function applicantName(world) {
  return getConfig().isRealDefraId
    ? process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'
    : world.testUser?.relationships?.[0]?.organisationName
}

When(
  'the applicant opens the site notice from the Get your site notice section',
  async function () {
    const section = this.page.locator('h2', { hasText: 'Get your site notice' })
    await expect(section).toBeVisible()
    const newTab = this.page.context().waitForEvent('page')
    await this.page.getByRole('link', { name: SITE_NOTICE_LINK }).click()
    const page = await newTab
    await page.waitForURL(LcmlSiteNoticePrintPage.PATH, { timeout: 30_000 })
    await page.waitForLoadState('load')
    this.siteNotice = new LcmlSiteNoticePrintPage(page)
  }
)

Then(
  "the site notice shows the application reference, the applicant's name and the summary of the works in a standard font",
  async function () {
    const notice = this.siteNotice
    const reference = this.data.applicationReference
    const applicant = applicantName(this)
    expect(applicant).toBeTruthy()
    await expect(this.page).toHaveURL(LcmlSiteNoticePage.DISPLAY_PATH)

    await expect(notice.heading).toHaveText(
      'Have your say on a proposed marine activity'
    )
    await expect(notice.subheading).toHaveText(
      `Marine licence application notice ${reference}`
    )
    await expect(notice.qrReference).toHaveText(
      `Application reference: ${reference}`
    )
    await expect(notice.bulletReference).toHaveText(
      `quote the application reference ${reference}`
    )
    await expect(notice.applicant).toHaveText(
      `${applicant} has applied to the Marine Management Organisation (MMO) under Part 4 of the Marine and Coastal Access Act 2009 for a marine licence.`
    )
    await expect(notice.summary).toHaveText(SITE_NOTICE_MESSAGE_SUMMARY)
    await expect(notice.summary).toHaveCSS('font-weight', '700')
    for (const fontFamily of await notice.fontFamilies()) {
      expect(fontFamily).not.toMatch(/GDS Transport/i)
    }
  }
)

Then(
  "the site notice QR code and web address go to the application's page on the public register",
  async function () {
    const notice = this.siteNotice
    const publicPage = publicViewDetailsUrl(notice.marineLicenceId())
    expect(await notice.decodeQrCode()).toBe(publicPage)
    await expect(notice.webAddress).toHaveText(
      publicPage.replace(/^https?:\/\//, '')
    )
  }
)

Then(
  'the site notice has no links other than the survey link and the GOV.UK logo',
  async function () {
    const notice = this.siteNotice
    expect(await notice.links()).toEqual([
      { text: 'give your feedback (opens in new tab)', inPhaseBanner: true }
    ])
    await expect(notice.page.locator('.govuk-footer')).toHaveCount(0)
    await expect(notice.page.locator('.govuk-back-link')).toHaveCount(0)
  }
)

Then(
  'printing the site notice opens the print dialog and prints only the notice on a single page',
  async function () {
    const notice = this.siteNotice
    await notice.interceptPrintDialog()
    await notice.printButton.click()
    expect(await notice.printDialogOpenings()).toBe(1)

    await notice.page.emulateMedia({ media: 'print' })
    await expect(notice.printControls).toBeHidden()
    await expect(notice.page.locator('.govuk-header')).toBeHidden()
    await expect(notice.page.locator('.govuk-phase-banner')).toBeHidden()
    expect(await notice.printedPageCount()).toBe(1)
  }
)

const D365_STEP_TIMEOUT = 600_000
const SITE_NOTICE_SUMMARY =
  'Journey test summary of the proposed works for the site notice.'

When(
  'the caseworker saves the Public notice task with {string}',
  { timeout: D365_STEP_TIMEOUT },
  async function (requirement) {
    const { status, form } = await completePublicNoticeTask(this.d365Page, {
      requirement,
      summary: SITE_NOTICE_SUMMARY,
      who: 'Marine users'
    })
    this.data.publicNotice = { requirement, status, form }
  }
)

Then('the Public notice task is {string} in D365', function (status) {
  expect(this.data.publicNotice.status).toBe(status)
})

Then(
  'the Public notice task was read-only until the Site check was done',
  function () {
    const { tasks, form } = this.data.publicNoticeBeforeSiteCheck
    expect(tasks[0]).toMatch(/^Site check\b/)
    expect(tasks.find((row) => row.startsWith('Public notice'))).toMatch(
      /Cannot start yet$/
    )
    expect(form.requirement.disabled).toBe(true)
    expect(this.data.publicNotice.status).toBeTruthy()
  }
)

Then(
  'the Public notice task asked for the site notice summary and who needs to be told',
  function () {
    const { form } = this.data.publicNotice
    expect(form.requirement).toMatchObject({
      shown: true,
      required: 'required',
      options: ['Site notice', 'None']
    })
    expect(form.proposedWorksSummary).toMatchObject({
      shown: true,
      disabled: true,
      value: this.data.projectBackground
    })
    expect(form.siteNoticeSummary).toMatchObject({
      shown: true,
      required: 'required'
    })
    expect(form.whoNeedsToBeTold).toMatchObject({
      shown: true,
      required: 'required',
      options: ['Marine users', 'Community users', 'Both']
    })
    expect(form.summaryGuidance.shown).toBe(true)
    expect(form.whoGuidance.shown).toBe(true)
  }
)

const DELETE_LOCATION_PATH =
  /\/marine-licence\/[^/]+\/delete-location\?location=\d+/

async function openDeleteLocation(page, siteNotice, number) {
  await siteNotice.deleteLocationLink(number).click()
  await page.waitForURL(DELETE_LOCATION_PATH, { timeout: 30_000 })
  await page.waitForLoadState('load')
  await expect(page.locator('h1')).toHaveText(
    `Are you sure you want to delete location ${number}?`
  )
}

When('the applicant adds another evidence location', async function () {
  const siteNotice = new LcmlSiteNoticePage(this.page)
  await expect(siteNotice.sendEvidenceButton()).toBeVisible()
  const cardsBefore = await siteNotice.locationCards().count()
  await siteNotice.addAnotherLocationButton().click()
  await expect(siteNotice.locationCards()).toHaveCount(cardsBefore + 1, {
    timeout: 30_000
  })
  await siteNotice.waitForDisplayPage()
})

Then(
  'a {string} card is added with a Delete location link, the first card has none, and Send evidence is hidden',
  async function (title) {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    await expect(siteNotice.locationCards()).toHaveText([
      'Location 1 evidence',
      title
    ])
    await expect(siteNotice.deleteLocationLink(2)).toBeVisible()
    await expect(siteNotice.deleteLocationLink(1)).toHaveCount(0)
    await expect(
      siteNotice.locationCard(2).locator('.govuk-summary-list__value')
    ).toHaveText(['Incomplete', 'Incomplete', 'Incomplete', 'Incomplete'])
    await expect(siteNotice.sendEvidenceButton()).toHaveCount(0)
  }
)

Then(
  'cancelling or going back from deleting location {int} keeps both cards',
  async function (number) {
    const page = this.page
    const siteNotice = new LcmlSiteNoticePage(page)

    await openDeleteLocation(page, siteNotice, number)
    await page.getByRole('link', { name: 'Cancel', exact: true }).click()
    await siteNotice.waitForDisplayPage()
    await expect(siteNotice.locationCards()).toHaveCount(2)

    await openDeleteLocation(page, siteNotice, number)
    await page.getByRole('link', { name: 'Back', exact: true }).click()
    await siteNotice.waitForDisplayPage()
    await expect(siteNotice.locationCards()).toHaveCount(2)
  }
)

Then(
  'confirming the deletion of location {int} leaves only the first card and shows Send evidence again',
  async function (number) {
    const page = this.page
    const siteNotice = new LcmlSiteNoticePage(page)
    await openDeleteLocation(page, siteNotice, number)
    await page
      .getByRole('button', { name: 'Yes, delete this location' })
      .click()
    await siteNotice.waitForDisplayPage()
    await expect(siteNotice.locationCards()).toHaveText(['Location 1 evidence'])
    for (const [item, answer] of Object.entries(this.data.siteNoticeEvidence)) {
      await expect(siteNotice.evidenceValue(item)).toHaveText(answer)
    }
    await expect(siteNotice.sendEvidenceButton()).toBeVisible()
    await expect(
      page.getByText(
        'Check that you have added evidence for every location where you displayed a site notice.'
      )
    ).toBeVisible()
  }
)

const RESUBMIT_TASK = 'Resubmit site notice evidence'
const RESUBMIT_STEP_TIMEOUT = 900_000
const REJECTION_REASONS = {
  1: 'The close-up photo is blurred, so we cannot read the notice.',
  2: 'The close-up photo does not show the whole notice.',
  3: 'The position photo does not show where the notice is.'
}
const RESUBMITTED_CLOSE_UP_PHOTO = POSITION_PHOTO
const RESUBMITTED_POSITION_PHOTO = CLOSE_UP_PHOTO

async function sendSiteNoticeEvidenceForLocations(world, count) {
  await completeManualCircleApp(world)
  await submitMarineLicence(world)
  await sendSiteNoticeMessage(world.data.applicationReference, 'BOTH')
  await waitForActionRequired(world)
  await openSiteNoticeTask(world)

  const siteNotice = new LcmlSiteNoticePage(world.page)
  world.data.siteNoticeLocations = {}
  for (let number = 1; number <= count; number++) {
    if (number > 1) {
      await siteNotice.addAnotherLocationButton().click()
      await expect(siteNotice.locationCards()).toHaveCount(number, {
        timeout: 30_000
      })
      await siteNotice.waitForDisplayPage()
    }
    world.data.siteNoticeLocations[number] = await addLocationEvidence(
      siteNotice,
      number,
      `Location ${number} noticeboard`,
      daysFromToday(-number)
    )
  }

  await siteNotice.sendEvidenceButton().click()
  await world.page.waitForURL(/\/marine-licence\/view-details\//, {
    timeout: 30_000
  })
  await world.page.waitForLoadState('load')
}

async function rejectLocationPhotographs(world, locations) {
  await sendSiteNoticeEvidenceRejectionMessage(
    world.data.applicationReference,
    locations.map((locationNumber) => ({
      locationNumber,
      reason: REJECTION_REASONS[locationNumber]
    }))
  )
  world.data.rejectedLocations = [...locations].sort((a, b) => a - b)
  await waitForActionRequired(world)
}

async function openResubmitTask(world) {
  await openViewDetailsWithTask(world, RESUBMIT_TASK)
  await applicationTask(world.page, RESUBMIT_TASK)
    .getByRole('link', { name: RESUBMIT_TASK })
    .click()
  const siteNotice = new LcmlSiteNoticePage(world.page)
  await siteNotice.waitForResubmitPage()
  await expect(world.page.locator('h1')).toHaveText(RESUBMIT_TASK, {
    timeout: 30_000
  })
  return siteNotice
}

Given(
  'an applicant has sent site notice evidence for {int} locations',
  { timeout: RESUBMIT_STEP_TIMEOUT },
  async function (count) {
    await sendSiteNoticeEvidenceForLocations(this, count)
  }
)

When(
  'the caseworker rejects the photographs for locations {int} and {int}',
  { timeout: 300_000 },
  async function (first, second) {
    await rejectLocationPhotographs(this, [first, second])
  }
)

Given(
  'an applicant asked to resubmit the photographs for locations {int} and {int} of {int} is on the Resubmit site notice evidence page',
  { timeout: RESUBMIT_STEP_TIMEOUT },
  async function (first, second, count) {
    await sendSiteNoticeEvidenceForLocations(this, count)
    await rejectLocationPhotographs(this, [first, second])
    await openResubmitTask(this)
  }
)

When(
  'the applicant uploads new photographs for each rejected location',
  { timeout: 600_000 },
  async function () {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    for (const number of this.data.rejectedLocations) {
      await siteNotice.openEvidenceItem(EVIDENCE.closeUpPhoto, number)
      await siteNotice.uploadPhoto(RESUBMITTED_CLOSE_UP_PHOTO)
      await siteNotice.waitForResubmitPage()

      await siteNotice.openEvidenceItem(EVIDENCE.positionPhoto, number)
      await siteNotice.uploadPhoto(RESUBMITTED_POSITION_PHOTO)
      await siteNotice.waitForResubmitPage()
    }
  }
)

Then(
  "the Resubmit site notice evidence task shows only the rejected locations in order, with the original name and date, the caseworker's reason and no photos",
  { timeout: 300_000 },
  async function () {
    const siteNotice = await openResubmitTask(this)
    const rejected = this.data.rejectedLocations
    await expect(siteNotice.locationCards()).toHaveText(
      rejected.map((number) => `Location ${number} evidence`)
    )
    for (const number of rejected) {
      const original = this.data.siteNoticeLocations[number]
      await expect(
        siteNotice.locationCard(number).locator('.govuk-summary-list__key')
      ).toHaveText([
        EVIDENCE.locationName,
        EVIDENCE.dateDisplayed,
        'Why we could not accept your photographs',
        EVIDENCE.closeUpPhoto,
        EVIDENCE.positionPhoto
      ])
      await expect(
        siteNotice.locationCard(number).locator('.govuk-summary-list__value')
      ).toHaveText([
        original[EVIDENCE.locationName],
        original[EVIDENCE.dateDisplayed],
        REJECTION_REASONS[number],
        'Incomplete',
        'Incomplete'
      ])
      for (const item of [EVIDENCE.locationName, EVIDENCE.dateDisplayed]) {
        await expect(siteNotice.evidenceLink(item, number)).toHaveCount(0)
      }
      for (const item of [EVIDENCE.closeUpPhoto, EVIDENCE.positionPhoto]) {
        await expect(siteNotice.evidenceLink(item, number)).toHaveText(
          /^\s*Add\b/
        )
      }
    }
  }
)

Then(
  'the applicant cannot add or delete locations, or send evidence yet',
  async function () {
    const siteNotice = new LcmlSiteNoticePage(this.page)
    await expect(siteNotice.addAnotherLocationButton()).toHaveCount(0)
    await expect(
      this.page.getByRole('link', { name: /Delete location/ })
    ).toHaveCount(0)
    await expect(siteNotice.sendEvidenceButton()).toHaveCount(0)
  }
)

Then(
  'going back from the Resubmit site notice evidence task leaves it {string} and the application {string}',
  { timeout: 300_000 },
  async function (taskStatus, applicationStatus) {
    await this.page.getByRole('link', { name: 'Back', exact: true }).click()
    await this.page.waitForURL(/\/marine-licence\/view-details\//, {
      timeout: 30_000
    })
    await this.page.waitForLoadState('load')
    await expect(applicationTask(this.page, RESUBMIT_TASK)).toContainText(
      taskStatus
    )
    await expect(
      this.page.locator(
        '#application-overview-card .govuk-summary-list__row:has(dt:text-is("Status")) .govuk-summary-list__value'
      )
    ).toContainText(applicationStatus)
  }
)

Then(
  'the Resubmit site notice evidence task is read-only and says when the evidence was resubmitted',
  { timeout: 300_000 },
  async function () {
    const siteNotice = await openResubmitTask(this)
    const today = new Date().toLocaleDateString('en-GB', LONG_DATE)
    await expect(siteNotice.resubmissionNote()).toHaveText(
      new RegExp(`^\\s*Evidence was resubmitted ${today}( by .+)?\\s*$`)
    )
    for (const number of this.data.rejectedLocations) {
      await expect(
        siteNotice.locationCard(number).locator('.govuk-summary-list__value')
      ).toHaveText([
        this.data.siteNoticeLocations[number][EVIDENCE.locationName],
        this.data.siteNoticeLocations[number][EVIDENCE.dateDisplayed],
        REJECTION_REASONS[number],
        RESUBMITTED_CLOSE_UP_PHOTO.split('/').pop(),
        RESUBMITTED_POSITION_PHOTO.split('/').pop()
      ])
      await expect(siteNotice.locationCard(number).locator('a')).toHaveCount(0)
    }
    await expect(siteNotice.sendEvidenceButton()).toHaveCount(0)
  }
)
