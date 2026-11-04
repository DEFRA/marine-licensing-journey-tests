import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  START_CONSULTATION_TASK,
  completePublicRegisterTask,
  openWfdTask,
  completeWfdReview,
  completePublicNoticeTask,
  completeAllMarinePlanPolicyTasks,
  completePrepareForConsultationTask,
  readCaseTaskRows,
  readCaseStatus,
  readStartConsultationTask,
  saveStartConsultationTask,
  waitForCaseTaskLink,
  waitForCaseTaskStatus,
  waitForCaseStatus
} from '../support/d365.js'

const START_CONSULTATION_TIMEOUT = 1_200_000
const CONSULTEE = {
  organisationId:
    process.env.CONSULTEE_ORGANISATION_ID ||
    '12db77a8-3f24-f111-8341-000d3a495719',
  organisationName: process.env.CONSULTEE_ORGANISATION_NAME || 'Test name',
  type: 'Request for advice',
  notes: 'Journey test advice requested from the consultee.'
}
const NOT_STARTED_NOTICE =
  'You cannot start consultation until the required assessment tasks are complete.'
const EXPLANATION = [
  'The required assessment tasks are complete. You can now start consultation for this case.',
  'The application is published on the public register.',
  'Application notifications and requests for advice are sent to the organisations you selected in Prepare for consultation',
  'The case status changes to Consultation.'
]

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

When(
  'the caseworker completes every other task the Start consultation task depends on, with a consultee to ask for advice',
  { timeout: START_CONSULTATION_TIMEOUT },
  async function () {
    const page = this.d365Page
    this.data.startConsultation = {
      afterSiteCheck: await startConsultationSnapshot(page)
    }

    await completePublicRegisterTask(page, {
      relatesTo: 'Commercial or industrial confidentiality',
      commercial: {
        decision: 'Disagree',
        rationale: 'Journey test rationale for the withholding decision.',
        tellApplicant: 'Journey test message about the withholding request.'
      },
      markComplete: true
    })
    const caseUrl = page.url()
    await openWfdTask(page)
    expect(await completeWfdReview(page)).toBe('Done')
    await page.goto(caseUrl)
    await page.waitForLoadState('load')
    const { status: publicNotice } = await completePublicNoticeTask(page, {
      requirement: 'None',
      reason: 'Journey test: no public notices are needed for these works.'
    })
    expect(publicNotice).toBe('Done')
    this.data.startConsultation.marinePlanPolicyTasks =
      await completeAllMarinePlanPolicyTasks(
        page,
        'Compliant',
        'Journey test decision for this policy'
      )
    this.data.startConsultation.beforePreparation =
      await startConsultationSnapshot(page)

    await completePrepareForConsultationTask(page, [CONSULTEE])
    this.data.startConsultation.caseStatusBeforeStart =
      await readCaseStatus(page)
  }
)

Then(
  'the Start consultation task is last in the task list and stayed "Cannot start yet" and read-only until Prepare for consultation was Done',
  function () {
    const { afterSiteCheck, beforePreparation, marinePlanPolicyTasks } =
      this.data.startConsultation
    for (const { tasks, form } of [afterSiteCheck, beforePreparation]) {
      expect(tasks.at(-1)).toBe(`${START_CONSULTATION_TASK} Cannot start yet`)
      expect(form.confirmation.disabled).toBe(true)
      expect(form.notices).toContain(NOT_STARTED_NOTICE)
    }
    expect(beforePreparation.tasks).toEqual([
      'Site check Done',
      'Public register Done',
      'Water Framework Directive (WFD) Done',
      'Prepare for consultation To do',
      'Public notice Done',
      `${START_CONSULTATION_TASK} Cannot start yet`
    ])
    expect(marinePlanPolicyTasks).toBeGreaterThan(0)
  }
)

Then(
  'the Start consultation task is "To do" with the explanation of what starting consultation does and an unticked confirmation',
  { timeout: 300_000 },
  async function () {
    const page = this.d365Page
    const tasks = await waitForCaseTaskStatus(
      page,
      START_CONSULTATION_TASK,
      'To do'
    )
    expect(tasks.at(-1)).toBe(`${START_CONSULTATION_TASK} To do`)
    const form = await readStartConsultationTask(page)
    expect(form.confirmation).toEqual({
      label: 'I confirm that this case is ready to start consultation',
      disabled: false,
      ticked: false
    })
    for (const line of EXPLANATION) {
      expect(form.explanation).toContain(line)
    }
  }
)

Then(
  'saving the Start consultation task without the confirmation leaves it "To do" and the case {string}',
  { timeout: 300_000 },
  async function (caseStatus) {
    const page = this.d365Page
    await saveStartConsultationTask(page, { confirm: false })
    const tasks = await readCaseTaskRows(page)
    expect(tasks.at(-1)).toBe(`${START_CONSULTATION_TASK} To do`)
    expect(await readCaseStatus(page)).toBe(caseStatus)
    expect(this.data.startConsultation.caseStatusBeforeStart).toBe(caseStatus)
  }
)

Then(
  'saving the Start consultation task with the confirmation marks it "Done" and moves the case to {string}',
  { timeout: 300_000 },
  async function (caseStatus) {
    const page = this.d365Page
    await saveStartConsultationTask(page, { confirm: true })
    const tasks = await waitForCaseTaskStatus(
      page,
      START_CONSULTATION_TASK,
      'Done'
    )
    expect(tasks.at(-1)).toBe(`${START_CONSULTATION_TASK} Done`)
    expect(await waitForCaseStatus(page, caseStatus)).toBe(caseStatus)
  }
)
