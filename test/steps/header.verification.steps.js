import { Then } from '@cucumber/cucumber'
import {
  EnsureNavigationLinks,
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
  await this.actor.attemptsTo(EnsureNavigationLinks.inHeader(expectedLinks))
})

Then('no links are displayed in the header', async function () {
  const expectedLinks = []
  await this.actor.attemptsTo(EnsureNavigationLinks.inHeader(expectedLinks))
})

Then('the links are displayed in the footer:', async function (dataTable) {
  const expectedLinks = dataTable.raw().map((row) => row[0])
  await this.actor.attemptsTo(EnsureNavigationLinks.inFooter(expectedLinks))
})
