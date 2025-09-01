import { expect } from 'chai'
import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import Task from '../base/task.js'

export default class EnsureProjectSummaryCard extends Task {
  static isDisplayedWithIatInformation() {
    return new EnsureProjectSummaryCard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemptionData = actor.recalls('exemption')

    await browseTheWeb.isDisplayed(
      CheckYourAnswersPage.locators.projectSummary.heading
    )

    await this._validateProjectName(browseTheWeb, exemptionData)
    await this._validateActivityType(browseTheWeb, exemptionData)
    await this._validateExemptionReason(browseTheWeb, exemptionData)
    await this._validatePdfDownload(browseTheWeb, exemptionData)
  }

  async _validateProjectName(browseTheWeb, exemptionData) {
    await browseTheWeb.expectElementToHaveExactText(
      CheckYourAnswersPage.locators.projectSummary.projectNameValue,
      exemptionData.projectName
    )
  }

  async _validateActivityType(browseTheWeb, exemptionData) {
    const expectedActivityType = exemptionData.iatContext?.activityType?.display
    if (expectedActivityType) {
      await browseTheWeb.expectElementToHaveExactText(
        CheckYourAnswersPage.locators.projectSummary.activityTypeValue,
        expectedActivityType
      )
    }
  }

  async _validateExemptionReason(browseTheWeb, exemptionData) {
    const expectedArticleCode = exemptionData.iatContext?.articleCode?.code
    if (expectedArticleCode) {
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.projectSummary.exemptionReasonValue,
        `Article ${expectedArticleCode} of the Marine Licensing (Exempted Activities) Order 2011`
      )
    }

    const expectedLink = exemptionData.iatContext?.articleCode?.link
    if (expectedLink) {
      const element = await browseTheWeb.getElement(
        CheckYourAnswersPage.locators.projectSummary.exemptionReasonLink
      )
      const actualHref = await element.getAttribute('href')
      expect(actualHref).to.equal(expectedLink)
    }
  }

  async _validatePdfDownload(browseTheWeb, exemptionData) {
    const expectedPdfUrl = exemptionData.iatContext?.pdfUrl
    if (expectedPdfUrl) {
      await browseTheWeb.isDisplayed(
        CheckYourAnswersPage.locators.projectSummary.pdfDownloadLink
      )

      const element = await browseTheWeb.getElement(
        CheckYourAnswersPage.locators.projectSummary.pdfDownloadLink
      )
      const actualHref = await element.getAttribute('href')
      expect(actualHref).to.equal(expectedPdfUrl)
    }
  }
}
