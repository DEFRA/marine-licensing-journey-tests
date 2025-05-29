import Task from '../base/task.js'

import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page'

export default class EnsureThatSiteTypeSelected extends Task {
  static is(expectedSiteType) {
    return new EnsureThatSiteTypeSelected(expectedSiteType)
  }

  constructor(expectedSiteType) {
    super()
    this.expectedSiteType = expectedSiteType
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isSelected(
      HowDoYouWantToEnterTheCoordinatesPage.getSiteTypeSelector(
        this.expectedSiteType
      )
    )
  }
}
