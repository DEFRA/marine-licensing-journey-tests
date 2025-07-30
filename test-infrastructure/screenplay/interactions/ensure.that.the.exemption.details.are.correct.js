import { expect } from 'chai'
import D365Page from '../../pages/d365.page.js'
import Task from '../base/task.js'

export default class EnsureThatTheExemptionDetailsAreCorrect extends Task {
  static forExemption(exemption) {
    return new EnsureThatTheExemptionDetailsAreCorrect(exemption)
  }

  constructor(exemption) {
    super()
    this.exemption = exemption
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')

    if (!browseD365) {
      throw new Error(
        'Actor must have BrowseD365 ability to verify exemption details'
      )
    }

    if (!this.exemption) {
      expect.fail('Exemption data is required to verify details')
    }

    await this.verifyExemptionDetails(browseD365)
  }

  async verifyExemptionDetails(browseD365) {
    await browseD365.takeScreenshot('D365 Before Verifying Exemption Details')
    const referenceValue = await browseD365.getInputValue(
      D365Page.exemptionReferenceField
    )
    expect(referenceValue).to.equal(
      this.exemption.applicationReference,
      `Expected reference to be '${this.exemption.applicationReference}' but found '${referenceValue}'`
    )

    const projectNameValue = await browseD365.getInputValue(
      D365Page.projectNameField
    )
    expect(projectNameValue).to.equal(
      this.exemption.projectName,
      `Expected project name to be '${this.exemption.projectName}' but found '${projectNameValue}'`
    )

    const typeValue = await browseD365.getInputValue(D365Page.typeField)
    expect(typeValue).to.equal(
      'Exempt activity',
      `Expected type to be 'Exempt activity' but found '${typeValue}'`
    )

    const today = new Date().toLocaleDateString('en-GB')
    const submittedDateValue = await browseD365.getInputValue(
      D365Page.submittedDateField
    )
    expect(submittedDateValue).to.equal(
      today,
      `Expected submitted date to be '${today}' but found '${submittedDateValue}'`
    )
    await browseD365.takeScreenshot('D365 After Verifying Exemption Details')
  }
}
