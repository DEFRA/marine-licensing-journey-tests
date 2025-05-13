export default class Actor {
  const
  constructor(name) {
    this.name = name
    this.memory = {}
  }

  can(ability) {
    this.ability = ability
  }

  async attemptsTo(...tasks) {
    for (const task of tasks) {
      await task.performAs(this)
    }
  }

  remembers(key, value) {
    this.memory[key] = value
  }

  recalls(key) {
    return this.memory[key]
  }
}
