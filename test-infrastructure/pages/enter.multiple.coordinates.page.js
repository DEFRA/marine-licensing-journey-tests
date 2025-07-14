export default class EnterMultipleCoordinatesPage {
  static latitudeInput(pointIndex) {
    return `#coordinates-${pointIndex}-latitude`
  }

  static longitudeInput(pointIndex) {
    return `#coordinates-${pointIndex}-longitude`
  }

  static eastingsInput(pointIndex) {
    return `#coordinates-${pointIndex}-eastings`
  }

  static northingsInput(pointIndex) {
    return `#coordinates-${pointIndex}-northings`
  }

  static latitudeError(pointIndex) {
    return `#coordinates-${pointIndex}-latitude-error`
  }

  static longitudeError(pointIndex) {
    return `#coordinates-${pointIndex}-longitude-error`
  }

  static eastingsError(pointIndex) {
    return `#coordinates-${pointIndex}-eastings-error`
  }

  static northingsError(pointIndex) {
    return `#coordinates-${pointIndex}-northings-error`
  }

  static continueButton = '#continue'

  static addAnotherPointButton = 'button*=Add another point'
}
