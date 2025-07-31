import { Then } from '@cucumber/cucumber'
import { EnsureServiceName } from '~/test-infrastructure/screenplay'

Then(
  'the service name {string} is displayed in the header',
  async function (expectedServiceName) {
    await this.actor.attemptsTo(EnsureServiceName.is(expectedServiceName))
  }
)
