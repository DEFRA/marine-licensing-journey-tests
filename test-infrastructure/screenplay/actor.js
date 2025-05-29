import { assert } from 'chai'
import { attachJson } from '../capture/json.js'
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
      assert.fail(
        `Cannot replace stored ${key} data. Use updates() method instead.`
      )
    }
    this.memory[key] = value
    attachJson(this.toJson(), `actor-memory-changed-${key}.json`)
  }

  updates(updateFunction) {
    const exemption = this.recalls('exemption')
    if (!exemption) {
      assert.fail('Cannot update exemption data that has not been initialized')
    }

    updateFunction(exemption)

    attachJson(this.toJson(), 'actor-memory-updated-exemption.json')
    return this
  }

  recalls(key) {
    const errorMessage = `Actor '${this.name}' tried to recall '${key}' but it wasn't in memory`
    assert.property(this.memory, key, errorMessage)
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
