import D365Page from '../../pages/d365.page.js'
import Task from '../base/task.js'

export default class ViewSubmittedExemptionNotification extends Task {
  static forReference(applicationReference) {
    return new ViewSubmittedExemptionNotification(applicationReference)
  }

  constructor(applicationReference) {
    super()
    this.applicationReference = applicationReference
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    if (!browseD365) {
      throw new Error(
        'Actor must have BrowseD365 ability to view D365 notifications'
      )
    }
    const referenceSelector = D365Page.getCaseRecordLink(
      this.applicationReference
    )
    await browseD365.takeScreenshot('D365 Before Clicking Case Record')
    await browseD365.clickElement(referenceSelector)
  }
}
