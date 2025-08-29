import { expect } from 'chai'

export default class Memory {
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

  static ofActivityDatesWith(activityDates) {
    if (!activityDates || typeof activityDates !== 'object') {
      expect.fail('Activity dates must be an object')
    }
    return (exemption) => (exemption.activityDates = activityDates)
  }
}
