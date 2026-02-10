import { expect } from 'chai'
import { format } from 'date-fns'
import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureDashboardTableContent extends Task {
  #expectedDetails

  constructor(expectedDetails) {
    super()
    this.#expectedDetails = expectedDetails
  }

  static withExpectedDetails(expectedDetails) {
    return new EnsureDashboardTableContent(expectedDetails)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const rowCount = await browseTheWeb.countElements(
      DashboardPage.locators.tableRows
    )

    expect(rowCount).to.be.greaterThan(0, 'No rows found in dashboard table')

    const completedExemptions = actor.recalls('completedExemptions') || []
    expect(completedExemptions.length).to.be.greaterThan(
      0,
      'No completed exemptions in actor memory'
    )

    const latestExemption = completedExemptions[completedExemptions.length - 1]

    for (let i = 0; i < rowCount; i++) {
      const rowNumber = i + 1
      const name = await browseTheWeb.getText(
        `tbody tr:nth-child(${rowNumber}) td:nth-child(1)`
      )

      if (name.trim() === latestExemption.projectName) {
        const [type, reference, status, submittedOn, owner, actions] =
          await Promise.all([
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(2)`
            ),
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(3)`
            ),
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(4)`
            ),
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(5)`
            ),
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(6)`
            ),
            browseTheWeb.getText(
              `tbody tr:nth-child(${rowNumber}) td:nth-child(7)`
            )
          ])

        // Project name
        expect(name.trim()).to.equal(latestExemption.projectName)

        // Type
        expect(type.trim()).to.equal(this.#expectedDetails['Type'])

        // Reference
        expect(reference.trim()).to.equal(latestExemption.applicationReference)

        // Status
        expect(status.trim()).to.equal(this.#expectedDetails['Status'])

        // Submitted on
        const today = format(new Date(), 'd MMM yyyy')
        expect(submittedOn.trim()).to.equal(today)

        // Owner
        expect(owner.trim()).to.equal(this.#expectedDetails['Owner'])

        // Actions
        const expectedActions = this.#expectedDetails['Actions']
          .split(',')
          .map((a) => a.trim())
        for (const action of expectedActions) {
          expect(actions).to.include(action)
        }

        // Verify Owner column header is present
        await browseTheWeb.expectElementToBePresent(
          DashboardPage.locators.ownerColumnHeader
        )

        return
      }
    }

    expect.fail(
      `Could not find submitted notification for project "${latestExemption.projectName}" in dashboard table`
    )
  }
}
