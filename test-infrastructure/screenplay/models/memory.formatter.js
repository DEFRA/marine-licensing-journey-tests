export default class MemoryFormatter {
  static formatForDisplay(memory) {
    const formatted = { ...memory }

    if ('publicRegisterChoice' in formatted) {
      formatted.publicRegisterChoice = this.formatPublicRegisterChoice(
        formatted.publicRegisterChoice
      )
    }

    return formatted
  }

  static formatPublicRegisterChoice(value) {
    if (value.includes('consent-2')) {
      return 'Allow information to be added to the public register'
    }
    if (value.includes('consent')) {
      return 'Withhold information from the public register'
    }
    return value
  }
}
