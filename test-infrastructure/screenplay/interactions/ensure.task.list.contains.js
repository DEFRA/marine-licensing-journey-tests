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

    const selector = TaskListPage.getAllTasks()
    const elements = await ability.browser.$$(selector)
    const actualCount = elements.length

    switch (this.mode) {
      case 'exactly':
        if (actualCount !== this.count) {
          throw new Error(
            `Expected exactly ${this.count} tasks, but found ${actualCount}`
          )
        }
        break
      case 'at-least':
        if (actualCount < this.count) {
          throw new Error(
            `Expected at least ${this.count} tasks, but found ${actualCount}`
          )
        }
        break
      case 'at-most':
        if (actualCount > this.count) {
          throw new Error(
            `Expected at most ${this.count} tasks, but found ${actualCount}`
          )
        }
        break
    }
  }
}
