import { MarineProjectModel, PublicRegisterModel } from '../models/index.js'

export default class ApplyForExemption {
  constructor(data) {
    this.data = data
  }

  static createExemption(overrides = {}) {
    const defaults = {
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    }
    return new ApplyForExemption({ ...defaults, ...overrides })
  }

  static withValidProjectName() {
    return this.createExemption()
  }

  static withProjectName(projectName) {
    return this.createExemption({ projectName })
  }

  static withConsentToPublicRegister() {
    return this.createExemption({
      publicRegister: { consent: true }
    })
  }

  static withWithholdFromPublicRegister() {
    return this.createExemption({
      publicRegister: {
        consent: false,
        reason: PublicRegisterModel.generateWithholdingReason()
      }
    })
  }

  getData() {
    return this.data
  }

  getProjectName() {
    return this.data.projectName
  }

  getPublicRegisterData() {
    return this.data.publicRegister
  }
}
