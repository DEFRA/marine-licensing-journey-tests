import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickSaveAndContinue,
  CompleteProjectName,
  EnsureErrorDisplayed,
  EnsurePageHeading,
  EnsureThatCoordinateEntryMethodSelected,
  EnsureThatSiteTypeSelected,
  FillForm,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given('a user is providing site details', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'the "How do you want to provide the site location?" page has been reached',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('How do you want to provide the site location?')
    )
  }
)

Given(
  'the "How do you want to enter the coordinates?" page has been reached',
  async function () {
    await this.actor.attemptsTo(FillForm.chooseToEnterCoordinatesManually())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('How do you want to enter the coordinates?')
    )
  }
)

Given(
  'the "Which coordinate system do you want to use?" page has been reached',
  async function () {
    await this.actor.attemptsTo(FillForm.chooseToEnterCoordinatesManually())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
    await this.actor.attemptsTo(FillForm.provideASinglePointForACircularSite())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Which coordinate system do you want to use?')
    )
  }
)

Given('the WGS84 coordinate system has been selected', async function () {
  await this.actor.attemptsTo(FillForm.selectWGS84CoordinateSystem())
})

When(
  'the Continue button is clicked without selecting a site location option',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Continue button is clicked without selecting a coordinate entry method',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Continue button is clicked without selecting a coordinate system',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then(
  'the coordinates type error: {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        HowDoYouWantToProvideCoordinatesPage.coordinatesTypeError,
        errorMessage
      )
    )
  }
)

Then(
  'the coordinates entry method error: {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        HowDoYouWantToEnterTheCoordinatesPage.coordinatesEntryError,
        errorMessage
      )
    )
  }
)

Then(
  'the coordinates system error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        WhatCoordinateSystemPage.coordinatesSystemError,
        errorMessage
      )
    )
  }
)

Then('the manual coordinate entry method is selected', async function () {
  await this.actor.attemptsTo(
    EnsureThatCoordinateEntryMethodSelected.is('enter-manually')
  )
})

Then('the circular site option is selected', async function () {
  await this.actor.attemptsTo(EnsureThatSiteTypeSelected.is('circle'))
})
