import { Given, Then, When } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  Click,
  ClickButton,
  CompleteProjectName,
  CompleteSiteDetails,
  ContinueFromBeforeYouStartSiteDetailsPage,
  EnsureTaskStatus,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay/index.js'

import {
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions
} from '~/test-infrastructure/screenplay/page-interactions/index.js'

import { FileUploadPage } from '~/test-infrastructure/pages/index.js'

Given(
  'the user has explored file upload options during site details entry',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))

    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithWGS84Coordinates()
    )

    await this.actor.attemptsTo(Navigate.toProjectNamePage())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())

    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.actor.ability,
      'file-upload'
    )

    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.actor.ability,
      'KML'
    )

    await this.actor.attemptsTo(Click.on(FileUploadPage.cancelLink))
  }
)

When(
  'the user completes site details using manual coordinate entry instead',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
    await this.actor.attemptsTo(ClickButton.withText('Continue'))
  }
)

Then('the site details task should be marked as completed', async function () {
  await this.actor.attemptsTo(EnsureTaskStatus.is('Site details', 'Completed'))
})
