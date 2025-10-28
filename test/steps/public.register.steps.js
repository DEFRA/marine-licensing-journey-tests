import { Given, Then, When } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import { browser } from '@wdio/globals'

import { PublicRegisterPage } from '~/test-infrastructure/pages'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickButton,
  ClickPublicRegisterLink,
  CompleteProjectName,
  CompletePublicRegisterTask,
  EnsureErrorDisplayed,
  EnsurePageHeading,
  EnsureProjectNameDisplayedAsCaption,
  EnsurePublicRegisterNewTab,
  EnsurePublicRegisterTask,
  EnsureReasonTextBox,
  Memory,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import { PublicRegisterModel } from '~/test-infrastructure/screenplay/models'

Given('the Public register page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(
    SelectTheTask.withName('Sharing your project information publicly')
  )
  await this.actor.attemptsTo(
    EnsurePageHeading.is('Sharing your project information publicly')
  )
})

Given(
  'the Public register task has been completed with consent',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    this.actor.intendsTo(ApplyForExemption.withConsentToPublicRegister())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(
      SelectTheTask.withName('Sharing your project information publicly')
    )
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

Given(
  'the Public register task has been completed to withhold information',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    this.actor.intendsTo(ApplyForExemption.withWithholdFromPublicRegister())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(
      SelectTheTask.withName('Sharing your project information publicly')
    )
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When(
  'choosing not to withhold information from the public register',
  async function () {
    this.actor.updates(Memory.ofPublicRegisterWithConsent(true))
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When(
  'choosing to withhold information from the public register',
  async function () {
    this.actor.updates(
      Memory.ofPublicRegisterWithConsentAndReason(
        false,
        'Sensitive information'
      )
    )
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When(
  'the Save and continue button is selected after choosing No without providing a reason',
  async function () {
    this.actor.updates(Memory.ofPublicRegisterWithConsent(false))
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When('the reason text provided is too long', async function () {
  this.actor.updates(
    Memory.ofPublicRegisterWithConsentAndReason(
      false,
      PublicRegisterModel.generateReasonExceedingMaxLength()
    )
  )
  await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
})

When(
  'choosing to allow information to be added to the public register',
  async function () {
    this.actor.updates(Memory.ofPublicRegisterWithConsent(true))
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When(
  'the Save and continue button is clicked without choosing a radio option',
  async function () {
    await this.actor.attemptsTo(ClickButton.withText('Save and continue'))
  }
)

When('changing the public register information to withhold', async function () {
  await this.actor.attemptsTo(
    SelectTheTask.withName('Sharing your project information publicly')
  )
  this.actor.updates(
    Memory.ofPublicRegisterWithConsentAndReason(false, faker.lorem.words(5))
  )
  await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
})

When('changing the public register information to consent', async function () {
  await this.actor.attemptsTo(
    SelectTheTask.withName('Sharing your project information publicly')
  )
  this.actor.updates(Memory.ofPublicRegisterWithConsent(true))
  await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
})

Then('the public register information is saved', async function () {
  await this.actor.attemptsTo(
    SelectTheTask.withName('Sharing your project information publicly')
  )
  await this.actor.attemptsTo(
    EnsurePublicRegisterTask.hasBeenCompletedWith(
      this.actor.recalls('exemption').publicRegister.consent,
      this.actor.recalls('exemption').publicRegister.reason || ''
    )
  )
})

Then(
  'the project name is displayed on the Public register page',
  async function () {
    await this.actor.attemptsTo(
      EnsureProjectNameDisplayedAsCaption.is(
        this.actor.recalls('exemption').projectName
      )
    )
  }
)

Then('no information is pre-populated', async function () {
  await this.actor.attemptsTo(
    EnsurePublicRegisterTask.hasNoInformationCompleted()
  )
})

Then(
  'the page is pre-populated with the previously entered information',
  async function () {
    await this.actor.attemptsTo(
      EnsurePublicRegisterTask.hasBeenCompletedWith(
        this.actor.recalls('exemption').publicRegister.consent,
        this.actor.recalls('exemption').publicRegister.reason || ''
      )
    )
  }
)

Then(
  'the option to provide a reason for withholding information is not available',
  async function () {
    await this.actor.attemptsTo(EnsureReasonTextBox.isNotDisplayed())
  }
)

Then(
  'the consent error message {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(PublicRegisterPage.consentError, errorMessage)
    )
  }
)

Then(
  'the reason error message {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(PublicRegisterPage.reasonError, errorMessage)
    )
  }
)

When('the user clicks the Explore Marine Plans link', async function () {
  await this.actor.attemptsTo(ClickPublicRegisterLink.now())
})

Then(
  'the user is taken to the Explore Marine Plans page in a new tab',
  async function () {
    await this.actor.attemptsTo(EnsurePublicRegisterNewTab.isOpened())
  }
)
