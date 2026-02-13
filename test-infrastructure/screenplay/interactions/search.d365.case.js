import Task from '../base/task.js'
import D365CasesPage from '../../pages/d365.cases.page.js'

export default class SearchD365Case extends Task {
  #reference

  constructor(reference) {
    super()
    this.#reference = reference
  }

  static withReference(reference) {
    return new SearchD365Case(reference)
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    const page = browseD365.page

    const searchInput = page.locator(D365CasesPage.locators.searchInput)
    await searchInput.waitFor({ state: 'visible', timeout: 30000 })
    await searchInput.fill(this.#reference)
    await searchInput.press('Enter')

    // Wait for grid to update with results
    await page
      .locator(D365CasesPage.locators.casesGrid)
      .waitFor({ state: 'visible', timeout: 30000 })

    await browseD365.takeScreenshot(
      `D365 search results for ${this.#reference}`
    )
  }
}
