import { assert } from 'chai'
import { attachJson } from '../capture/json.js'
import ExemptionData from './models/exemption.data.js'
import MemoryFormatter from './models/memory.formatter.js'

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

  intendsTo(factory) {
    const data = new ExemptionData(factory.getData())
    data.markAsStored()
    this.remembers('exemption', data)
    return this
  }

  remembers(key, value) {
    if (this.hasMemoryOf(key) && this.memory[key]?._isStored) {
      assert.fail(
        `Cannot replace stored ${key} data. Use updates() method instead.`
      )
    }
    this.memory[key] = value
    attachJson(this.toJson(), `actor-memory-changed-${key}.json`)
  }

  updates(key, updateFunction) {
    const item = this.recalls(key)
    updateFunction(item)
    attachJson(this.toJson(), `actor-memory-changed-${key}.json`)
    return this
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
    return {
      name: this.name,
      memory: MemoryFormatter.formatForDisplay(this.memory)
    }
  }
}
