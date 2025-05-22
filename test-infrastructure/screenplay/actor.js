import { assert } from 'chai'
import { attachJson } from '../capture/json.js'

export default class Actor {
  constructor(name) {
    this.name = name
    this.memory = {}
    this.optionalKeys = ['publicRegisterWithholdReason']
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
    if (this.optionalKeys.includes(key)) {
      return this.memory[key] || ''
    }

    const errorMessage = `Actor '${this.name}' tried to recall '${key}' but it wasn't in memory`
    assert.property(this.memory, key, errorMessage)
    return this.memory[key]
  }

  recallsOptional(key, defaultValue = '') {
    return key in this.memory ? this.memory[key] : defaultValue
  }

  forgets(key) {
    if (this.optionalKeys.includes(key)) {
      if (key in this.memory) {
        delete this.memory[key]
        attachJson(this.toJson(), `actor-memory-removed-${key}.json`)
      }
      return
    }

    const errorMessage = `Actor '${this.name}' tried to forget '${key}' but it wasn't in memory`
    assert.property(this.memory, key, errorMessage)

    delete this.memory[key]
    attachJson(this.toJson(), `actor-memory-removed-${key}.json`)
  }

  hasMemoryOf(key) {
    return key in this.memory
  }

  getMemorySnapshot() {
    return { ...this.memory }
  }

  toJson() {
    const memoryWithDescriptions = { ...this.memory }

    if ('publicRegisterChoice' in memoryWithDescriptions) {
      const value = memoryWithDescriptions.publicRegisterChoice
      if (value.includes('consent-2')) {
        memoryWithDescriptions.publicRegisterChoice =
          'Allow information to be added to the public register'
      } else if (value.includes('consent')) {
        memoryWithDescriptions.publicRegisterChoice =
          'Withhold information from the public register'
      }
    }

    return {
      name: this.name,
      memory: memoryWithDescriptions
    }
  }
}
