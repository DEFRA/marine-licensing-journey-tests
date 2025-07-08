import { Given, Then, When } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'

import {
  ClickSaveAndContinue,
  EnsureErrorDisplayed,
  EnsureNoErrorsDisplayed,
  EnsurePageHeading,
  EnsureProjectNameDisplayedAsCaption,
  SelectTheTask
} from '~/test-infrastructure/screenplay/interactions/index.js'

import { WhichTypeOfFileDoYouWantToUploadPageInteractions } from '~/test-infrastructure/screenplay/page-interactions/index.js'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteSiteDetails,
  Navigate
} from '~/test-infrastructure/screenplay/index.js'

Given('an exemption notification with a valid KML file', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withKMLUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given('the Upload a KML file page is displayed', async function () {
  await this.actor.attemptsTo(
    EnsurePageHeading.is('Upload a KML file'),
    EnsureProjectNameDisplayedAsCaption.is(this.actor.remember.projectName)
  )
})

When('completing the site details task', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

When('uploading a valid KML file', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

Then('the file is successfully processed', async function () {
  await this.actor.attemptsTo(EnsureNoErrorsDisplayed.onPage())
})

When(
  'an invalid file type {string} is selected for upload',
  async function (fileUploadType) {
    await this.actor.attemptsTo(
      WhichTypeOfFileDoYouWantToUploadPageInteractions.selectOption(
        fileUploadType
      ),
      ClickSaveAndContinue.now()
    )
  }
)

Given(
  'the {string} file type has been selected',
  async function (fileUploadType) {
    await this.actor.attemptsTo(
      WhichTypeOfFileDoYouWantToUploadPageInteractions.selectOption(
        fileUploadType
      ),
      ClickSaveAndContinue.now()
    )
  }
)

Then(
  'the {string} file upload type error {string} is displayed',
  async function (fileUploadType, expectedErrorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is('#fileUploadType-error', expectedErrorMessage)
    )
  }
)
