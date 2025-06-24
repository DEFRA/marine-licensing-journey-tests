import { expect } from 'chai'

export default class Memory {
  static ofProjectNameWith(newProjectName) {
    if (!newProjectName || typeof newProjectName !== 'string') {
      expect.fail('Project name must be a non-empty string')
    }
    return (exemption) => (exemption.projectName = newProjectName)
  }

  static ofPublicRegisterWithConsent(consent) {
    if (typeof consent !== 'boolean') {
      expect.fail('Consent must be a boolean value')
    }
    return (exemption) => (exemption.publicRegister = { consent })
  }

  static ofPublicRegisterWithConsentAndReason(consent, reason) {
    if (typeof consent !== 'boolean') {
      expect.fail('Consent must be a boolean value')
    }
    if (!reason || typeof reason !== 'string') {
      expect.fail('Reason must be a non-empty string')
    }
    return (exemption) => (exemption.publicRegister = { consent, reason })
  }

  static ofPublicRegisterWithReason(reason) {
    if (!reason || typeof reason !== 'string') {
      expect.fail('Reason must be a non-empty string')
    }
    return (exemption) => {
      if (!exemption.publicRegister) {
        exemption.publicRegister = { consent: false }
      }
      exemption.publicRegister.reason = reason
    }
  }

  static ofActivityDescriptionWith(newActivityDescription) {
    if (!newActivityDescription || typeof newActivityDescription !== 'string') {
      expect.fail('Activity description must be a non-empty string')
    }
    return (exemption) =>
      (exemption.activityDescription = newActivityDescription)
  }

  static markTaskCompleted(taskName) {
    if (!taskName || typeof taskName !== 'string') {
      expect.fail('Task name must be a non-empty string')
    }
    return (exemption) => {
      exemption[`${taskName}TaskCompleted`] = true
    }
  }

  static taskStatus(taskName) {
    if (!taskName || typeof taskName !== 'string') {
      expect.fail('Task name must be a non-empty string')
    }
    return (exemption) => {
      const completedKey = `${taskName}TaskCompleted`

      if (completedKey in exemption && exemption[completedKey] === true) {
        return 'Completed'
      } else {
        return 'Incomplete'
      }
    }
  }

  static ofActivityDatesWith(activityDates) {
    if (!activityDates || typeof activityDates !== 'object') {
      expect.fail('Activity dates must be an object')
    }
    return (exemption) => (exemption.activityDates = activityDates)
  }

  static ofActivityStartDateWith(startDate) {
    if (!startDate || typeof startDate !== 'object') {
      expect.fail('Activity start date must be an object')
    }
    return (exemption) => (exemption.activityDates.startDate = startDate)
  }

  static ofActivityEndDateWith(endDate) {
    if (!endDate || typeof endDate !== 'object') {
      expect.fail('Activity end date must be an object')
    }
    return (exemption) => (exemption.activityDates.endDate = endDate)
  }

  static ofFileTypeWith(fileType) {
    if (!fileType || typeof fileType !== 'string') {
      expect.fail('File type must be a non-empty string')
    }
    return (exemption) => (exemption.fileType = fileType)
  }
}
