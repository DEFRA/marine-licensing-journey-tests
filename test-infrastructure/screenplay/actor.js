import { attachJson } from '../capture/json.js'
import PublicRegisterPage from '../pages/public.register.page.js'

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
    attachJson(this.toJson(), `actor-memory-changed-${key}.json`)
  }

  recalls(key) {
    return this.memory[key]
  }

  toJson() {
    const memoryWithDescriptions = { ...this.memory }

    if ('publicRegisterChoice' in memoryWithDescriptions) {
      switch (memoryWithDescriptions.publicRegisterChoice) {
        case PublicRegisterPage.withhold:
          memoryWithDescriptions.publicRegisterChoice =
            'Withhold information from the public register'
          break
        case PublicRegisterPage.consent:
          memoryWithDescriptions.publicRegisterChoice =
            'Allow information to be added to the public register'
          break
        default:
          break
      }
    }

    return {
      name: this.name,
      memory: memoryWithDescriptions
    }
  }
}
