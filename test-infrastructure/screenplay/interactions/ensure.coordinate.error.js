import { expect } from 'chai'
import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import Task from '../base/task.js'

export default class EnsureCoordinateError extends Task {
  constructor(fieldType, point, expectedError) {
    super()
    this.fieldType = fieldType
    this.point = point
    this.expectedError = expectedError
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

    let selector
    if (this.fieldType === 'Eastings') {
      selector = EnterMultipleCoordinatesPage.eastingsError(pointIndex)
    } else if (this.fieldType === 'Northings') {
      selector = EnterMultipleCoordinatesPage.northingsError(pointIndex)
    } else if (this.fieldType === 'Latitude') {
      selector = EnterMultipleCoordinatesPage.latitudeError(pointIndex)
    } else if (this.fieldType === 'Longitude') {
      selector = EnterMultipleCoordinatesPage.longitudeError(pointIndex)
    } else {
      expect.fail(`Unknown field type: ${this.fieldType}`)
    }

    await browseTheWeb.expectElementToContainText(selector, this.expectedError)

    // Also check the error appears exactly once in the error summary
    const errorSummaryLinks = await browseTheWeb.browser.$$(
      '.govuk-error-summary__list a'
    )
    let matchingErrorCount = 0
    for (const link of errorSummaryLinks) {
      const linkText = await link.getText()
      if (linkText.trim() === this.expectedError) {
        matchingErrorCount++
      }
    }

    expect(
      matchingErrorCount,
      `Expected error "${this.expectedError}" to appear exactly once in error summary, but found ${matchingErrorCount} occurrences`
    ).to.equal(1)
  }
}
