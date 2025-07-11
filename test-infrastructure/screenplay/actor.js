import { expect } from 'chai'
import { attachJson } from '../capture/json.js'
import { ERROR_MESSAGES } from './constants/error-messages.js'
import MemoryFormatter from './models/memory.formatter.js'

export default class Actor {
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

  intendsTo(factory) {
    const data = factory.getData()
    this.remembers('exemption', data)
    return this
  }

  remembers(key, value) {
    if (this.hasMemoryOf(key) && key === 'exemption') {
      expect.fail(ERROR_MESSAGES.CANNOT_REPLACE_EXEMPTION(key))
    }
    this.memory[key] = value
    attachJson(this.toJson(), `actor-memory-changed-${key}.json`)
  }

  updates(updateFunction) {
    const exemption = this.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.CANNOT_UPDATE_UNINITIALIZED)
    }

    updateFunction(exemption)

    attachJson(this.toJson(), 'actor-memory-updated-exemption.json')
    return this
  }

  recalls(key) {
    if (!this.hasMemoryOf(key)) {
      expect.fail(ERROR_MESSAGES.MEMORY_NOT_FOUND(this.name, key))
    }
    return this.memory[key]
  }

  hasMemoryOf(key) {
    return key in this.memory
  }

  toJson() {
    return {
      name: this.name,
      memory: MemoryFormatter.formatForDisplay(this.memory)
    }
  }
}
