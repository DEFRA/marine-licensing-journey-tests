export default class Actor {
  /**
   * Creates an instance of Actor.
   * @param {string} name - The name of the actor.
   */
  const
  constructor(name) {
    this.name = name
  }

  /**
   * Assigns an ability to the actor.
   * @param {Ability} ability - The ability the actor can perform.
   */
  can(ability) {
    this.ability = ability
  }

  /**
   * The actor attempts to perform multiple tasks.
   * @param {...Task} tasks - The tasks to be performed.
   */
  attemptsTo(...tasks) {
    tasks.forEach((task) => task.performAs(this))
  }
}
