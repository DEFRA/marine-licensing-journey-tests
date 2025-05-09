export default class Actor {
  /**
   * Creates an instance of Actor.
   * @param {string} name - The name of the actor.
   */
  const
  constructor(name) {
    this.name = name
    this.memory = {}
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
  async attemptsTo(...tasks) {
    for (const task of tasks) {
      await task.performAs(this)
    }
  }

  /**
   * Stores a value in the actor's memory.
   * @param {string} key - The key to associate with the value.
   * @param {*} value - The value to store.
   */
  remembers(key, value) {
    this.memory[key] = value
  }

  /**
   * Retrieves a value from the actor's memory.
   * @param {string} key - The key associated with the value.
   * @returns {*} The value stored in memory, or undefined if not found.
   */
  recalls(key) {
    return this.memory[key]
  }
}
