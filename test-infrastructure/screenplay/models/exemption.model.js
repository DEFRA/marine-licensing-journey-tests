import { faker } from '@faker-js/faker'
import MarineProjectModel from './marine.project.model.js'
import PublicRegisterModel from './public.register.model.js'
import SiteDetailsModel from './site.details.model.js'

export default class ExemptionModel {
  static TASK_STATUSES = {
    INCOMPLETE: null,
    COMPLETED: 'COMPLETED'
  }

  static EXEMPTION_TYPES = [
    'Maintenance dredging',
    'Emergency works',
    'Scientific research',
    'Archaeological investigation',
    'Environmental monitoring',
    'Temporary structures',
    'Minor repairs',
    'Survey activities'
  ]

  static generateCompleteExemption(options = {}) {
    const {
      includeProjectName = true,
      includePublicRegister = true,
      includeSiteDetails = false,
      region
    } = options

    const exemption = {
      id: faker.database.mongodbObjectId(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }

    if (includeProjectName) {
      exemption.projectName = MarineProjectModel.generateValidProjectName()
    }

    if (includePublicRegister) {
      exemption.publicRegister =
        PublicRegisterModel.generatePublicRegisterData()
    }

    if (includeSiteDetails) {
      exemption.siteDetails = SiteDetailsModel.generateSiteDetails({ region })
    }

    exemption.taskList = this.generateTaskList(exemption)

    return exemption
  }

  static generateTaskList(exemption) {
    const taskList = {}

    if (exemption.projectName) {
      taskList.projectName = this.TASK_STATUSES.COMPLETED
    }

    if (exemption.publicRegister) {
      taskList.publicRegister = this.TASK_STATUSES.COMPLETED
    }

    if (exemption.siteDetails) {
      taskList.siteDetails = this.TASK_STATUSES.COMPLETED
    }

    return taskList
  }

  static generateTestScenarios() {
    return {
      basicExemption: this.generateCompleteExemption({
        includeProjectName: true,
        includePublicRegister: false,
        includeSiteDetails: false
      }),

      exemptionWithPublicRegister: this.generateCompleteExemption({
        includeProjectName: true,
        includePublicRegister: true,
        includeSiteDetails: false
      }),

      completeExemption: this.generateCompleteExemption({
        includeProjectName: true,
        includePublicRegister: true,
        includeSiteDetails: true
      }),

      northSeaWindFarm: {
        id: faker.database.mongodbObjectId(),
        projectName: 'North Sea Offshore Wind Farm - Phase 1',
        publicRegister:
          PublicRegisterModel.generateTestScenarios()
            .withholdWithCommercialReason,
        siteDetails: SiteDetailsModel.generateTestScenarios().northSeaProject,
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED,
          siteDetails: this.TASK_STATUSES.COMPLETED
        },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      },

      englishChannelCable: {
        id: faker.database.mongodbObjectId(),
        projectName: 'English Channel Marine Cable Installation',
        publicRegister:
          PublicRegisterModel.generateTestScenarios().allowPublicRegister,
        siteDetails:
          SiteDetailsModel.generateTestScenarios().englishChannelProject,
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED,
          siteDetails: this.TASK_STATUSES.COMPLETED
        },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      },

      incompleteExemption: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED
        },
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      },

      emptyExemption: {
        id: faker.database.mongodbObjectId(),
        taskList: {},
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      }
    }
  }

  static generateBoundaryTestData() {
    const projectBoundaries = MarineProjectModel.generateBoundaryTestNames()
    const publicRegisterBoundaries =
      PublicRegisterModel.generateBoundaryTestReasons()

    return {
      emptyProjectName: {
        id: faker.database.mongodbObjectId(),
        projectName: projectBoundaries.empty,
        taskList: {}
      },
      maxLengthProjectName: {
        id: faker.database.mongodbObjectId(),
        projectName: projectBoundaries.exactlyMaxLength,
        taskList: { projectName: this.TASK_STATUSES.COMPLETED }
      },
      oversizedProjectName: {
        id: faker.database.mongodbObjectId(),
        projectName: projectBoundaries.overMaxLength,
        taskList: {}
      },

      emptyWithholdingReason: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        publicRegister: {
          consent: 'yes',
          reason: publicRegisterBoundaries.empty
        },
        taskList: { projectName: this.TASK_STATUSES.COMPLETED }
      },
      maxLengthWithholdingReason: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        publicRegister: {
          consent: 'yes',
          reason: publicRegisterBoundaries.exactlyMaxLength
        },
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED
        }
      },
      oversizedWithholdingReason: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        publicRegister: {
          consent: 'yes',
          reason: publicRegisterBoundaries.overMaxLength
        },
        taskList: { projectName: this.TASK_STATUSES.COMPLETED }
      }
    }
  }

  static generateInvalidData() {
    return {
      missingId: {
        projectName: MarineProjectModel.generateValidProjectName()
      },
      invalidId: {
        id: 'invalid-id',
        projectName: MarineProjectModel.generateValidProjectName()
      },

      invalidPublicRegister: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        publicRegister: PublicRegisterModel.generateInvalidData().invalidConsent
      },

      invalidSiteDetails: {
        id: faker.database.mongodbObjectId(),
        projectName: MarineProjectModel.generateValidProjectName(),
        siteDetails:
          SiteDetailsModel.generateInvalidData().invalidCoordinatesType
      }
    }
  }

  static generateForPersona(persona) {
    const scenarios = {
      fatima: {
        id: faker.database.mongodbObjectId(),
        projectName: 'Dogger Bank Offshore Wind Farm - Extension Phase',
        publicRegister: {
          consent: 'yes',
          reason:
            'Commercial sensitivity regarding proprietary turbine technology and operational methods'
        },
        siteDetails: SiteDetailsModel.generateTestScenarios().northSeaProject,
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED,
          siteDetails: this.TASK_STATUSES.COMPLETED
        }
      },

      simon: {
        id: faker.database.mongodbObjectId(),
        projectName: 'Portsmouth Harbour Maintenance Dredging',
        publicRegister: {
          consent: 'no'
        },
        siteDetails: {
          coordinatesType: 'coordinates',
          coordinatesEntry: 'multiple',
          coordinates: SiteDetailsModel.generateMultipleCoordinates({
            count: 6,
            type: 'polygon'
          }),
          waterDepth: SiteDetailsModel.generateWaterDepth('shallow')
        },
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED,
          siteDetails: this.TASK_STATUSES.COMPLETED
        }
      },

      amy: {
        id: faker.database.mongodbObjectId(),
        projectName: 'Coastal Defence Environmental Impact Assessment',
        publicRegister: {
          consent: 'yes',
          reason:
            'Environmental data requires further analysis before public disclosure'
        },
        siteDetails:
          SiteDetailsModel.generateTestScenarios().englishChannelProject,
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED
        }
      },

      zofia: {
        id: faker.database.mongodbObjectId(),
        projectName: 'Marine Biodiversity Research Station - Pilot Study',
        publicRegister: {
          consent: 'no'
        },
        siteDetails: {
          coordinatesType: 'coordinates',
          coordinatesEntry: 'single',
          coordinates: SiteDetailsModel.generateMarineCoordinates({
            region: 'scottish-waters'
          }),
          waterDepth: SiteDetailsModel.generateWaterDepth('medium')
        },
        taskList: {
          projectName: this.TASK_STATUSES.COMPLETED,
          publicRegister: this.TASK_STATUSES.COMPLETED,
          siteDetails: this.TASK_STATUSES.COMPLETED
        }
      }
    }

    return scenarios[persona] || this.generateCompleteExemption()
  }
}
