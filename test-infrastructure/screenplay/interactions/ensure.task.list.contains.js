import { expect } from 'chai'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from '../base/task.js'

export default class EnsureTaskListContains extends Task {
  static MODES = {
    EXACTLY: 'exactly',
    AT_LEAST: 'at-least',
    AT_MOST: 'at-most'
  }

  static exactly(count) {
    return new EnsureTaskListContains(
      count,
      EnsureTaskListContains.MODES.EXACTLY
    )
  }

  constructor(count, mode = EnsureTaskListContains.MODES.EXACTLY) {
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
    return await ability.countElements(selector)
  }

  verifyTaskCount(actualCount) {
    switch (this.mode) {
      case EnsureTaskListContains.MODES.EXACTLY:
        this.checkExactCount(actualCount)
        break
      case EnsureTaskListContains.MODES.AT_LEAST:
        this.checkAtLeastCount(actualCount)
        break
      case EnsureTaskListContains.MODES.AT_MOST:
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
