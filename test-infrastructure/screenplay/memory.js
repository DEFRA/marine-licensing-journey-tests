export default class Memory {
  static ofProjectNameWith(newProjectName) {
    return (exemption) => (exemption.projectName = newProjectName)
  }

  static ofPublicRegisterWithConsent(consent) {
    return (exemption) => (exemption.publicRegister = { consent })
  }

  static ofPublicRegisterWithConsentAndReason(consent, reason) {
    return (exemption) => (exemption.publicRegister = { consent, reason })
  }

  static ofPublicRegisterWithReason(reason) {
    return (exemption) => {
      if (!exemption.publicRegister) {
        exemption.publicRegister = { consent: false }
      }
      exemption.publicRegister.reason = reason
    }
  }

  static markTaskCompleted(taskName) {
    return (exemption) => {
      exemption[`${taskName}TaskCompleted`] = true
    }
  }

  static taskStatus(taskName) {
    return (exemption) => {
      const completedKey = `${taskName}TaskCompleted`

      if (
        Object.prototype.hasOwnProperty.call(exemption, completedKey) &&
        exemption[completedKey] === true
      ) {
        return 'Completed'
      } else {
        return 'Incomplete'
      }
    }
  }
}
