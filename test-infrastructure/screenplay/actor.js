export default class Actor {
  constructor(name) {
    this.name = name
  }

  can(ability) {
    this.ability = ability
  }

  attemptsTo(...tasks) {
    tasks.forEach((task) => task.performAs(this))
  }
}
