import { MarineProjectModel, PublicRegisterModel } from '../models/index.js'

export default class ApplyForExemption {
  constructor(data) {
    this.data = data
  }

  static now() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: PublicRegisterModel.generatePublicRegisterData(),
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withValidProjectName() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withEmptyProjectName() {
    return new ApplyForExemption({
      projectName: '',
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withProjectNameThatIsTooLong() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateOversizedProjectName(),
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withConsentToPublicRegister() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: '#consent-2'
      },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withWithholdFromPublicRegister() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: '#consent',
        reason: PublicRegisterModel.generateWithholdingReason()
      },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withWithholdFromPublicRegisterButNoReason() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: '#consent',
        reason: ''
      },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withWithholdReasonThatIsTooLong() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: '#consent',
        reason: PublicRegisterModel.generateOversizedReason()
      },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withNoPublicRegisterChoice() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: null,
        reason: null
      },
      projectNameTaskCompleted: true,
      publicRegisterTaskCompleted: false
    })
  }

  static withTemporaryChanges() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'yes',
        reason: 'This will not be saved'
      },
      isTemporary: true,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
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
