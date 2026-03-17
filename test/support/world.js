import { setWorldConstructor, World } from '@cucumber/cucumber'

class PlaywrightWorld extends World {
  constructor(options) {
    super(options)
    this.page = null
    this.browserContext = null
    this.data = {}
    this.testUser = null
    this.scenarioName = null
  }
}

setWorldConstructor(PlaywrightWorld)
