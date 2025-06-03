import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'

export default class Ability {
  constructor() {
    if (new.target === Ability) {
      expect.fail(ERROR_MESSAGES.ABSTRACT_CLASS_INSTANTIATION)
    }
  }
}
