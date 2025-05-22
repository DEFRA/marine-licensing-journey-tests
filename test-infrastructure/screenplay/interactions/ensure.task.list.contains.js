import { expect } from 'chai'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from '../tasks/task'

/**
 * Interaction to verify the number of tasks in the task list
 */
export default class EnsureTaskListContains extends Task {
  /**
   * Create an interaction to verify the task list contains exactly a number of tasks
   * @param {number} count - The expected number of tasks
   * @returns {EnsureTaskListContains} The interaction
   */
  static exactly(count) {
    return new EnsureTaskListContains(count)
  }

  /**
   * Create an interaction to verify the task list contains at least a number of tasks
   * @param {number} count - The minimum expected number of tasks
   * @returns {EnsureTaskListContains} The interaction
   */
  static atLeast(count) {
    return new EnsureTaskListContains(count, 'at-least')
  }

  /**
   * Create an interaction to verify the task list contains at most a number of tasks
   * @param {number} count - The maximum expected number of tasks
   * @returns {EnsureTaskListContains} The interaction
   */
  static atMost(count) {
    return new EnsureTaskListContains(count, 'at-most')
  }

  /**
   * @param {number} count - The expected number of tasks
   * @param {string} [mode='exactly'] - The comparison mode: 'exactly', 'at-least', or 'at-most'
   */
  constructor(count, mode = 'exactly') {
    super()
    this.count = count
    this.mode = mode
  }

  /**
   * Perform the verification as an actor
   * @param {Actor} actor - The actor performing the verification
   */
  async performAs(actor) {
    const ability = actor.ability
    const actualCount = await this.getTaskCount(ability)

    this.verifyTaskCount(actualCount)
  }

  async getTaskCount(ability) {
    const selector = TaskListPage.getAllTasks()
    const elements = await ability.browser.$$(selector)
    return elements.length
  }

  verifyTaskCount(actualCount) {
    switch (this.mode) {
      case 'exactly':
        this.checkExactCount(actualCount)
        break
      case 'at-least':
        this.checkAtLeastCount(actualCount)
        break
      case 'at-most':
        this.checkAtMostCount(actualCount)
        break
    }
  }

  checkExactCount(actualCount) {
    expect(actualCount).to.equal(
      this.count,
      `Expected exactly ${this.count} tasks, but found ${actualCount}`
    )
  }

  checkAtLeastCount(actualCount) {
    expect(actualCount).to.be.at.least(
      this.count,
      `Expected at least ${this.count} tasks, but found ${actualCount}`
    )
  }

  checkAtMostCount(actualCount) {
    expect(actualCount).to.be.at.most(
      this.count,
      `Expected at most ${this.count} tasks, but found ${actualCount}`
    )
  }
}
