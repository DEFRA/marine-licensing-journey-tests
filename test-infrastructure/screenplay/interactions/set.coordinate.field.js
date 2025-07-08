import { expect } from 'chai'
import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import Task from '../base/task.js'

export default class SetCoordinateField extends Task {
  static withValue(fieldType, point, value) {
    return new SetCoordinateField(fieldType, point, value)
  }

  constructor(fieldType, point, value) {
    super()
    this.fieldType = fieldType
    this.point = point
    this.value = value
  }

  async performAs(actor) {
    const pointMap = {
      'Start and end point': 0,
      'Point 2': 1,
      'Point 3': 2
    }

    const pointIndex = pointMap[this.point]
    if (pointIndex === undefined) {
      expect.fail(`Unknown point: ${this.point}`)
    }

    const browseTheWeb = actor.ability

    if (this.fieldType === 'Eastings') {
      const selector = EnterMultipleCoordinatesPage.eastingsInput(pointIndex)
      await browseTheWeb.sendKeys(selector, this.value)
    } else if (this.fieldType === 'Northings') {
      const selector = EnterMultipleCoordinatesPage.northingsInput(pointIndex)
      await browseTheWeb.sendKeys(selector, this.value)
    } else if (this.fieldType === 'Latitude') {
      const selector = EnterMultipleCoordinatesPage.latitudeInput(pointIndex)
      await browseTheWeb.sendKeys(selector, this.value)
    } else if (this.fieldType === 'Longitude') {
      const selector = EnterMultipleCoordinatesPage.longitudeInput(pointIndex)
      await browseTheWeb.sendKeys(selector, this.value)
    } else {
      expect.fail(`Unknown field type: ${this.fieldType}`)
    }
  }
}
