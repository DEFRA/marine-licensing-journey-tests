import { faker } from '@faker-js/faker'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from '../base/task.js'

export default class Navigate extends Task {
  static toTheMarineLicensingApp = {
    now: () => new Navigate().justNavigateTo(ProjectNamePage.url),
    andCompleteProjectName: () =>
      new Navigate().startAt(ProjectNamePage.url).completeProjectName(),
    andSelectPublicRegisterTask: () =>
      new Navigate()
        .startAt(ProjectNamePage.url)
        .completeProjectName()
        .selectTask('Public register')
  }

  static toPublicRegisterPage() {
    return new Navigate()
      .startAt(ProjectNamePage.url)
      .completeProjectName()
      .selectTask('Public register')
  }

  static toProjectNamePage() {
    return new Navigate().justNavigateTo(ProjectNamePage.url)
  }

  static toTaskListPage() {
    return new Navigate().startAt(ProjectNamePage.url).completeProjectName()
  }

  constructor() {
    super()
    this.steps = []
    this.projectNameValue = null
  }

  startAt(url) {
    this.startUrl = url
    return this
  }

  justNavigateTo(url) {
    this.justNavigateUrl = url
    return this
  }

  completeProjectName(projectName = null) {
    this.projectNameValue = projectName
    return this
  }

  selectTask(taskName) {
    this.taskNameValue = taskName
    return this
  }

  async performAs(actor) {
    if (this.justNavigateUrl) {
      await actor.ability.navigateTo(this.justNavigateUrl)
      return
    }

    await actor.ability.navigateTo(this.startUrl)

    if (this.projectNameValue || !this.startUrl.includes('task-list')) {
      const projectName = this.projectNameValue || faker.lorem.words(5)
      actor.remembers('projectName', projectName)

      await actor.ability.sendKeys(
        ProjectNamePage.projectNameInput,
        projectName
      )
      await actor.ability.click(ProjectNamePage.saveAndContinue)
    }

    if (this.taskNameValue) {
      await actor.ability.click(TaskListPage.getTaskLink(this.taskNameValue))
    }
  }
}
