import { expect } from 'chai'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from '../tasks/task'

export default class EnsureTaskListContains extends Task {
  static exactly(count) {
    return new EnsureTaskListContains(count)
  }

  static atLeast(count) {
    return new EnsureTaskListContains(count, 'at-least')
  }

  static atMost(count) {
    return new EnsureTaskListContains(count, 'at-most')
  }

  constructor(count, mode = 'exactly') {
    super()
    this.count = count
    this.mode = mode
  }

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
