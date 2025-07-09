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

import {
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions
} from '~/test-infrastructure/screenplay/page-interactions/index.js'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteSiteDetails,
  Navigate
} from '~/test-infrastructure/screenplay/index.js'

import { FileUploadPage } from '~/test-infrastructure/pages/index.js'

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
    EnsureProjectNameDisplayedAsCaption.fromMemory()
  )
})

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

Given('an exemption notification with a valid Shapefile', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withShapefileUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When('completing the site details task', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

When('uploading a valid KML file', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

When(
  'navigating to the file upload page and continuing without selecting a file',
  async function () {
    // Navigate to "How do you want to provide the coordinates?" page and select file upload
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.actor.ability,
      'file-upload'
    )

    // Navigate to "Which type of file do you want to upload?" page and select Shapefile
    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.actor.ability,
      'Shapefile'
    )

    // Click continue without selecting a file to trigger validation
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

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

Then(
  'the {string} file upload type error {string} is displayed',
  async function (fileUploadType, expectedErrorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is('#fileUploadType-error', expectedErrorMessage)
    )
  }
)

Then('the Upload a Shapefile file page is displayed', async function () {
  await this.actor.attemptsTo(
    EnsurePageHeading.is('Upload a Shapefile'),
    EnsureProjectNameDisplayedAsCaption.fromMemory()
  )
})

Then('the file is successfully processed', async function () {
  await this.actor.attemptsTo(EnsureNoErrorsDisplayed.onPage())
})

Given('an exemption notification with a file with a virus', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withVirusUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given('an exemption notification for file upload', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withFileUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Then(
  'the file upload error {string} is displayed',
  async function (expectedErrorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        FileUploadPage.fileUploadError,
        expectedErrorMessage
      )
    )
  }
)

Then('the spinner page displays during upload process', async function () {
  // Check that spinner/loading page is displayed during upload
  await this.actor.ability.isDisplayed(FileUploadPage.spinner)
})
