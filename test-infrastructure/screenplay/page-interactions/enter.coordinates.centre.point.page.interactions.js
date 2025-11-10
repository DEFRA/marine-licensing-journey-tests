import { expect } from 'chai'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import EnterCoordinatesCentrePointPage from '~/test-infrastructure/pages/enter.coordinates.centre.point.js'

export default class EnterCoordinatesCentrePointPageInteractions {
  static async enterCoordinatePair(browseTheWeb, coordinateInputs) {
    for (const coordinate of coordinateInputs) {
      await browseTheWeb.sendKeys(coordinate.input, coordinate.value)
    }
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }

  static async enterCircleCoordinates(browseTheWeb, siteDetails) {
    const coordinateMapping = this.getCoordinateFieldMapping(
      siteDetails.coordinateSystem
    )

    const coordinateInputs = [
      {
        input: coordinateMapping.primaryCoordinate.inputSelector,
        value:
          siteDetails.circleData[
            coordinateMapping.primaryCoordinate.dataProperty
          ]
      },
      {
        input: coordinateMapping.secondaryCoordinate.inputSelector,
        value:
          siteDetails.circleData[
            coordinateMapping.secondaryCoordinate.dataProperty
          ]
      }
    ]

    await this.enterCoordinatePair(browseTheWeb, coordinateInputs)
  }

  static async updateCircleCoordinates(browseTheWeb, site, coordinateSystem) {
    const systemToUse = coordinateSystem || site.coordinateSystem
    const newCoords =
      systemToUse === 'WGS84'
        ? { latitude: '51.507412', longitude: '-0.127812' }
        : { eastings: '432675', northings: '181310' }

    site.coordinates = [newCoords]

    const coordinateMapping = this.getCoordinateFieldMapping(systemToUse)

    const coordinateInputs = [
      {
        input: coordinateMapping.primaryCoordinate.inputSelector,
        value: newCoords[coordinateMapping.primaryCoordinate.dataProperty]
      },
      {
        input: coordinateMapping.secondaryCoordinate.inputSelector,
        value: newCoords[coordinateMapping.secondaryCoordinate.dataProperty]
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

    let mappingKey
    if (coordinateSystem === 'WGS84' || coordinateSystem.includes('WGS84')) {
      mappingKey = 'WGS84'
    } else if (
      coordinateSystem === 'OSGB36' ||
      coordinateSystem.includes('OSGB36')
    ) {
      mappingKey = 'OSGB36'
    }

    const mapping = coordinateSystemMappings[mappingKey]
    if (!mapping) {
      expect.fail(`Unsupported coordinate system: ${coordinateSystem}`)
    }

    return mapping
  }
}
