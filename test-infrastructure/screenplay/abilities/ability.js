import { expect } from 'chai'

export default class Ability {
  constructor() {
    if (new.target === Ability) {
      expect.fail(
        'Ability is an abstract class and cannot be instantiated directly.'
      )
    }
  }
}
