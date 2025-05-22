import { assert } from 'chai'
import { attachJson } from '../capture/json.js'

export default class Actor {
  constructor(name) {
    this.name = name
    this.memory = {}
    // Keys that are allowed to be missing without failing the test
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
    // Don't assert for optional keys
    if (this.optionalKeys.includes(key)) {
      return this.memory[key] || ''
    }

    const errorMessage = `Actor '${this.name}' tried to recall '${key}' but it wasn't in memory`
    assert.property(this.memory, key, errorMessage)
    return this.memory[key]
  }

  // Safely recall a key that might not exist, with a default value
  recallsOptional(key, defaultValue = '') {
    return key in this.memory ? this.memory[key] : defaultValue
  }

  forgets(key) {
    // Don't assert for optional keys
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

    // Convert technical selectors to human-readable descriptions
    if ('publicRegisterChoice' in memoryWithDescriptions) {
      const value = memoryWithDescriptions.publicRegisterChoice
      // Avoid direct dependency on page objects
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
