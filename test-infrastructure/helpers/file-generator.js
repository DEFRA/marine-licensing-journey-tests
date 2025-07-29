import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import { logOperation } from '../capture/index.js'

export default class FileGenerator {
  static createFileWithContent(filePath, content, fileType, description) {
    try {
      this.ensureDirectoryExists(filePath)
      fs.writeFileSync(filePath, content)

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated ${description} ${fileType}: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(
        `Failed to generate ${description} ${fileType}: ${error.message}`
      )
    }
  }

  static async createLargeFileWithContent(
    filePath,
    contentCreator,
    targetSizeMB,
    fileType
  ) {
    try {
      this.ensureDirectoryExists(filePath)

      const content = contentCreator(targetSizeMB)
      await this.writeFileAsync(filePath, content)

      this.logFileCreation(filePath, targetSizeMB)
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate large ${fileType}: ${error.message}`)
    }
  }

  static createEmptyFile(filePath, fileType) {
    return this.createFileWithContent(filePath, '', fileType, 'empty')
  }

  static createTemporaryFile(baseName, extension, generator) {
    const filePath = this.createTimestampedPath(baseName, extension)
    return generator(filePath)
  }

  static generateLargeKMLFile(filePath, targetSizeMB = 51) {
    return this.createLargeFileWithContent(
      filePath,
      (size) => this.createKMLContent(size),
      targetSizeMB,
      'KML file'
    )
  }

  static generateEmptyKMLFile(filePath) {
    return this.createEmptyFile(filePath, 'KML file')
  }

  static generateTemporaryLargeFile(baseName = 'large-test-file', sizeMB = 51) {
    return this.createTemporaryFile(baseName, '.kml', (filePath) =>
      this.generateLargeKMLFile(filePath, sizeMB)
    )
  }

  static generateTemporaryEmptyFile(baseName = 'empty-test-file') {
    return this.createTemporaryFile(baseName, '.kml', (filePath) =>
      this.generateEmptyKMLFile(filePath)
    )
  }

  static generateGenericErrorFile(filePath) {
    const validKMLContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Test Document</name>
    <Placemark>
      <name>Test Point</name>
      <Point>
        <coordinates>-1.0,51.0,0</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`
    return this.createFileWithContent(
      filePath,
      validKMLContent,
      'KML file',
      'generic error trigger'
    )
  }

  static generateTemporaryGenericErrorFile(baseName = 'upload-error-trigger') {
    return this.createTemporaryFile(baseName, '.kml', (filePath) =>
      this.generateGenericErrorFile(filePath)
    )
  }

  static generateValidShapefile(filePath) {
    const staticShapefilePath = 'test/resources/mygeodata.zip'
    return this.copyStaticFile(
      staticShapefilePath,
      filePath,
      'Shapefile',
      'valid'
    )
  }

  static generateVirusShapefile(filePath) {
    // For virus testing, just use the static shapefile with a virus filename
    // The virus detection stub works based on filename containing "virus"
    const staticShapefilePath = 'test/resources/mygeodata.zip'
    return this.copyStaticFile(
      staticShapefilePath,
      filePath,
      'Shapefile',
      'virus'
    )
  }

  static generateLargeShapefile(filePath, targetSizeMB = 51) {
    const staticShapefilePath = 'test/resources/mygeodata.zip'
    const targetSizeBytes = targetSizeMB * 1024 * 1024

    // Read the base file and pad it to reach target size
    const baseContent = fs.readFileSync(staticShapefilePath)
    const paddingNeeded = Math.max(0, targetSizeBytes - baseContent.length)
    const padding = Buffer.alloc(paddingNeeded, 0)
    const largeContent = Buffer.concat([baseContent, padding])

    return this.createFileWithContent(
      filePath,
      largeContent,
      'Shapefile',
      'large'
    )
  }

  static generateEmptyShapefile(filePath) {
    return this.createEmptyFile(filePath, 'Shapefile')
  }

  static generateGenericErrorShapefile(filePath) {
    // Use the valid shapefile but with a trigger name for backend error simulation
    const staticShapefilePath = 'test/resources/mygeodata.zip'
    return this.copyStaticFile(
      staticShapefilePath,
      filePath,
      'Shapefile',
      'generic error trigger'
    )
  }

  static generateTemporaryValidShapefile(baseName = 'valid-shapefile') {
    return this.createTemporaryFile(baseName, '.zip', (filePath) =>
      this.generateValidShapefile(filePath)
    )
  }

  static generateTemporaryVirusShapefile(baseName = 'virus-shapefile') {
    return this.createTemporaryFile(baseName, '.zip', (filePath) =>
      this.generateVirusShapefile(filePath)
    )
  }

  static generateTemporaryLargeShapefile(
    baseName = 'large-shapefile',
    sizeMB = 51
  ) {
    return this.createTemporaryFile(baseName, '.zip', (filePath) =>
      this.generateLargeShapefile(filePath, sizeMB)
    )
  }

  static generateTemporaryEmptyShapefile(baseName = 'empty-shapefile') {
    return this.createTemporaryFile(baseName, '.zip', (filePath) =>
      this.generateEmptyShapefile(filePath)
    )
  }

  static generateTemporaryGenericErrorShapefile(
    baseName = 'upload-error-trigger-shapefile'
  ) {
    return this.createTemporaryFile(baseName, '.zip', (filePath) =>
      this.generateGenericErrorShapefile(filePath)
    )
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

  static logFileCreation(filePath, targetSizeMB) {
    const stats = fs.statSync(filePath)
    const actualSizeMB = stats.size / (1024 * 1024)
    logOperation(
      'File Generation',
      `Generated large file: ${filePath} (${actualSizeMB.toFixed(2)} MB)`
    )
  }

  static createTimestampedPath(baseName, extension = '.kml') {
    const timestamp = Date.now()
    return `test/resources/generated-${baseName}-${timestamp}${extension}`
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

  // New helper method for copying static files
  static copyStaticFile(sourcePath, targetPath, fileType, description) {
    try {
      this.ensureDirectoryExists(targetPath)

      if (!fs.existsSync(sourcePath)) {
        expect.fail(`Static test file not found: ${sourcePath}`)
      }

      fs.copyFileSync(sourcePath, targetPath)

      const stats = fs.statSync(targetPath)
      logOperation(
        'File Generation',
        `Copied ${description} ${fileType}: ${sourcePath} -> ${targetPath} (${stats.size} bytes)`
      )
      return targetPath
    } catch (error) {
      expect.fail(`Failed to copy ${description} ${fileType}: ${error.message}`)
    }
  }
}
