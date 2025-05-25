import { faker } from '@faker-js/faker'

export default class ExemptionModel {
  static TASK_STATUSES = {
    INCOMPLETE: null,
    COMPLETED: 'COMPLETED'
  }

  constructor(data = {}) {
    this.id = data.id || faker.database.mongodbObjectId()
    this.projectName = data.projectName || null
    this.publicRegister = data.publicRegister || null
    this.siteDetails = data.siteDetails || null
    this.taskList = data.taskList || {}
    this.createdAt = data.createdAt || faker.date.recent()
    this.updatedAt = data.updatedAt || faker.date.recent()
  }

  updateProjectName(projectName) {
    this.projectName = projectName
    this.taskList.projectName = ExemptionModel.TASK_STATUSES.COMPLETED
    this.updatedAt = new Date()
    return this
  }

  updatePublicRegister(publicRegisterData) {
    this.publicRegister = publicRegisterData
    this.taskList.publicRegister = ExemptionModel.TASK_STATUSES.COMPLETED
    this.updatedAt = new Date()
    return this
  }

  updateSiteDetails(siteDetailsData) {
    this.siteDetails = siteDetailsData
    this.taskList.siteDetails = ExemptionModel.TASK_STATUSES.COMPLETED
    this.updatedAt = new Date()
    return this
  }
}
