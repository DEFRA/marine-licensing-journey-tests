import { expect } from 'chai'
import Task from '../base/task.js'
import D365CasesPage from '../../pages/d365.cases.page.js'

export default class EnsureD365CaseDetails extends Task {
  #expectedDetails

  constructor(expectedDetails) {
    super()
    this.#expectedDetails = expectedDetails
  }

  static match(expectedDetails) {
    return new EnsureD365CaseDetails(expectedDetails)
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    const page = browseD365.page

    const columnMap = {
      'Reference number': 'ticketnumber',
      'Project Name': 'title',
      'Applicant Organisation': 'mmo_applicantorganisationid',
      Applicant: 'customerid',
      'Application Status': 'statuscode',
      'Submitted Date': 'createdon'
    }

    const maxRetries = 8
    let lastError = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      // Dismiss any D365 modal dialog overlaying the page
      await page.evaluate(() => {
        const portal = document.getElementById('__fluentPortalMountNode')
        if (portal) portal.remove()
      })
      await page.waitForTimeout(1000)

      // Click Refresh to get latest data (force bypasses any remaining overlay)
      const refreshBtn = page
        .locator(D365CasesPage.locators.refreshButton)
        .first()
      await refreshBtn.waitFor({ state: 'visible', timeout: 15000 })
      await refreshBtn.click({ force: true })

      // Wait for grid to reload
      await page.waitForTimeout(5000)
      await page
        .locator('div[role="row"][row-index="0"]')
        .waitFor({ state: 'visible', timeout: 30000 })

      try {
        for (const [columnName, expectedValue] of Object.entries(
          this.#expectedDetails
        )) {
          const colId = columnMap[columnName]
          if (!colId) {
            throw new Error(`Unknown D365 column: ${columnName}`)
          }

          const usesLabel =
            colId === 'statuscode' ||
            colId === 'createdon' ||
            colId === 'ticketnumber'
          const selector = usesLabel
            ? D365CasesPage.gridCellLabel(colId)
            : D365CasesPage.gridCellLink(colId)

          const element = page.locator(selector).first()
          await element.waitFor({ state: 'visible', timeout: 15000 })
          const actualText = await element.innerText()

          expect(actualText.trim()).to.equal(
            expectedValue,
            `D365 column "${columnName}" expected "${expectedValue}" but got "${actualText.trim()}"`
          )
        }

        // All assertions passed
        await browseD365.takeScreenshot('D365 case details verified')
        return
      } catch (error) {
        lastError = error
        if (attempt < maxRetries) {
          await browseD365.takeScreenshot(
            `D365 retry ${attempt} - waiting for sync`
          )
          await page.waitForTimeout(15000)
        }
      }
    }

    // All retries exhausted
    throw lastError
  }
}
