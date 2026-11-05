import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  PREPARE_FOR_CONSULTATION_TASK,
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  openMarineLicenceCaseInD365,
  waitForCaseTaskLink,
  waitForCaseTaskStatus,
  readCaseTaskRows,
  completeSiteCheckTask,
  openPrepareForConsultationTask,
  readPrepareForConsultationTask,
  openAddConsultee,
  readConsulteeFormFields,
  searchConsulteeOrganisations,
  fillConsultee,
  addConsultee,
  savePrepareForConsultationTask,
  listConsulteeOrganisations
} from '../support/d365.js'

const PREPARE_TIMEOUT = 1_200_000
const NOT_A_CONSULTEE =
  process.env.NON_CONSULTEE_ORGANISATION_NAME || 'Dredging Co'
const NOTES_FIELD = 'Notes for the organisation'
const SITE_CHECK_NOTICE =
  'You cannot start this task until you complete the Site check task.'
const ADVICE_NOTES = 'Journey test notes for the organisation.'

function acceptLeavePrompts(page) {
  page.on('dialog', (dialog) => dialog.accept().catch(() => {}))
}

async function returnToTask(world) {
  await world.d365Page.goto(world.data.prepareTask.taskUrl)
  await world.d365Page.waitForLoadState('load')
}

When(
  'the caseworker opens Prepare for consultation before and after completing the Site check in D365',
  { timeout: PREPARE_TIMEOUT },
  async function () {
    const { browser, page } = await launchD365Browser()
    this.d365Browser = browser
    this.d365Page = page
    acceptLeavePrompts(page)
    await loginToD365(page)
    await verifyD365Login(page)
    await openMarineLicenceCaseInD365(page, this.data.applicationReference)
    await waitForCaseTaskLink(
      page,
      page.getByRole('link', { name: PREPARE_FOR_CONSULTATION_TASK }).first(),
      PREPARE_FOR_CONSULTATION_TASK
    )
    const tasksBeforeSiteCheck = await readCaseTaskRows(page)
    const { caseUrl } = await openPrepareForConsultationTask(page)
    const formBeforeSiteCheck = await readPrepareForConsultationTask(page)

    await page.goto(caseUrl)
    await page.waitForLoadState('load')
    await completeSiteCheckTask(page)
    const tasksAfterSiteCheck = await waitForCaseTaskStatus(
      page,
      PREPARE_FOR_CONSULTATION_TASK,
      'To do'
    )
    const { taskUrl } = await openPrepareForConsultationTask(page)
    this.data.prepareTask = {
      caseUrl,
      taskUrl,
      tasksBeforeSiteCheck,
      formBeforeSiteCheck,
      tasksAfterSiteCheck,
      formAfterSiteCheck: await readPrepareForConsultationTask(page)
    }
  }
)

Then(
  'Prepare for consultation was "Cannot start yet" and read-only until the Site check was Done',
  function () {
    const { tasksBeforeSiteCheck, formBeforeSiteCheck } = this.data.prepareTask
    expect(tasksBeforeSiteCheck).toContain('Site check To do')
    expect(tasksBeforeSiteCheck).toContain(
      `${PREPARE_FOR_CONSULTATION_TASK} Cannot start yet`
    )
    expect(formBeforeSiteCheck.completeDisabled).toBe(true)
    expect(formBeforeSiteCheck.notices).toContain(SITE_CHECK_NOTICE)
  }
)

Then(
  'Prepare for consultation is then "To do" with an empty Consultees table of organisation and consultation type',
  function () {
    const { tasksAfterSiteCheck, formAfterSiteCheck } = this.data.prepareTask
    expect(tasksAfterSiteCheck).toContain('Site check Done')
    expect(tasksAfterSiteCheck).toContain(
      `${PREPARE_FOR_CONSULTATION_TASK} To do`
    )
    expect(formAfterSiteCheck.completeDisabled).toBe(false)
    expect(formAfterSiteCheck.addConsulteeShown).toBe(true)
    expect(formAfterSiteCheck.columns).toEqual([
      'Organisation',
      'Consultation type'
    ])
    expect(formAfterSiteCheck.consultees).toEqual([])
  }
)

Then(
  'the Add consultee organisation search offers only organisations flagged as consultees',
  { timeout: 300_000 },
  async function () {
    const page = this.d365Page
    const [consultee] = await listConsulteeOrganisations(page, 1)
    await openAddConsultee(page)
    const notFlagged = await searchConsulteeOrganisations(page, NOT_A_CONSULTEE)
    const flagged = await searchConsulteeOrganisations(
      page,
      consultee.organisationName
    )
    await returnToTask(this)
    expect(notFlagged.join(' | ')).not.toContain(NOT_A_CONSULTEE)
    expect(flagged.join(' | ')).toContain(consultee.organisationName)
  }
)

Then(
  'Add consultee asks for notes for the organisation only for a request for advice',
  { timeout: 300_000 },
  async function () {
    const page = this.d365Page
    const [consultee] = await listConsulteeOrganisations(page, 1)
    await openAddConsultee(page)
    await fillConsultee(page, { ...consultee, type: 'Request for advice' })
    const adviceFields = await readConsulteeFormFields(page)
    await fillConsultee(page, { type: 'Application notification' })
    const notificationFields = await readConsulteeFormFields(page)
    await returnToTask(this)
    expect(adviceFields).toEqual(
      expect.arrayContaining(['Organisation', 'Consultation type', NOTES_FIELD])
    )
    expect(notificationFields).toEqual(
      expect.arrayContaining(['Organisation', 'Consultation type'])
    )
    expect(notificationFields).not.toContain(NOTES_FIELD)
  }
)

Then(
  'adding a consultee and saving the task marks it "In Progress" unticked and "Done" ticked',
  { timeout: 300_000 },
  async function () {
    const page = this.d365Page
    const { caseUrl, taskUrl } = this.data.prepareTask
    const [organisation] = await listConsulteeOrganisations(page, 1)
    const consultee = {
      ...organisation,
      type: 'Request for advice',
      notes: ADVICE_NOTES
    }
    const { saved, notices } = await addConsultee(page, taskUrl, consultee)
    expect(saved, notices.join(' | ')).toBe(true)
    expect((await readPrepareForConsultationTask(page)).consultees).toEqual([
      { organisation: consultee.organisationName, type: consultee.type }
    ])

    expect(
      await savePrepareForConsultationTask(page, caseUrl, { complete: false })
    ).toBe('In Progress')
    expect(
      await savePrepareForConsultationTask(page, caseUrl, { complete: true })
    ).toBe('Done')
  }
)
