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

  static markTaskCompleted(taskName) {
    if (!taskName || typeof taskName !== 'string') {
      expect.fail('Task name must be a non-empty string')
    }
    return (exemption) => {
      exemption[`${taskName}TaskCompleted`] = true
    }
  }
}
