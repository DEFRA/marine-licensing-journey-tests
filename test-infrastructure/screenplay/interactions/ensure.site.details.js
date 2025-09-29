import Task from '../base/task.js'
import EnsureActivityDetailsCard from './ensure.activity.details.card.js'
import EnsureCoreSiteDetails from './ensure.core.site.details.js'
import EnsureIndividualSiteDetailsCards from './ensure.individual.site.details.cards.js'
import EnsureIndividualSiteActivityDetails from './ensure.individual.site.activity.details.js'
import EnsureProvidingSiteLocationCard from './ensure.providing.site.location.card.js'

export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    // Validate each card/section type using focused validation classes
    await actor.attemptsTo(EnsureProvidingSiteLocationCard.isCorrect())
    await actor.attemptsTo(EnsureIndividualSiteDetailsCards.areCorrect())
    await actor.attemptsTo(EnsureIndividualSiteActivityDetails.areCorrect())
    await actor.attemptsTo(EnsureActivityDetailsCard.isCorrect())
    await actor.attemptsTo(EnsureCoreSiteDetails.areCorrect())
  }
}
