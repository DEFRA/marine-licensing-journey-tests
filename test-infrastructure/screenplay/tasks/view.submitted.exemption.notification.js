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

  async retryWithPageRefresh(
    browseD365,
    action,
    maxRetries = 5,
    retryDelay = 10000
  ) {
    let lastError
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await action()
        return
      } catch (error) {
        lastError = error
        console.log(`Attempt ${attempt} failed: ${error.message}`)

        if (attempt < maxRetries) {
          console.log(
            `Waiting ${retryDelay}ms before reloading and retrying...`
          )
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          await browseD365.reload()
          console.log(`Page reloaded, attempting again...`)
        }
      }
    }

    throw new Error(
      `Failed after ${maxRetries} attempts. Last error: ${lastError.message}`
    )
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

    await this.retryWithPageRefresh(browseD365, async () => {
      await browseD365.clickElement(referenceSelector, { timeout: 5000 })
    })
  }
}
