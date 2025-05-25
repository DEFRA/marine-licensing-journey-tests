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

  static now() {
    return this.createExemption({
      publicRegister: PublicRegisterModel.generatePublicRegisterData()
    })
  }

  static withValidProjectName() {
    return this.createExemption()
  }

  static withProjectName(projectName) {
    return this.createExemption({ projectName })
  }

  static withEmptyProjectName() {
    return this.createExemption({ projectName: '' })
  }

  static withProjectNameThatIsTooLong() {
    return this.createExemption({
      projectName: MarineProjectModel.generateOversizedProjectName()
    })
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

  static withWithholdFromPublicRegisterButNoReason() {
    return this.createExemption({
      publicRegister: {
        consent: false,
        reason: ''
      }
    })
  }

  static withWithholdReasonThatIsTooLong() {
    return this.createExemption({
      publicRegister: {
        consent: false,
        reason: PublicRegisterModel.generateReasonExceedingMaxLength()
      }
    })
  }

  static withNoPublicRegisterChoice() {
    return this.createExemption({
      publicRegister: {
        consent: null,
        reason: null
      },
      projectNameTaskCompleted: true
    })
  }

  static withTemporaryChanges() {
    return this.createExemption({
      publicRegister: {
        consent: true,
        reason: 'This will not be saved'
      },
      isTemporary: true
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

  isTemporary() {
    return this.data.isTemporary || false
  }
}
