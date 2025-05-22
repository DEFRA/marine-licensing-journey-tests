import { expect } from 'chai'

export default class Task {
  async performAs(actor) {
    expect.fail('Tasks and interactions must implement the performAs method.')
  }
}
