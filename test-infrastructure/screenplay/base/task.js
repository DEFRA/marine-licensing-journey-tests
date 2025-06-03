import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'

export default class Task {
  async performAs(actor) {
    await Promise.resolve() // Satisfy require-await
    expect.fail(ERROR_MESSAGES.MISSING_PERFORM_AS)
  }
}
