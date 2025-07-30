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

When('completing the site details task', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

When('uploading a valid KML file', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
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
  await this.actor.ability.isDisplayed(FileUploadPage.spinner)
})
