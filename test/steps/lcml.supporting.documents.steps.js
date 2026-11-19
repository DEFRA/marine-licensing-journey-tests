import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlSupportingDocumentsPage, {
  SUPPORTING_DOCUMENTS_TASK
} from '../pages/lcml.supporting.documents.page.js'

const CONSIDERATION =
  'We have considered this policy in full; the attached report sets out the survey results behind it.'
const DOCUMENTS = [
  'test/resources/test.pdf',
  'test/resources/replacement-drawing.pdf'
]
const LOCATION = 'Section 4.2'
const SECTION = 'Supporting documents'
const SUPPORTING_DOCUMENT_UPLOAD_PATH =
  '/marine-licence/marine-plan-policy/supporting-document-upload'

async function policyListState(documents) {
  await documents.openPolicyList()
  const sectionShown = (await documents.page.locator('main h2').allInnerTexts())
    .map((heading) => heading.trim())
    .includes(SECTION)
  return {
    sectionShown,
    task: sectionShown ? await documents.supportingDocumentsTask() : null
  }
}

async function uploadAndLink(documents, file, code) {
  await documents.openUploadTask()
  await documents.uploadAndWaitForDocumentType(file)
  await documents.page.getByRole('radio').first().check()
  await documents.continue()
  await documents.policyCheckbox(code).check()
  await (await documents.locationFor(code)).fill(LOCATION)
  await documents.continue('Save and continue')
}

When(
  'the user completes every policy consideration, {int} of which refer to a document, and uploads a supporting document for each of those policies',
  { timeout: 300_000 },
  async function (count) {
    const documents = new LcmlSupportingDocumentsPage(this.page)
    const states = [await policyListState(documents)]
    const codes = await documents.policyCodes()
    expect(codes.length).toBeGreaterThan(count)
    const referring = codes.slice(0, count)

    await documents.openPolicy(referring[0])
    const tickedAtFirst = await documents.refersToDocument.isChecked()
    await documents.saveConsideration(CONSIDERATION, true)
    states.push(await policyListState(documents))

    for (const code of codes.slice(1)) {
      await documents.openPolicyList()
      await documents.openPolicy(code)
      await documents.saveConsideration(CONSIDERATION, referring.includes(code))
    }
    states.push(await policyListState(documents))

    await documents.openPolicy(referring[0])
    const tickedWhenReopened = await documents.refersToDocument.isChecked()

    for (const [index, code] of referring.entries()) {
      await documents.openPolicyList()
      await uploadAndLink(documents, DOCUMENTS[index % DOCUMENTS.length], code)
      states.push(await policyListState(documents))
    }

    const [
      beforeAny,
      firstReferring,
      allCompleted,
      firstUploaded,
      secondUploaded
    ] = states
    this.data.supportingDocuments = {
      referring,
      tickedAtFirst,
      tickedWhenReopened,
      listStates: {
        beforeAny,
        firstReferring,
        allCompleted,
        firstUploaded,
        secondUploaded
      }
    }
  }
)

function stillNeededFor(codes) {
  if (!codes.length) {
    return ''
  }
  const list = new Intl.ListFormat('en-GB', { type: 'conjunction' })
  return `Still needed for ${list.format([...codes].sort())}`
}

Then(
  'the {string} section appears once a policy consideration refers to a document, with the {string} task {string} for that policy',
  function (section, task, status) {
    const { listStates, referring } = this.data.supportingDocuments
    expect(section).toBe(SECTION)
    expect(task).toBe(SUPPORTING_DOCUMENTS_TASK)
    expect(listStates.beforeAny.sectionShown).toBe(false)
    expect(listStates.firstReferring).toEqual({
      sectionShown: true,
      task: { status, hint: stillNeededFor([referring[0]]) }
    })
  }
)

Then(
  'the {string} checkbox is unticked on a new policy and stays ticked when the saved policy is opened again',
  async function (label) {
    const { tickedAtFirst, tickedWhenReopened, referring } =
      this.data.supportingDocuments
    expect(tickedAtFirst).toBe(false)
    expect(tickedWhenReopened).toBe(true)
    const documents = new LcmlSupportingDocumentsPage(this.page)
    await documents.openPolicyList()
    await documents.openPolicy(referring[0])
    await expect(this.page.getByText(label, { exact: true })).toBeVisible()
  }
)

Then(
  'the task is still {string} for both policies once every policy consideration is completed',
  function (status) {
    const { listStates, referring } = this.data.supportingDocuments
    expect(listStates.allCompleted.task).toEqual({
      status,
      hint: stillNeededFor(referring)
    })
  }
)

Then(
  'the task is {string} for the second policy once a document is uploaded for the first policy',
  function (status) {
    const { listStates, referring } = this.data.supportingDocuments
    expect(listStates.firstUploaded.task).toEqual({
      status,
      hint: stillNeededFor([referring[1]])
    })
  }
)

Then(
  'the task is {string} once a document is uploaded for the second policy',
  function (status) {
    const { listStates } = this.data.supportingDocuments
    expect(listStates.secondUploaded.task).toEqual({ status, hint: '' })
  }
)

const WRONG_FILE_TYPE = 'test/resources/site-notice-close-up.png'

async function startUploadForReferringPolicy(world) {
  const documents = new LcmlSupportingDocumentsPage(world.page)
  await documents.openPolicyList()
  const [code] = await documents.policyCodes()
  await documents.openPolicy(code)
  await documents.saveConsideration(CONSIDERATION, true)
  await documents.openUploadTask()
  return documents
}

When(
  'a policy consideration refers to a document and the user uploads a PNG image as the supporting document',
  { timeout: 300_000 },
  async function () {
    const documents = await startUploadForReferringPolicy(this)
    await documents.uploadExpectingRejection(WRONG_FILE_TYPE)
    this.data.supportingDocuments = {
      rejection: {
        heading: await documents.heading.innerText(),
        path: new URL(documents.page.url()).pathname,
        errors: await documents.errors()
      },
      listAfter: await policyListState(documents)
    }
  }
)

Then('the {string} page showed the error {string}', function (heading, error) {
  const { rejection } = this.data.supportingDocuments
  expect(rejection.path).toBe(SUPPORTING_DOCUMENT_UPLOAD_PATH)
  expect(rejection.heading).toContain(heading)
  expect(rejection.errors).toEqual([error])
})

Then('the {string} task is still {string}', function (task, status) {
  const { listAfter } = this.data.supportingDocuments
  expect(task).toBe(SUPPORTING_DOCUMENTS_TASK)
  expect(listAfter.task.status).toBe(status)
})
