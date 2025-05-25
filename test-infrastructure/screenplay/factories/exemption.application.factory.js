import { MarineProjectModel, PublicRegisterModel } from '../models/index.js'

export default class ExemptionApplicationFactory {
  constructor(data) {
    this.data = data
  }

  static now() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: PublicRegisterModel.generatePublicRegisterData()
    })
  }

  static withValidProjectName() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: null
    })
  }

  static withEmptyProjectName() {
    return new ExemptionApplicationFactory({
      projectName: '',
      publicRegister: null
    })
  }

  static withProjectNameThatIsTooLong() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateOversizedProjectName(),
      publicRegister: null
    })
  }

  static withConsentToPublicRegister() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'no'
      }
    })
  }

  static withWithholdFromPublicRegister() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'yes',
        reason: PublicRegisterModel.generateWithholdingReason()
      }
    })
  }

  static withWithholdFromPublicRegisterButNoReason() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'yes',
        reason: ''
      }
    })
  }

  static withWithholdReasonThatIsTooLong() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'yes',
        reason: PublicRegisterModel.generateOversizedReason()
      }
    })
  }

  static withNoPublicRegisterChoice() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: null,
        reason: null
      }
    })
  }

  static withTemporaryChanges() {
    return new ExemptionApplicationFactory({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: 'yes',
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
