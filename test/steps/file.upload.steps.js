import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteSiteDetails,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import {
  EnsureErrorDisplayed,
  EnsureThatFileTypeSelected
} from '~/test-infrastructure/screenplay/interactions'
import { WhichTypeOfFileDoYouWantToUploadPageInteractions } from '~/test-infrastructure/screenplay/page-interactions'

Given(
  'the user wants to apply for an exemption using a Shapefile',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withShapefileUpload())
  }
)

Given('the user wants to apply for an exemption using a KML file', function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withKMLUpload())
})

Given(
  'the Which type of file do you want to upload? page is displayed',
  async function () {
    if (!this.actor) {
      this.actor = new Actor('Alice')
      this.actor.can(BrowseTheWeb.using(browser))
      this.actor.intendsTo(ApplyForExemption.withFileUpload())
    }

    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
  }
)

When('selecting Shapefile as the file type', async function () {
  const browseTheWeb = this.actor.ability
  await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
    browseTheWeb,
    'Shapefile'
  )
})

When('selecting KML as the file type', async function () {
  const browseTheWeb = this.actor.ability
  await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
    browseTheWeb,
    'KML'
  )
})

When(
  'the Continue button is clicked without selecting a file type',
  async function () {
    const browseTheWeb = this.actor.ability
    await WhichTypeOfFileDoYouWantToUploadPageInteractions.clickContinue(
      browseTheWeb
    )
  }
)

Then('the Shapefile option is selected', async function () {
  await this.actor.attemptsTo(EnsureThatFileTypeSelected.is('Shapefile'))
})

Then('the KML option is selected', async function () {
  await this.actor.attemptsTo(EnsureThatFileTypeSelected.is('KML'))
})

Then(
  'the file type error {string} is displayed',
  async function (expectedErrorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is('#fileUploadType-error', expectedErrorMessage)
    )
  }
)
