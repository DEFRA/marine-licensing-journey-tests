import path from 'path'

export const MARINE_PLAN_POLICIES_PATH = '/marine-licence/marine-plan-policies'
export const SUPPORTING_DOCUMENTS_TASK = 'Upload supporting documents'
export const SUPPORTING_DOCUMENTS_REVIEW_PATH =
  '/marine-licence/marine-plan-policy/supporting-documents-review'
const LOCATION_LABEL = 'Where is the information in this document?'

export default class LcmlSupportingDocumentsPage {
  constructor(page) {
    this.page = page
    this.policyConsideration = page.locator('#policyConsideration')
    this.refersToDocument = page.locator('input[name="documentationCheck"]')
    this.fileInput = page.locator('input[type="file"]')
    this.heading = page.locator('main h1')
    this.errorList = page.locator('.govuk-error-summary__list li')
  }

  async openPolicyList() {
    await this.page.goto(
      new URL(MARINE_PLAN_POLICIES_PATH, this.page.url()).toString()
    )
    await this.page.waitForLoadState('load')
  }

  policyCodes() {
    return this.page
      .locator('main a[href^="/marine-licence/marine-plan-policy/"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute('href').split('/').pop())
          .filter((code) => !code.startsWith('supporting-document'))
      )
  }

  async openPolicy(code) {
    await this.page
      .locator(`main a[href="/marine-licence/marine-plan-policy/${code}"]`)
      .click()
    await this.page.waitForURL(new RegExp(`marine-plan-policy/${code}$`), {
      timeout: 30_000
    })
  }

  async saveConsideration(text, refersToDocument) {
    await this.policyConsideration.fill(text)
    await this.refersToDocument.setChecked(refersToDocument)
    await this.continue('Save and continue')
  }

  async continue(buttonText = 'Continue') {
    await this.page.locator(`main button:has-text("${buttonText}")`).click()
    await this.page.waitForLoadState('load')
  }

  async supportingDocumentsTask() {
    const item = this.page
      .locator('li.govuk-task-list__item', {
        hasText: SUPPORTING_DOCUMENTS_TASK
      })
      .first()
    return {
      hint: (await item.locator('.govuk-task-list__hint').innerText()).trim(),
      status: (
        await item.locator('.govuk-task-list__status').innerText()
      ).trim()
    }
  }

  async openSupportingDocumentsTask() {
    await this.page
      .getByRole('link', { name: SUPPORTING_DOCUMENTS_TASK })
      .click()
    await this.page.waitForLoadState('load')
    return new URL(this.page.url()).pathname
  }

  async openUploadTask() {
    const landedOn = await this.openSupportingDocumentsTask()
    if (landedOn === SUPPORTING_DOCUMENTS_REVIEW_PATH) {
      await this.page
        .getByRole('button', { name: 'Add another document' })
        .click()
      await this.page.waitForLoadState('load')
    }
    return landedOn
  }

  reviewCards() {
    return this.page.locator('main .govuk-summary-card').evaluateAll((cards) =>
      cards.map((card) => {
        const row = (key) =>
          [...card.querySelectorAll('.govuk-summary-list__row')].find(
            (r) => r.querySelector('dt').innerText.trim() === key
          )
        return {
          title: card
            .querySelector('.govuk-summary-card__title')
            .innerText.trim(),
          type: row('Type')
            .querySelector('.govuk-summary-list__value')
            .innerText.trim(),
          policies: [
            ...row('Policies').querySelectorAll('.govuk-summary-list__value li')
          ].map((li) => li.innerText.trim())
        }
      })
    )
  }

  async insetText(hasText) {
    const inset = this.page.locator('main .govuk-inset-text', { hasText })
    return (await inset.count()) ? inset : null
  }

  async outstandingPoliciesInset() {
    const inset = await this.insetText('You still need to add a document for')
    return inset ? (await inset.innerText()).trim() : null
  }

  async documentsLinkedToPolicy() {
    const inset = await this.insetText('Documents linked to this policy')
    return inset
      ? (await inset.locator('li').allInnerTexts()).map((text) => text.trim())
      : null
  }

  async changeOnReview(cardNumber, rowKey) {
    await this.page
      .locator(`#document-card-${cardNumber} .govuk-summary-list__row`, {
        has: this.page.locator('dt', { hasText: rowKey })
      })
      .getByRole('link', { name: /Change/ })
      .click()
    await this.page.waitForLoadState('load')
  }

  async deleteOnReview(cardNumber) {
    await this.page
      .locator(`#document-card-${cardNumber} .govuk-summary-card__actions`)
      .getByRole('link', { name: /Delete/ })
      .click()
    await this.page.waitForLoadState('load')
  }

  async deletePage() {
    return {
      path: new URL(this.page.url()).pathname,
      heading: (await this.heading.innerText()).trim(),
      fileName: (
        await this.page.locator('main .govuk-inset-text').innerText()
      ).trim(),
      supports: (
        await this.page.locator('main p.govuk-body').allInnerTexts()
      ).map((text) => text.trim())
    }
  }

  async confirmDelete() {
    await this.page
      .getByRole('button', { name: 'Yes, delete document' })
      .click()
    await this.page.waitForLoadState('load')
  }

  async cancel() {
    await this.page.getByRole('link', { name: 'Cancel', exact: true }).click()
    await this.page.waitForLoadState('load')
  }

  async continueFromReview() {
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await this.page.waitForLoadState('load')
  }

  selectedDocumentType() {
    return this.page
      .locator('input[name="documentType"]:checked')
      .evaluateAll((inputs) =>
        inputs.map((input) =>
          document.querySelector(`label[for="${input.id}"]`).innerText.trim()
        )
      )
  }

  async selectDocumentType(name) {
    await this.page.getByRole('radio', { name, exact: true }).check()
  }

  cancelLinkCount() {
    return this.page.getByRole('link', { name: 'Cancel', exact: true }).count()
  }

  async errors() {
    return (await this.errorList.allInnerTexts()).map((text) => text.trim())
  }

  async uploadExpectingRejection(filePath) {
    if (filePath) {
      await this.chooseFile(filePath)
    }
    await this.continue()
    await this.page.waitForURL((url) => !/upload-and-wait/.test(url), {
      timeout: 60_000
    })
    await this.page.waitForLoadState('load')
  }

  async chooseFile(relativePath) {
    await this.fileInput.setInputFiles(
      path.resolve(process.cwd(), relativePath)
    )
  }

  async uploadAndWaitForDocumentType(relativePath) {
    await this.chooseFile(relativePath)
    await this.continue()
    await this.page.waitForURL(/supporting-document-type\//, {
      timeout: 60_000
    })
    await this.page.waitForLoadState('load')
  }

  policyCheckbox(code) {
    return this.page.getByRole('checkbox', {
      name: new RegExp(`\\(${code}\\)$`)
    })
  }

  async locationFor(code) {
    const controls =
      await this.policyCheckbox(code).getAttribute('aria-controls')
    return this.page.locator(`#${controls}`).getByLabel(LOCATION_LABEL)
  }
}
