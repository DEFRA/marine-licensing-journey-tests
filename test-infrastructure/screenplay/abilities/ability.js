export default class Ability {
  /**
   * Constructs an Ability instance.
   * This class is intended to be extended and should not be instantiated directly.
   */
  constructor() {
    if (new.target === Ability) {
      throw new Error(
        'Ability is an abstract class and cannot be instantiated directly.'
      )
    }
  }
}
