export default class MemoryFormatter {
  static formatForDisplay(memory) {
    const formatted = { ...memory }

    if (
      'exemption' in formatted &&
      formatted.exemption?.publicRegister?.consent !== undefined
    ) {
      formatted.exemption = {
        ...formatted.exemption,
        publicRegister: {
          ...formatted.exemption.publicRegister,
          consent: this.formatPublicRegisterChoice(
            formatted.exemption.publicRegister.consent
          )
        }
      }
    }

    return formatted
  }

  static formatPublicRegisterChoice(value) {
    if (value === true) {
      return 'Allow information to be added to the public register'
    }
    if (value === false) {
      return 'Withhold information from the public register'
    }
    if (value === null) {
      return 'No choice made'
    }
    return value
  }
}
