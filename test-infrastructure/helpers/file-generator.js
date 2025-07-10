import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import { logOperation } from '../capture/index.js'

export default class FileGenerator {
  static async generateLargeKMLFile(filePath, targetSizeMB = 51) {
    try {
      this.ensureDirectoryExists(filePath)

      const kmlContent = this.createKMLContent(targetSizeMB)
      await this.writeFileAsync(filePath, kmlContent)

      this.logFileCreation(filePath, targetSizeMB)
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate large KML file: ${error.message}`)
    }
  }

  static generateEmptyKMLFile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)
      fs.writeFileSync(filePath, '')

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated empty KML file: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate empty KML file: ${error.message}`)
    }
  }

  static async generateTemporaryLargeFile(
    baseName = 'large-test-file',
    sizeMB = 51
  ) {
    const filePath = this.createTimestampedPath(baseName)
    return await this.generateLargeKMLFile(filePath, sizeMB)
  }

  static generateTemporaryEmptyFile(baseName = 'empty-test-file') {
    const filePath = this.createTimestampedPath(baseName)
    return this.generateEmptyKMLFile(filePath)
  }

  static cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        logOperation('File Cleanup', `Cleaned up generated file: ${filePath}`)
      }
    } catch (error) {
      expect.fail(`Failed to cleanup file ${filePath}: ${error.message}`)
    }
  }

  static ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  static createKMLContent(targetSizeMB) {
    const targetSizeBytes = targetSizeMB * 1024 * 1024
    const kmlStructure = this.getKMLStructure()

    const headerFooterSize = Buffer.byteLength(
      kmlStructure.header + kmlStructure.footer,
      'utf8'
    )
    const contentNeeded = targetSizeBytes - headerFooterSize

    const placemarkSize = Buffer.byteLength(kmlStructure.placemark, 'utf8')
    const placemarkCount = Math.ceil(contentNeeded / placemarkSize)

    return (
      kmlStructure.header +
      kmlStructure.placemark.repeat(placemarkCount) +
      kmlStructure.footer
    )
  }

  static getKMLStructure() {
    return {
      header: `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Large Test File</name>
    <description>Generated large KML file for testing file size limits</description>
`,
      placemark: `    <Placemark>
      <name>Test Point</name>
      <description>This is a test placemark generated to increase file size for validation testing</description>
      <Point>
        <coordinates>-1.0,51.0,0</coordinates>
      </Point>
    </Placemark>
`,
      footer: `  </Document>
</kml>`
    }
  }

  static writeFileAsync(filePath, content) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath)

      writeStream.on('finish', resolve)
      writeStream.on('error', reject)

      writeStream.write(content)
      writeStream.end()
    })
  }

  static createTimestampedPath(baseName) {
    const timestamp = Date.now()
    return `test/resources/generated-${baseName}-${timestamp}.kml`
  }

  static logFileCreation(filePath, targetSizeMB) {
    const stats = fs.statSync(filePath)
    const actualSizeMB = stats.size / (1024 * 1024)
    logOperation(
      'File Generation',
      `Generated large KML file: ${filePath} (${actualSizeMB.toFixed(2)} MB)`
    )
  }
}
