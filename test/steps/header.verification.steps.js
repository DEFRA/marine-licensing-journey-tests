import { Then } from '@cucumber/cucumber'
import {
  EnsureFooterNavigationLinks,
  EnsureHeaderNavigationLinks,
  EnsureServiceName
} from '~/test-infrastructure/screenplay'

Then(
  'the service name {string} is displayed in the header',
  async function (expectedServiceName) {
    await this.actor.attemptsTo(EnsureServiceName.is(expectedServiceName))
  }
)

Then('the links are displayed in the header:', async function (dataTable) {
  const expectedLinks = dataTable.raw().map((row) => row[0])
  await this.actor.attemptsTo(
    EnsureHeaderNavigationLinks.areDisplayed(expectedLinks)
  )
})

Then('no links are displayed in the header', async function () {
  const expectedLinks = []
  await this.actor.attemptsTo(
    EnsureHeaderNavigationLinks.areDisplayed(expectedLinks)
  )
})

Then('the links are displayed in the footer:', async function (dataTable) {
  const expectedLinks = dataTable.raw().map((row) => row[0])
  await this.actor.attemptsTo(
    EnsureFooterNavigationLinks.areDisplayed(expectedLinks)
  )
})
