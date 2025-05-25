import ExemptionModel from './exemption.model.js'
import MarineProjectModel from './marine.project.model.js'
import PublicRegisterModel from './public.register.model.js'

export { default as ExemptionData } from './exemption.data.js'
export { default as ExemptionModel } from './exemption.model.js'
export { default as MarineProjectModel } from './marine.project.model.js'
export { default as MemoryFormatter } from './memory.formatter.js'
export { default as PublicRegisterModel } from './public.register.model.js'

export const TestData = {
  MarineProject: MarineProjectModel,
  PublicRegister: PublicRegisterModel,
  Exemption: ExemptionModel
}

export const generateTestData = {
  projectName: () => MarineProjectModel.generateProjectName(),
  publicRegister: (withhold = false) =>
    PublicRegisterModel.generatePublicRegisterData({ withhold })
}
