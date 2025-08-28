import { readFileSync } from 'fs'
import path from 'path'

export default class CoordinateFiles {
  // KML file constants
  static LARGE_KML = 'test/resources/large.kml'
  static EMPTY_KML = 'test/resources/empty.kml'

  // Shapefile constants
  static LARGE_SHAPEFILE = 'test/resources/mygeodata-large.zip'
  static EMPTY_SHAPEFILE = 'test/resources/empty-shapefile.zip'

  static loadExpectedCoordinates(filePath) {
    const baseName = path.basename(filePath, path.extname(filePath))
    const sidecarPath = path.join(
      path.dirname(filePath),
      `${baseName}.expected.json`
    )

    try {
      const sidecarContent = readFileSync(sidecarPath, 'utf8')
      return JSON.parse(sidecarContent)
    } catch (error) {
      return null
    }
  }
}
