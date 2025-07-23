export default class HowDoYouWantToProvideCoordinatesPage {
  static uploadCoordinates = '#coordinatesType'
  static enterCoordinates = '#coordinatesType-2'
  static saveAndContinue = 'button[type="submit"]'
  static coordinatesTypeError = '#coordinatesType-error'

  static getCoordinatesInputMethodSelector(coordinatesInputMethod) {
    if (coordinatesInputMethod === 'file-upload') return this.uploadCoordinates
    if (coordinatesInputMethod === 'enter-manually') {
      return this.enterCoordinates
    }
    return coordinatesInputMethod
  }
}
