import Task from '../tasks/task'
import { queryMongoDb } from '~/test-infrastructure/db/mongo.db.js'
import { attachJson } from '~/test-infrastructure/capture/json.js'
import { expect } from 'chai'

export default class EnsureNotification extends Task {
  /**
   * Description placeholder
   *
   * @static
   * @param {string} expectation
   * @returns {EnsureNotification}
   */
  static isCreatedWithName(expectation) {
    return new EnsureNotification(expectation)
  }

  /**
   * Creates an instance of EnsureNotification
   *
   * @constructor
   * @param {string} expectation
   */
  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  /**
   * Asserts that the notification record is created and the details
   * are correct
   *
   * @async
   */
  async performAs() {
    const result = await queryMongoDb(global.sharedVariables.mongoDbUri)
    attachJson(result)
    expect(result.data).to.have.lengthOf(
      1,
      `Expected one record, but found ${result.length}`
    )
    expect(result.data[0]).to.have.property('projectName', this.expectation)
  }
}
