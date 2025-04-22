import Task from '../tasks/task'

import { expect } from 'chai'

export default class EnsureHeadingIs extends Task {
  static thatPageHeadingIs(expectation) {
    return new EnsureHeadingIs(expectation)
  }

  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  async performAs(actor) {
    const title = await actor.ability.getHeading()
    expect(title).to.equal(this.expectation)
  }
}
