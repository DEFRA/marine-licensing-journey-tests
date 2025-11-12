import { Given } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb
} from '~/test-infrastructure/screenplay'

Given(
  'a user has started a notification with eastings {string} and northings {string}',
  function (eastings, northings) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithCustomOSGB36Coordinates(
        eastings,
        northings
      )
    )
  }
)
