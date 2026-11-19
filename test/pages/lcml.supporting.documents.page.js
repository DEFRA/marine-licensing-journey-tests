import path from 'path'

export const MARINE_PLAN_POLICIES_PATH = '/marine-licence/marine-plan-policies'
export const SUPPORTING_DOCUMENTS_TASK = 'Upload supporting documents'
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

  async openUploadTask() {
    await this.page
      .getByRole('link', { name: SUPPORTING_DOCUMENTS_TASK })
      .click()
    await this.page.waitForLoadState('load')
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
