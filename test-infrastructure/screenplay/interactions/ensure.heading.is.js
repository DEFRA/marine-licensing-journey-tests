import { expect } from 'chai'

export default class EnsureHeadingIs {
  static thatPageHeadingIs(expectation) {
    return new EnsureHeadingIs(expectation)
  }

  constructor(expectation) {
    this.expectation = expectation
  }

  async performAs(actor) {
    const title = await actor.ability.getHeading()
    expect(title).to.equal(this.expectation)
  }
}
