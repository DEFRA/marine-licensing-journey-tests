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
  CancelDeletionOfAllSiteDetails,
  DeleteAllSiteDetails,
  EnsurePageHeading,
  EnsureSiteDetails,
  EnsureTaskStatus
} from '~/test-infrastructure/screenplay/interactions'

Given('a user has reached the review site details page', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withValidProjectName().andSiteDetails.forRandomMultiSiteWithSameActivityDatesAndDescriptions()
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  await this.actor.attemptsTo(CompleteSiteDetails.now())
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
})

When('the user confirms deletion of all site details', async function () {
  await this.actor.attemptsTo(DeleteAllSiteDetails.now())
})

Then(
  'the user is returned to the task list with site details task not yet started',
  async function () {
    await this.actor.attemptsTo(
      EnsureTaskStatus.is('Site details', 'Incomplete')
    )
  }
)

When('the user cancels deletion of all site details', async function () {
  await this.actor.attemptsTo(CancelDeletionOfAllSiteDetails.now())
})

Then(
  'the user is returned to the review site details page with unchanged site details',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

Given('a user has uploaded sites via file upload', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withKMLUpload())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  await this.actor.attemptsTo(CompleteSiteDetails.now())
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
})

Then('the user can successfully upload a new file', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  await this.actor.attemptsTo(CompleteSiteDetails.now())
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
})

Then('the user can successfully enter manual coordinates', async function () {
  this.actor.updates((exemption) => {
    exemption.siteDetails = {
      coordinatesEntryMethod: 'enter-manually',
      multipleActivities: false,
      multipleSites: false,
      sites: [
        {
          siteName: 'Test Circle Site',
          siteType: 'circle',
          coordinateSystem: 'WGS84',
          coordinates: [{ latitude: '51.507412', longitude: '-0.127812' }],
          circleData: {
            latitude: '51.507412',
            longitude: '-0.127812',
            width: '20'
          },
          activityDates: {
            startDate: '2026-01-01',
            endDate: '2026-12-31'
          },
          activityDescription: 'Manual entry test after deletion'
        }
      ]
    }
  })
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  await this.actor.attemptsTo(CompleteSiteDetails.now())
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
})
