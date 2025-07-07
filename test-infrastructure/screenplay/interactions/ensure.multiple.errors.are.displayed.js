import { expect } from 'chai'
import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import Task from '../base/task.js'
import EnsureErrorDisplayed from './ensure.error.js'

export default class EnsureMultipleErrorsAreDisplayed extends Task {
  static forPolygonOSGB36Coordinates(fieldErrorList) {
    return new EnsureMultipleErrorsAreDisplayed(
      fieldErrorList,
      'polygon-osgb36'
    )
  }

  static withCustomSelectors(errorDefinitions) {
    return new EnsureMultipleErrorsAreDisplayed(errorDefinitions, 'custom')
  }

  constructor(fieldErrorList, type = 'custom') {
    super()
    this.fieldErrorList = fieldErrorList
    this.type = type
  }

  async performAs(actor) {
    for (const errorItem of this.fieldErrorList) {
      let selector
      let message

      if (this.type === 'polygon-osgb36') {
        // Map field names to polygon OSGB36 coordinate error selectors
        selector = this.getPolygonOSGB36ErrorSelector(
          errorItem.Field || errorItem.field
        )
        message = errorItem['Error Message'] || errorItem.message
      } else {
        // Custom mode - expect selector and message to be provided
        selector = errorItem.selector
        message = errorItem.message
      }

      // Use the existing EnsureErrorDisplayed interaction for each error
      await actor.attemptsTo(EnsureErrorDisplayed.is(selector, message))
    }
  }

  getPolygonOSGB36ErrorSelector(field) {
    switch (field) {
      case 'Start and end point eastings':
        return EnterMultipleCoordinatesPage.eastingsError(0)
      case 'Start and end point northings':
        return EnterMultipleCoordinatesPage.northingsError(0)
      case 'Point 2 eastings':
        return EnterMultipleCoordinatesPage.eastingsError(1)
      case 'Point 2 northings':
        return EnterMultipleCoordinatesPage.northingsError(1)
      case 'Point 3 eastings':
        return EnterMultipleCoordinatesPage.eastingsError(2)
      case 'Point 3 northings':
        return EnterMultipleCoordinatesPage.northingsError(2)
      default:
        expect.fail(`Unknown polygon OSGB36 field: ${field}`)
    }
  }
}
