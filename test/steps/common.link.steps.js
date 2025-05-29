import { When } from '@cucumber/cucumber'
import ClickCancel from '~/test-infrastructure/screenplay/interactions/click.cancel'
import ClickBack from '~/test-infrastructure/screenplay/interactions/click.back'

When('the Cancel button is clicked', async function () {
  await this.actor.attemptsTo(ClickCancel.now())
})

When('the Back link is clicked', async function () {
  await this.actor.attemptsTo(ClickBack.now())
})
