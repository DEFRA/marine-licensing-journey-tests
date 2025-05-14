import { Given, Then, When } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import { browser } from '@wdio/globals'

import {
  ProjectNamePage,
  PublicRegisterPage
} from '~/test-infrastructure/pages'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompletePublicRegisterTask,
  EnsureErrorDisplayed,
  EnsurePublicRegisterTask,
  EnsureReasonTextBox,
  EnsureThatPageHeading,
  SelectTheTask,
  ClickBack,
  ClickSaveAndContinue,
  ClickCancel,
  EnsureProjectNameDisplayedAsCaption
} from '~/test-infrastructure/screenplay'

Given('the Public register page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
  this.actor.remembers('projectName', faker.lorem.words(5))
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  await this.actor.attemptsTo(EnsureThatPageHeading.is('Public register'))
})

Given(
  'the Public register task has been completed with consent',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
    this.actor.remembers('projectName', faker.lorem.words(5))
    await this.actor.attemptsTo(
      CompleteProjectName.with(this.actor.recalls('projectName'))
    )
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
  }
)

Given(
  'the Public register task has been completed to withhold information',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
    this.actor.remembers('projectName', faker.lorem.words(5))
    await this.actor.attemptsTo(
      CompleteProjectName.with(this.actor.recalls('projectName'))
    )
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.withhold)
    this.actor.remembers('publicRegisterWithholdReason', faker.lorem.words(5))
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice'),
        this.actor.recalls('publicRegisterWithholdReason')
      )
    )
  }
)

When(
  'choosing not to withhold information from the public register',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
  }
)

When(
  'choosing to withhold information from the public register',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.withhold)
    this.actor.remembers(
      'publicRegisterWithholdReason',
      'Sensitive information'
    )
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice'),
        this.actor.recalls('publicRegisterWithholdReason')
      )
    )
  }
)

When(
  'the Save and continue button is selected after choosing Yes without providing a reason',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.withhold)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Save and continue button is selected with a reason exceeding {int} characters',
  async function (numberOfCharacters) {
    this.actor.remembers(
      'publicRegisterWithholdReason',
      faker.lorem.words(500).slice(0, numberOfCharacters + 1)
    )

    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        PublicRegisterPage.withhold,
        this.actor.recalls('publicRegisterWithholdReason')
      )
    )
  }
)

When(
  'choosing to allow information to be added to the public register',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
  }
)

When(
  'the Save and continue button is clicked without choosing a radio option',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'completing the public register task but cancelling out',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andNotSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
    await this.actor.attemptsTo(ClickCancel.now())
  }
)

When(
  'completing the public register task but selecting to go back',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andNotSavingWith(
        this.actor.recalls('publicRegisterChoice')
      )
    )
    await this.actor.attemptsTo(ClickBack.now())
  }
)

When(
  'changing the public register information to withhold but cancelling out',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andNotSavingWith(
        PublicRegisterPage.withhold,
        faker.lorem.words(5)
      )
    )
    await this.actor.attemptsTo(ClickCancel.now())
  }
)

When(
  'changing the public register information to withhold but selecting to go back',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.andNotSavingWith(
        PublicRegisterPage.withhold,
        faker.lorem.words(5)
      )
    )
    await this.actor.attemptsTo(ClickBack.now())
  }
)

When('changing the public register information to withhold', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  this.actor.remembers('publicRegisterChoice', PublicRegisterPage.withhold)
  this.actor.remembers('publicRegisterWithholdReason', faker.lorem.words(5))
  await this.actor.attemptsTo(
    CompletePublicRegisterTask.andSavingWith(
      this.actor.recalls('publicRegisterChoice'),
      this.actor.recalls('publicRegisterWithholdReason')
    )
  )
})

When('changing the public register information to consent', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
  this.actor.forgets('publicRegisterWithholdReason', '')
  await this.actor.attemptsTo(
    CompletePublicRegisterTask.andSavingWith(
      this.actor.recalls('publicRegisterChoice'),
      this.actor.recalls('publicRegisterWithholdReason')
    )
  )
})

Then('the public register information is saved', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  await this.actor.attemptsTo(
    EnsurePublicRegisterTask.hasBeenCompletedWith(
      this.actor.recalls('publicRegisterChoice'),
      this.actor.recalls('publicRegisterWithholdReason')
    )
  )
})

Then(
  'the project name is displayed on the Public register page',
  async function () {
    await this.actor.attemptsTo(
      EnsureProjectNameDisplayedAsCaption.is(this.actor.recalls('projectName'))
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
        this.actor.recalls('publicRegisterChoice'),
        this.actor.recalls('publicRegisterWithholdReason')
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
  'any changes made on the public register page before going back are not saved',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    await this.actor.attemptsTo(
      EnsurePublicRegisterTask.hasNoInformationCompleted()
    )
  }
)

Then(
  'any changes made on the public register page before cancelling are not saved',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    await this.actor.attemptsTo(
      EnsurePublicRegisterTask.hasNoInformationCompleted()
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

Then('the previously saved changes are pre-populated', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  await this.actor.attemptsTo(
    EnsurePublicRegisterTask.hasBeenCompletedWith(
      this.actor.recalls('publicRegisterChoice'),
      this.actor.recalls('publicRegisterWithholdReason')
    )
  )
})
