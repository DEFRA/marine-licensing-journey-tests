import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  PREPARE_FOR_CONSULTATION_TASK,
  START_CONSULTATION_TASK,
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  openMarineLicenceCaseInD365,
  completeSiteCheckTask,
  completePublicRegisterTask,
  openWfdTask,
  completeWfdReview,
  completePublicNoticeTask,
  completeAllMarinePlanPolicyTasks,
  openPrepareForConsultationTask,
  readPrepareForConsultationTask,
  openAddConsultee,
  readConsulteeFormFields,
  searchConsulteeOrganisations,
  fillConsultee,
  addConsultee,
  savePrepareForConsultationTask,
  readCaseTaskRows,
  readCaseStatus,
  readStartConsultationTask,
  saveStartConsultationTask,
  waitForCaseTaskLink,
  waitForCaseTaskStatus,
  waitForCaseStatus
} from '../support/d365.js'

const CONSULTATION_TIMEOUT = 1_800_000
const CONSULTEE = {
  organisationId:
    process.env.CONSULTEE_ORGANISATION_ID ||
    '12db77a8-3f24-f111-8341-000d3a495719',
  organisationName: process.env.CONSULTEE_ORGANISATION_NAME || 'Test name',
  type: 'Request for advice',
  notes: 'Journey test advice requested from the consultee.'
}
const NOT_A_CONSULTEE =
  process.env.NON_CONSULTEE_ORGANISATION_NAME || 'Dredging Co'
const NOTES_FIELD = 'Notes for the organisation'
const SITE_CHECK_NOTICE =
  'You cannot start this task until you complete the Site check task.'
const NOT_STARTED_NOTICE =
  'You cannot start consultation until the required assessment tasks are complete.'
const EXPLANATION = [
  'The required assessment tasks are complete. You can now start consultation for this case.',
  'The application is published on the public register.',
  'Application notifications and requests for advice are sent to the organisations you selected in Prepare for consultation',
  'The case status changes to Consultation.'
]

function acceptLeavePrompts(page) {
  page.on('dialog', (dialog) => dialog.accept().catch(() => {}))
}

async function returnTo(page, url) {
  await page.goto(url)
  await page.waitForLoadState('load')
}

async function prepareSnapshot(page) {
  await waitForCaseTaskLink(
    page,
    page.getByRole('link', { name: PREPARE_FOR_CONSULTATION_TASK }).first(),
    PREPARE_FOR_CONSULTATION_TASK
  )
  const tasks = await readCaseTaskRows(page)
  const { caseUrl, taskUrl } = await openPrepareForConsultationTask(page)
  const form = await readPrepareForConsultationTask(page)
  return { caseUrl, taskUrl, tasks, form }
}

async function startConsultationSnapshot(page) {
  await waitForCaseTaskLink(
    page,
    page.getByRole('link', { name: START_CONSULTATION_TASK }).first(),
    START_CONSULTATION_TASK
  )
  return {
    tasks: await readCaseTaskRows(page),
    form: await readStartConsultationTask(page)
  }
}

async function checkAddConsultee(page, taskUrl) {
  await openAddConsultee(page)
  const notFlagged = await searchConsulteeOrganisations(page, NOT_A_CONSULTEE)
  const flagged = await searchConsulteeOrganisations(
    page,
    CONSULTEE.organisationName
  )
  await fillConsultee(page, CONSULTEE)
  const adviceFields = await readConsulteeFormFields(page)
  await fillConsultee(page, { type: 'Application notification' })
  const notificationFields = await readConsulteeFormFields(page)
  await returnTo(page, taskUrl)
  return { notFlagged, flagged, adviceFields, notificationFields }
}

async function completeAssessmentTasks(page, caseUrl) {
  await completePublicRegisterTask(page, {
    relatesTo: 'Commercial or industrial confidentiality',
    commercial: {
      decision: 'Disagree',
      rationale: 'Journey test rationale for the withholding decision.',
      tellApplicant: 'Journey test message about the withholding request.'
    },
    markComplete: true
  })
  await openWfdTask(page)
  expect(await completeWfdReview(page)).toBe('Done')
  await returnTo(page, caseUrl)
  const { status: publicNotice } = await completePublicNoticeTask(page, {
    requirement: 'None',
    reason: 'Journey test: no public notices are needed for these works.'
  })
  expect(publicNotice).toBe('Done')
  return completeAllMarinePlanPolicyTasks(
    page,
    'Compliant',
    'Journey test decision for this policy'
  )
}

