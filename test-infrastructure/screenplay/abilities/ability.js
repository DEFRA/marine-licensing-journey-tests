export default class Ability {
  constructor() {
    if (new.target === Ability) {
      throw new Error(
        'Ability is an abstract class and cannot be instantiated directly.'
      )
    }
  }
}
