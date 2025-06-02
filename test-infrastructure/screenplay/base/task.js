import { expect } from 'chai'

export default class Task {
  async performAs(actor) {
    await Promise.resolve() // Satisfy require-await
    expect.fail('Tasks and interactions must implement the performAs method.')
  }
}