When(
  'the caseworker prepares the case for consultation and starts the consultation in D365',
  { timeout: CONSULTATION_TIMEOUT },
  async function () {
    const { browser, page } = await launchD365Browser()
    this.d365Browser = browser
    this.d365Page = page
    acceptLeavePrompts(page)
    await loginToD365(page)
    await verifyD365Login(page)
    await openMarineLicenceCaseInD365(page, this.data.applicationReference)
    const consultation = {}
    this.data.consultation = consultation

    consultation.prepareBeforeSiteCheck = await prepareSnapshot(page)
    const { caseUrl } = consultation.prepareBeforeSiteCheck
    await returnTo(page, caseUrl)
    await completeSiteCheckTask(page)
    await waitForCaseTaskStatus(page, PREPARE_FOR_CONSULTATION_TASK, 'To do')
    consultation.prepareAfterSiteCheck = await prepareSnapshot(page)
    const { taskUrl } = consultation.prepareAfterSiteCheck
    consultation.addConsultee = await checkAddConsultee(page, taskUrl)

    await returnTo(page, caseUrl)
    consultation.startAfterSiteCheck = await startConsultationSnapshot(page)
    consultation.marinePlanPolicyTasks = await completeAssessmentTasks(
      page,
      caseUrl
    )
    consultation.startBeforePreparation = await startConsultationSnapshot(page)

    await returnTo(page, taskUrl)
    consultation.consulteeAdded = await addConsultee(page, taskUrl, CONSULTEE)
    consultation.consultees = (
      await readPrepareForConsultationTask(page)
    ).consultees
    consultation.prepareSavedUnticked = await savePrepareForConsultationTask(
      page,
      caseUrl,
      { complete: false }
    )
    consultation.prepareSavedTicked = await savePrepareForConsultationTask(
      page,
      caseUrl,
      { complete: true }
    )

    consultation.startAfterPreparation = {
      tasks: await waitForCaseTaskStatus(
        page,
        START_CONSULTATION_TASK,
        'To do'
      ),
      form: await readStartConsultationTask(page)
    }
    consultation.caseStatusBeforeStart = await readCaseStatus(page)
    await saveStartConsultationTask(page, { confirm: false })
    consultation.startSavedUnconfirmed = {
      tasks: await readCaseTaskRows(page),
      caseStatus: await readCaseStatus(page)
    }
    await saveStartConsultationTask(page, { confirm: true })
    consultation.startSavedConfirmed = {
      tasks: await waitForCaseTaskStatus(page, START_CONSULTATION_TASK, 'Done'),
      caseStatus: await waitForCaseStatus(page, 'Consultation')
    }
  }
)

Then(
  'Prepare for consultation could only be started once the Site check was Done',
  function () {
    const { prepareBeforeSiteCheck: before, prepareAfterSiteCheck: after } =
      this.data.consultation
    expect(before.tasks).toContain('Site check To do')
    expect(before.tasks).toContain(
      `${PREPARE_FOR_CONSULTATION_TASK} Cannot start yet`
    )
    expect(before.form.completeDisabled).toBe(true)
    expect(before.form.notices).toContain(SITE_CHECK_NOTICE)

    expect(after.tasks).toContain('Site check Done')
    expect(after.tasks).toContain(`${PREPARE_FOR_CONSULTATION_TASK} To do`)
    expect(after.form.completeDisabled).toBe(false)
    expect(after.form.addConsulteeShown).toBe(true)
    expect(after.form.columns).toEqual(['Organisation', 'Consultation type'])
    expect(after.form.consultees).toEqual([])
  }
)

Then(
  'Add consultee offered only consultee organisations, and asked for notes only for a request for advice',
  function () {
    const { notFlagged, flagged, adviceFields, notificationFields } =
      this.data.consultation.addConsultee
    expect(notFlagged.join(' | ')).not.toContain(NOT_A_CONSULTEE)
    expect(flagged.join(' | ')).toContain(CONSULTEE.organisationName)
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
  'Prepare for consultation was "In Progress" when saved unticked and "Done" when saved ticked',
  function () {
    const {
      consulteeAdded,
      consultees,
      prepareSavedUnticked,
      prepareSavedTicked
    } = this.data.consultation
    expect(consulteeAdded.saved, consulteeAdded.notices.join(' | ')).toBe(true)
    expect(consultees).toEqual([
      { organisation: CONSULTEE.organisationName, type: CONSULTEE.type }
    ])
    expect(prepareSavedUnticked).toBe('In Progress')
    expect(prepareSavedTicked).toBe('Done')
  }
)

Then(
  'Start consultation could only be started once Prepare for consultation was Done',
  function () {
    const {
      startAfterSiteCheck,
      startBeforePreparation,
      startAfterPreparation,
      marinePlanPolicyTasks
    } = this.data.consultation
    for (const { tasks, form } of [
      startAfterSiteCheck,
      startBeforePreparation
    ]) {
      expect(tasks.at(-1)).toBe(`${START_CONSULTATION_TASK} Cannot start yet`)
      expect(form.confirmation.disabled).toBe(true)
      expect(form.notices).toContain(NOT_STARTED_NOTICE)
    }
    expect(startBeforePreparation.tasks).toEqual([
      'Site check Done',
      'Public register Done',
      'Water Framework Directive (WFD) Done',
      `${PREPARE_FOR_CONSULTATION_TASK} To do`,
      'Public notice Done',
      `${START_CONSULTATION_TASK} Cannot start yet`
    ])
    expect(marinePlanPolicyTasks).toBeGreaterThan(0)

    expect(startAfterPreparation.tasks.at(-1)).toBe(
      `${START_CONSULTATION_TASK} To do`
    )
    expect(startAfterPreparation.form.confirmation).toEqual({
      label: 'I confirm that this case is ready to start consultation',
      disabled: false,
      ticked: false
    })
    for (const line of EXPLANATION) {
      expect(startAfterPreparation.form.explanation).toContain(line)
    }
  }
)

Then(
  'starting the consultation moved the case from {string} to {string}',
  function (statusBefore, statusAfter) {
    const {
      caseStatusBeforeStart,
      startSavedUnconfirmed,
      startSavedConfirmed
    } = this.data.consultation
    expect(caseStatusBeforeStart).toBe(statusBefore)
    expect(startSavedUnconfirmed.tasks.at(-1)).toBe(
      `${START_CONSULTATION_TASK} To do`
    )
    expect(startSavedUnconfirmed.caseStatus).toBe(statusBefore)
    expect(startSavedConfirmed.tasks.at(-1)).toBe(
      `${START_CONSULTATION_TASK} Done`
    )
    expect(startSavedConfirmed.caseStatus).toBe(statusAfter)
  }
)
