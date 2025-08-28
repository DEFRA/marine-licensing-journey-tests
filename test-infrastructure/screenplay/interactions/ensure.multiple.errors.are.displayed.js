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

  static forPolygonWGS84Coordinates(fieldErrorList) {
    return new EnsureMultipleErrorsAreDisplayed(fieldErrorList, 'polygon-wgs84')
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
        selector = this.getPolygonOSGB36ErrorSelector(
          errorItem.Field || errorItem.field
        )
        message = errorItem['Error Message'] || errorItem.message
      } else if (this.type === 'polygon-wgs84') {
        selector = this.getPolygonWGS84ErrorSelector(
          errorItem.Field || errorItem.field
        )
        message = errorItem['Error Message'] || errorItem.message
      } else {
        selector = errorItem.selector
        message = errorItem.message
      }

      await actor.attemptsTo(EnsureErrorDisplayed.is(selector, message))
    }
  }

  getPolygonOSGB36ErrorSelector(field) {
    return this.getPolygonErrorSelector(field, 'osgb36')
  }

  getPolygonWGS84ErrorSelector(field) {
    return this.getPolygonErrorSelector(field, 'wgs84')
  }

  getPolygonErrorSelector(field, coordinateSystem) {
    const fieldMappings = {
      'Start and end point': 0,
      'Point 2': 1,
      'Point 3': 2
    }

    const methodMappings = {
      osgb36: { eastings: 'eastingsError', northings: 'northingsError' },
      wgs84: { latitude: 'latitudeError', longitude: 'longitudeError' }
    }

    for (const [prefix, index] of Object.entries(fieldMappings)) {
      if (field.startsWith(prefix)) {
        const suffix = field.replace(`${prefix} `, '')
        const method = methodMappings[coordinateSystem][suffix]
        if (method) {
          return EnterMultipleCoordinatesPage[method](index)
        }
      }
    }

    expect.fail(
      `Unknown polygon ${coordinateSystem.toUpperCase()} field: ${field}`
    )
  }
}
