import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import LcmlSupportingDocumentsPage, {
  MARINE_PLAN_POLICIES_PATH,
  SUPPORTING_DOCUMENTS_REVIEW_PATH,
  SUPPORTING_DOCUMENTS_TASK
} from '../pages/lcml.supporting.documents.page.js'

const CONSIDERATION =
  'We have considered this policy in full; the attached report sets out the survey results behind it.'
const DOCUMENTS = [
  'test/resources/test.pdf',
  'test/resources/replacement-drawing.pdf'
]
const FIRST_TYPE = 'Ecological Assessment'
const CHANGED_TYPE = 'Fisheries Assessment'
const LOCATION = 'Section 4.2'
const CHANGED_LOCATION = 'Appendix B'
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

const pathOf = (page) => new URL(page.url()).pathname

async function uploadAndLink(documents, file, code) {
  const taskOpened = await documents.openUploadTask()
  await documents.uploadAndWaitForDocumentType(file)
  await documents.selectDocumentType(FIRST_TYPE)
  await documents.continue()
  await documents.policyCheckbox(code).check()
  await (await documents.locationFor(code)).fill(LOCATION)
  await documents.continue('Save and continue')
  const review = {
    path: pathOf(documents.page),
    cards: await documents.reviewCards()
  }
  await documents.continueFromReview()
  return { taskOpened, review, afterContinue: pathOf(documents.page) }
}

async function changeFirstDocument(documents, [first, second]) {
  const taskOpened = await documents.openSupportingDocumentsTask()
  const cardsWhenReopened = await documents.reviewCards()

  await documents.changeOnReview(1, 'Type')
  const type = {
    selected: await documents.selectedDocumentType(),
    cancelLinks: await documents.cancelLinkCount()
  }
  await documents.selectDocumentType(CHANGED_TYPE)
  await documents.continue('Save and continue')
  type.returnedTo = pathOf(documents.page)

  await documents.changeOnReview(1, 'Policies')
  const policies = {
    ticked: [
      await documents.policyCheckbox(first).isChecked(),
      await documents.policyCheckbox(second).isChecked()
    ],
    location: await (await documents.locationFor(first)).inputValue(),
    cancelLinks: await documents.cancelLinkCount()
  }
  await documents.policyCheckbox(second).check()
  await (await documents.locationFor(second)).fill(CHANGED_LOCATION)
  await documents.continue('Save and continue')
  policies.returnedTo = pathOf(documents.page)

  return {
    taskOpened,
    cardsWhenReopened,
    type,
    policies,
    cardsAfterChange: await documents.reviewCards()
  }
}

When(
  "the user completes every policy consideration, {int} of which refer to a document, uploads a supporting document for each of those policies, then changes the first document's type and policies",
  { timeout: 400_000 },
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

    const uploads = []
    for (const [index, code] of referring.entries()) {
      await documents.openPolicyList()
      uploads.push(
        await uploadAndLink(
          documents,
          DOCUMENTS[index % DOCUMENTS.length],
          code
        )
      )
      states.push(await policyListState(documents))
    }

    const changes = await changeFirstDocument(documents, referring)

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
      uploads,
      changes,
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

function expectCard(card, { file, type, links }) {
  expect(card.title).toBe(file)
  expect(card.type).toBe(type)
  expect(card.policies).toHaveLength(links.length)
  for (const [index, [code, location]] of links.entries()) {
    expect(card.policies[index]).toMatch(
      new RegExp(`\\(${code}\\) - ${location}$`)
    )
  }
}

const fileName = (index) => DOCUMENTS[index].split('/').pop()

Then(
  'the {string} section appears once a policy consideration refers to a document, with the {string} task {string} for that policy, and stays {string} for both policies once every policy consideration is completed',
  function (section, task, status, allCompletedStatus) {
    const { listStates, referring } = this.data.supportingDocuments
    expect(section).toBe(SECTION)
    expect(task).toBe(SUPPORTING_DOCUMENTS_TASK)
    expect(listStates.beforeAny.sectionShown).toBe(false)
    expect(listStates.firstReferring).toEqual({
      sectionShown: true,
      task: { status, hint: stillNeededFor([referring[0]]) }
    })
    expect(listStates.allCompleted.task).toEqual({
      status: allCompletedStatus,
      hint: stillNeededFor(referring)
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
  'after the first document is linked, the {string} page shows it with its type and policy, Continue returns to the policy list, and the task is {string} for the second policy',
  function (heading, status) {
    const { uploads, listStates, referring } = this.data.supportingDocuments
    const [first] = uploads
    expect(heading).toBe(SECTION)
    expect(first.review.path).toBe(SUPPORTING_DOCUMENTS_REVIEW_PATH)
    expect(first.review.cards).toHaveLength(1)
    expectCard(first.review.cards[0], {
      file: fileName(0),
      type: FIRST_TYPE,
      links: [[referring[0], LOCATION]]
    })
    expect(first.afterContinue).toBe(MARINE_PLAN_POLICIES_PATH)
    expect(listStates.firstUploaded.task).toEqual({
      status,
      hint: stillNeededFor([referring[1]])
    })
  }
)

Then(
  'after the second document is linked, selecting the task again shows the {string} page with both documents, and the task is {string}',
  function (heading, status) {
    const { uploads, changes, listStates, referring } =
      this.data.supportingDocuments
    expect(heading).toBe(SECTION)
    expect(uploads[1].taskOpened).toBe(SUPPORTING_DOCUMENTS_REVIEW_PATH)
    expect(changes.taskOpened).toBe(SUPPORTING_DOCUMENTS_REVIEW_PATH)
    expect(changes.cardsWhenReopened).toHaveLength(2)
    for (const [index, code] of referring.entries()) {
      expectCard(changes.cardsWhenReopened[index], {
        file: fileName(index),
        type: FIRST_TYPE,
        links: [[code, LOCATION]]
      })
    }
    expect(listStates.secondUploaded.task).toEqual({ status, hint: '' })
  }
)

Then(
  "changing the first document's type and policies from the {string} page shows the saved answers, has no Cancel link, and returns to the page with the new answers",
  function (heading) {
    const { changes, referring } = this.data.supportingDocuments
    const [first, second] = referring
    expect(heading).toBe(SECTION)
    expect(changes.type).toEqual({
      selected: [FIRST_TYPE],
      cancelLinks: 0,
      returnedTo: SUPPORTING_DOCUMENTS_REVIEW_PATH
    })
    expect(changes.policies).toEqual({
      ticked: [true, false],
      location: LOCATION,
      cancelLinks: 0,
      returnedTo: SUPPORTING_DOCUMENTS_REVIEW_PATH
    })
    const links = [
      [first, LOCATION],
      [second, CHANGED_LOCATION]
    ].sort(([a], [b]) => a.localeCompare(b))
    expectCard(changes.cardsAfterChange[0], {
      file: fileName(0),
      type: CHANGED_TYPE,
      links
    })
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
