import { When } from '@cucumber/cucumber'
import ClickBack from '~/test-infrastructure/screenplay/interactions/button-interactions/click.back'
import ClickCancel from '~/test-infrastructure/screenplay/interactions/button-interactions/click.cancel'

When('the Cancel button is clicked', async function () {
  await this.actor.attemptsTo(ClickCancel.now())
})

When('the Back link is clicked', async function () {
  await this.actor.attemptsTo(ClickBack.now())
})
