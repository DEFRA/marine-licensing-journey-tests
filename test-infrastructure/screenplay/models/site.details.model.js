import { faker } from '@faker-js/faker'

export default class SiteDetailsModel {
  static UK_MARINE_BOUNDS = {
    north: 61.0,
    south: 49.5,
    east: 2.0,
    west: -11.0
  }

  static COORDINATE_SYSTEMS = [
    'WGS84 (GPS)',
    'OSGB36 (Ordnance Survey)',
    'ETRS89',
    'British National Grid',
    'UTM Zone 30N',
    'UTM Zone 31N'
  ]

  static COORDINATE_ENTRY_TYPES = {
    single: 'Single coordinate point',
    multiple: 'Multiple coordinate points',
    polygon: 'Polygon boundary',
    line: 'Linear feature'
  }

  static WATER_DEPTHS = {
    shallow: { min: 0, max: 20, description: 'Shallow water (0-20m)' },
    medium: { min: 20, max: 50, description: 'Medium depth (20-50m)' },
    deep: { min: 50, max: 200, description: 'Deep water (50-200m)' },
    veryDeep: { min: 200, max: 1000, description: 'Very deep water (200m+)' }
  }

  static generateMarineCoordinates(options = {}) {
    const { region } = options

    let bounds = this.UK_MARINE_BOUNDS

    if (region) {
      bounds = this.getRegionalBounds(region)
    }

    const latitude = faker.number.float({
      min: bounds.south,
      max: bounds.north,
      fractionDigits: 6
    })

    const longitude = faker.number.float({
      min: bounds.west,
      max: bounds.east,
      fractionDigits: 6
    })

    return {
      latitude,
      longitude,
      coordinateSystem: faker.helpers.arrayElement(this.COORDINATE_SYSTEMS),
      accuracy: faker.helpers.arrayElement(['±1m', '±5m', '±10m', '±50m'])
    }
  }

  static getRegionalBounds(region) {
    const regions = {
      'north-sea': { north: 61.0, south: 51.0, east: 2.0, west: -1.0 },
      'english-channel': { north: 51.0, south: 49.5, east: 2.0, west: -5.0 },
      'irish-sea': { north: 55.0, south: 51.5, east: -3.0, west: -6.0 },
      'bristol-channel': { north: 51.5, south: 51.0, east: -2.5, west: -5.0 },
      'scottish-waters': { north: 61.0, south: 55.0, east: -1.0, west: -8.0 },
      'welsh-coast': { north: 53.5, south: 51.0, east: -3.0, west: -5.5 }
    }

    return regions[region] || this.UK_MARINE_BOUNDS
  }

  static generateMultipleCoordinates(options = {}) {
    const { count = faker.number.int({ min: 3, max: 8 }), type = 'polygon' } =
      options

    const coordinates = []
    const baseCoord = this.generateMarineCoordinates()

    for (let i = 0; i < count; i++) {
      const coord = {
        latitude:
          baseCoord.latitude +
          faker.number.float({ min: -0.01, max: 0.01, fractionDigits: 6 }),
        longitude:
          baseCoord.longitude +
          faker.number.float({ min: -0.01, max: 0.01, fractionDigits: 6 }),
        coordinateSystem: baseCoord.coordinateSystem,
        pointNumber: i + 1
      }
      coordinates.push(coord)
    }

    if (type === 'polygon' && coordinates.length > 2) {
      coordinates.push({
        ...coordinates[0],
        pointNumber: coordinates.length + 1
      })
    }

    return coordinates
  }

  static generateWaterDepth(category = null) {
    const selectedCategory =
      category || faker.helpers.arrayElement(Object.keys(this.WATER_DEPTHS))
    const depthRange = this.WATER_DEPTHS[selectedCategory]

    return {
      depth: faker.number.float({
        min: depthRange.min,
        max: depthRange.max,
        fractionDigits: 1
      }),
      unit: 'metres',
      category: selectedCategory,
      description: depthRange.description,
      chartDatum: 'Lowest Astronomical Tide (LAT)'
    }
  }

  static generateSiteDetails(options = {}) {
    const {
      coordinatesType = faker.helpers.arrayElement(['coordinates', 'file']),
      coordinatesEntry = faker.helpers.arrayElement(['single', 'multiple']),
      region
    } = options

    const siteDetails = {
      coordinatesType,
      coordinatesEntry
    }

    if (coordinatesType === 'coordinates') {
      if (coordinatesEntry === 'single') {
        siteDetails.coordinates = this.generateMarineCoordinates({ region })
      } else {
        siteDetails.coordinates = this.generateMultipleCoordinates()
      }

      siteDetails.waterDepth = this.generateWaterDepth()
    }

    return siteDetails
  }

  static generateTestScenarios() {
    return {
      singleCoordinate: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'single',
        coordinates: this.generateMarineCoordinates(),
        waterDepth: this.generateWaterDepth('shallow')
      },
      multipleCoordinates: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'multiple',
        coordinates: this.generateMultipleCoordinates({ count: 4 }),
        waterDepth: this.generateWaterDepth('medium')
      },
      polygonBoundary: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'multiple',
        coordinates: this.generateMultipleCoordinates({
          count: 5,
          type: 'polygon'
        }),
        waterDepth: this.generateWaterDepth('deep')
      },
      fileUpload: {
        coordinatesType: 'file',
        fileName: `marine_coordinates_${faker.date.recent().getTime()}.csv`,
        fileSize: faker.number.int({ min: 1024, max: 102400 }),
        coordinateCount: faker.number.int({ min: 10, max: 100 })
      },
      northSeaProject: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'single',
        coordinates: this.generateMarineCoordinates({ region: 'north-sea' }),
        waterDepth: this.generateWaterDepth('deep')
      },
      englishChannelProject: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'single',
        coordinates: this.generateMarineCoordinates({
          region: 'english-channel'
        }),
        waterDepth: this.generateWaterDepth('medium')
      }
    }
  }

  static generateInvalidData() {
    return {
      missingCoordinatesType: {
        coordinatesEntry: 'single'
      },
      missingCoordinatesEntry: {
        coordinatesType: 'coordinates'
      },
      invalidCoordinatesType: {
        coordinatesType: 'invalid',
        coordinatesEntry: 'single'
      },
      invalidCoordinatesEntry: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'invalid'
      },
      outOfBoundsCoordinates: {
        coordinatesType: 'coordinates',
        coordinatesEntry: 'single',
        coordinates: {
          latitude: 90.0,
          longitude: 180.0,
          coordinateSystem: 'WGS84 (GPS)'
        }
      }
    }
  }
}
