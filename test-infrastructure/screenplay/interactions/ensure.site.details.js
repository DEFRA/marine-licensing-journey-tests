import Task from '../base/task.js'
import ReviewSiteDetailsPage from '~/test-infrastructure/pages/review.site.details.page'

export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.waitForElement(ReviewSiteDetailsPage.summaryList)
    // <dl class="govuk-summary-list">
    //   <div class="govuk-summary-list__row">
    //     <dt class="govuk-summary-list__key">
    //       Method of providing site location
    //     </dt>
    //     <dd class="govuk-summary-list__value">
    //       Manually enter one set of coordinates and a width to create a circular site
    //     </dd>
    //   </div>
    //   <div class="govuk-summary-list__row">
    //     <dt class="govuk-summary-list__key">
    //       Coordinate system
    //     </dt>
    //     <dd class="govuk-summary-list__value">
    //       WGS84 (World Geodetic System 1984)<br>Latitude and longitude
    //     </dd>
    //   </div>
    //   <div class="govuk-summary-list__row">
    //     <dt class="govuk-summary-list__key">
    //       Coordinates at centre of site
    //     </dt>
    //     <dd class="govuk-summary-list__value">
    //       55.019889, -1.399500
    //     </dd>
    //   </div>
    //   <div class="govuk-summary-list__row">
    //     <dt class="govuk-summary-list__key">
    //       Width of circular site
    //     </dt>
    //     <dd class="govuk-summary-list__value">
    //       20 metres
    //     </dd>
    //   </div>
    // </dl>
  }
}
