import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  submitMarineLicence
} from '../support/lcml-helpers.js'
import { completePublicNoticeTask } from '../support/d365.js'
import { sendSiteNoticeMessage } from '../support/mas-queue.js'
import {
  waitForActionRequired,
  applicationTask,
  openViewDetailsWithTask
} from '../support/lcml-application-tasks.js'
import LcmlSiteNoticePage from '../pages/lcml.site.notice.page.js'

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
    const siteNotice = new LcmlSiteNoticePage(this.page)
    const displayed = daysFromToday(-1)
    this.data.siteNoticeEvidence = {
      [EVIDENCE.locationName]: LOCATION_NAME,
      [EVIDENCE.dateDisplayed]: displayed.toLocaleDateString(
        'en-GB',
        LONG_DATE
      ),
      [EVIDENCE.closeUpPhoto]: CLOSE_UP_PHOTO.split('/').pop(),
      [EVIDENCE.positionPhoto]: POSITION_PHOTO.split('/').pop()
    }

    await siteNotice.openEvidenceItem(EVIDENCE.locationName)
    await siteNotice.saveLocationName(LOCATION_NAME)
    await siteNotice.waitForDisplayPage()

    await siteNotice.openEvidenceItem(EVIDENCE.dateDisplayed)
    await siteNotice.saveDateDisplayed(dateParts(displayed))
    await siteNotice.waitForDisplayPage()

    await siteNotice.openEvidenceItem(EVIDENCE.closeUpPhoto)
    await siteNotice.uploadPhoto(CLOSE_UP_PHOTO)
    await siteNotice.waitForDisplayPage()

    await siteNotice.openEvidenceItem(EVIDENCE.positionPhoto)
    await siteNotice.uploadPhoto(POSITION_PHOTO)
    await siteNotice.waitForDisplayPage()
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
