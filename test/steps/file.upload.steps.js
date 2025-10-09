import { Given, Then, When } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'

import {
  ClickSaveAndContinue,
  ContinueFromBeforeYouStartSiteDetailsPage,
  EnsureError,
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

import CoordinateFiles from '~/test-infrastructure/helpers/coordinate-files.js'
import { FileUploadPage } from '~/test-infrastructure/pages/index.js'

// ========================================
// KML UPLOAD SCENARIOS (7 step definitions)
// ========================================

Given('an exemption notification with a valid KML file', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withKMLUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'an exemption notification with a KML file with a virus',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withKMLVirusUpload())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  }
)

Given('an exemption notification for KML file upload', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withKMLFileUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'an exemption notification with wrong file type for KML',
  async function () {
    this.actor = new Actor('Charlie')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withKMLWrongFileType())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  }
)

Given('an exemption notification with KML file too large', async function () {
  this.actor = new Actor('David')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withKMLLargeFile(CoordinateFiles.LARGE_KML)
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given('an exemption notification with empty KML file', async function () {
  this.actor = new Actor('Emily')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withKMLEmptyFile(CoordinateFiles.EMPTY_KML)
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When(
  'navigating to the KML upload page and continuing without selecting a file',
  async function () {
    await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.actor.ability,
      'file-upload'
    )

    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.actor.ability,
      'KML'
    )

    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

// ========================================
// SHAPEFILE UPLOAD SCENARIOS (7 step definitions)
// ========================================

Given('an exemption notification with a valid Shapefile', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withShapefileUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'an exemption notification with a Shapefile with a virus',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withShapefileVirusUpload())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  }
)

Given('an exemption notification for Shapefile upload', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withShapefileFileUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'an exemption notification with wrong file type for Shapefile',
  async function () {
    this.actor = new Actor('Charlie')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withShapefileWrongFileType())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  }
)

Given('an exemption notification with Shapefile too large', async function () {
  this.actor = new Actor('David')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withShapefileLargeFile(CoordinateFiles.LARGE_SHAPEFILE)
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given('an exemption notification with empty Shapefile', async function () {
  this.actor = new Actor('Emily')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withShapefileEmptyFile(CoordinateFiles.EMPTY_SHAPEFILE)
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When(
  'navigating to the Shapefile upload page and continuing without selecting a file',
  async function () {
    await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.actor.ability,
      'file-upload'
    )

    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.actor.ability,
      'Shapefile'
    )

    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

// ========================================
// SHARED STEP DEFINITIONS
// ========================================

When('completing the site details task', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

Then('the file is successfully processed', async function () {
  await this.actor.attemptsTo(EnsureError.noneOnPage())
})

Then(
  'the file upload error {string} is displayed',
  async function (expectedErrorMessage) {
    await this.actor.attemptsTo(
      EnsureError.is(FileUploadPage.fileUploadError, expectedErrorMessage)
    )
  }
)

Then('the spinner page displays during upload process', async function () {
  await this.actor.ability.isDisplayed(FileUploadPage.spinner)
})
