import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import EnterCoordinatesCentrePointPage from '~/test-infrastructure/pages/enter.coordinates.centre.point.js'
import { expect } from 'chai'

export default class EnterCoordinatesCentrePointPageInteractions {
  static async enterCoordinatePair(browseTheWeb, coordinateInputs) {
    for (const coordinate of coordinateInputs) {
      await browseTheWeb.sendKeys(coordinate.input, coordinate.value)
    }
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }

  static async enterCircleCoordinates(
    browseTheWeb,
    coordinateSystem,
    circleData
  ) {
    const coordinateMapping = this.getCoordinateFieldMapping(coordinateSystem)

    const coordinateInputs = [
      {
        input: coordinateMapping.primaryCoordinate.inputSelector,
        value: circleData[coordinateMapping.primaryCoordinate.dataProperty]
      },
      {
        input: coordinateMapping.secondaryCoordinate.inputSelector,
        value: circleData[coordinateMapping.secondaryCoordinate.dataProperty]
      }
    ]

    await this.enterCoordinatePair(browseTheWeb, coordinateInputs)
  }

  static getCoordinateFieldMapping(coordinateSystem) {
    const coordinateSystemMappings = {
      WGS84: {
        primaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.latitudeInput,
          dataProperty: 'latitude'
        },
        secondaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.longitudeInput,
          dataProperty: 'longitude'
        }
      },
      OSGB36: {
        primaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.eastingsInput,
          dataProperty: 'eastings'
        },
        secondaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.northingsInput,
          dataProperty: 'northings'
        }
      }
    }

    const mapping = coordinateSystemMappings[coordinateSystem]
    if (!mapping) {
      expect.fail(`Unsupported coordinate system: ${coordinateSystem}`)
    }

    return mapping
  }
}
