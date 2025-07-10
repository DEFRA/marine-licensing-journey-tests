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

  static generateGenericErrorFile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)

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

      fs.writeFileSync(filePath, validKMLContent)

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated generic error trigger file: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate generic error file: ${error.message}`)
    }
  }

  static generateTemporaryGenericErrorFile(baseName = 'upload-error-trigger') {
    const filePath = this.createTimestampedPath(baseName)
    return this.generateGenericErrorFile(filePath)
  }

  static generateValidShapefile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)

      const zipContent = this.createShapefileZipContent()
      fs.writeFileSync(filePath, zipContent)

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated valid Shapefile: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate valid Shapefile: ${error.message}`)
    }
  }

  static generateVirusShapefile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)

      const zipContent = this.createShapefileZipContent('virus-shapefile')
      fs.writeFileSync(filePath, zipContent)

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated virus Shapefile: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate virus Shapefile: ${error.message}`)
    }
  }

  static async generateLargeShapefile(filePath, targetSizeMB = 51) {
    try {
      this.ensureDirectoryExists(filePath)

      const zipContent = this.createLargeShapefileZipContent(targetSizeMB)
      await this.writeFileAsync(filePath, zipContent)

      this.logFileCreation(filePath, targetSizeMB)
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate large Shapefile: ${error.message}`)
    }
  }

  static generateEmptyShapefile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)
      fs.writeFileSync(filePath, '')

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated empty Shapefile: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(`Failed to generate empty Shapefile: ${error.message}`)
    }
  }

  static generateGenericErrorShapefile(filePath) {
    try {
      this.ensureDirectoryExists(filePath)

      const zipContent = this.createShapefileZipContent('upload-error-trigger')
      fs.writeFileSync(filePath, zipContent)

      const stats = fs.statSync(filePath)
      logOperation(
        'File Generation',
        `Generated generic error trigger Shapefile: ${filePath} (${stats.size} bytes)`
      )
      return filePath
    } catch (error) {
      expect.fail(
        `Failed to generate generic error Shapefile: ${error.message}`
      )
    }
  }

  // === TEMPORARY SHAPEFILE GENERATORS ===

  static generateTemporaryValidShapefile(baseName = 'valid-shapefile') {
    const filePath = this.createTimestampedPath(baseName, '.zip')
    return this.generateValidShapefile(filePath)
  }

  static generateTemporaryVirusShapefile(baseName = 'virus-shapefile') {
    const filePath = this.createTimestampedPath(baseName, '.zip')
    return this.generateVirusShapefile(filePath)
  }

  static async generateTemporaryLargeShapefile(
    baseName = 'large-shapefile',
    sizeMB = 51
  ) {
    const filePath = this.createTimestampedPath(baseName, '.zip')
    return await this.generateLargeShapefile(filePath, sizeMB)
  }

  static generateTemporaryEmptyShapefile(baseName = 'empty-shapefile') {
    const filePath = this.createTimestampedPath(baseName, '.zip')
    return this.generateEmptyShapefile(filePath)
  }

  static generateTemporaryGenericErrorShapefile(
    baseName = 'upload-error-trigger-shapefile'
  ) {
    const filePath = this.createTimestampedPath(baseName, '.zip')
    return this.generateGenericErrorShapefile(filePath)
  }

  // === HELPER METHODS ===

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

  static createShapefileZipContent(baseName = 'test-shapefile') {
    const shpContent = this.createSHPContent()
    const shxContent = this.createSHXContent()
    const dbfContent = this.createDBFContent()
    const prjContent = this.createPRJContent()

    return this.createZipBuffer([
      { name: `${baseName}.shp`, content: shpContent },
      { name: `${baseName}.shx`, content: shxContent },
      { name: `${baseName}.dbf`, content: dbfContent },
      { name: `${baseName}.prj`, content: prjContent }
    ])
  }

  static createLargeShapefileZipContent(targetSizeMB) {
    const targetSizeBytes = targetSizeMB * 1024 * 1024

    const shpContent = this.createSHPContent()
    const shxContent = this.createSHXContent()
    const dbfContent = this.createDBFContent()
    const prjContent = this.createPRJContent()

    const basicSize =
      shpContent.length +
      shxContent.length +
      dbfContent.length +
      prjContent.length +
      1000
    const paddingNeeded = Math.max(0, targetSizeBytes - basicSize)

    const largeSHPContent = Buffer.concat([
      shpContent,
      Buffer.alloc(paddingNeeded, 0)
    ])

    return this.createZipBuffer([
      { name: 'large-shapefile.shp', content: largeSHPContent },
      { name: 'large-shapefile.shx', content: shxContent },
      { name: 'large-shapefile.dbf', content: dbfContent },
      { name: 'large-shapefile.prj', content: prjContent }
    ])
  }

  static createSHPContent() {
    const header = Buffer.alloc(100)
    header.writeInt32BE(9994, 0)
    header.writeInt32BE(50, 24)
    header.writeInt32LE(1000, 28)
    header.writeInt32LE(1, 32)

    header.writeDoubleLE(-1.0, 36)
    header.writeDoubleLE(-1.0, 44)
    header.writeDoubleLE(1.0, 52)
    header.writeDoubleLE(1.0, 60)

    const record = Buffer.alloc(12)
    record.writeInt32BE(1, 0)
    record.writeInt32BE(10, 4)
    record.writeInt32LE(1, 8)

    return Buffer.concat([header, record])
  }

  static createSHXContent() {
    const header = Buffer.alloc(100)
    header.writeInt32BE(9994, 0)
    header.writeInt32BE(54, 24)
    header.writeInt32LE(1000, 28)
    header.writeInt32LE(1, 32)

    const record = Buffer.alloc(8)
    record.writeInt32BE(50, 0)
    record.writeInt32BE(10, 4)

    return Buffer.concat([header, record])
  }

  static createDBFContent() {
    const header = Buffer.alloc(32)
    header.writeUInt8(3, 0)
    header.writeUInt8(125, 1)
    header.writeUInt8(1, 2)
    header.writeUInt8(1, 3)
    header.writeUInt32LE(1, 4)
    header.writeUInt16LE(33, 8)
    header.writeUInt16LE(1, 10)

    const terminator = Buffer.from([0x0d])
    return Buffer.concat([header, terminator])
  }

  static createPRJContent() {
    return Buffer.from(
      `GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]`
    )
  }

  static createZipBuffer(files) {
    const zipData = []
    const centralDir = []
    let offset = 0

    for (const file of files) {
      const fileName = Buffer.from(file.name)
      const fileContent = Buffer.isBuffer(file.content)
        ? file.content
        : Buffer.from(file.content)

      const localHeader = Buffer.alloc(30 + fileName.length)
      localHeader.writeUInt32LE(0x04034b50, 0)
      localHeader.writeUInt16LE(20, 4)
      localHeader.writeUInt16LE(0, 6)
      localHeader.writeUInt16LE(0, 8)
      localHeader.writeUInt16LE(0, 10)
      localHeader.writeUInt16LE(0, 12)
      localHeader.writeUInt32LE(0, 14)
      localHeader.writeUInt32LE(fileContent.length, 18)
      localHeader.writeUInt32LE(fileContent.length, 22)
      localHeader.writeUInt16LE(fileName.length, 26)
      localHeader.writeUInt16LE(0, 28)
      fileName.copy(localHeader, 30)

      zipData.push(localHeader)
      zipData.push(fileContent)

      const centralEntry = Buffer.alloc(46 + fileName.length)
      centralEntry.writeUInt32LE(0x02014b50, 0)
      centralEntry.writeUInt16LE(20, 4)
      centralEntry.writeUInt16LE(20, 6)
      centralEntry.writeUInt16LE(0, 8)
      centralEntry.writeUInt16LE(0, 10)
      centralEntry.writeUInt16LE(0, 12)
      centralEntry.writeUInt16LE(0, 14)
      centralEntry.writeUInt32LE(0, 16)
      centralEntry.writeUInt32LE(fileContent.length, 20)
      centralEntry.writeUInt32LE(fileContent.length, 24)
      centralEntry.writeUInt16LE(fileName.length, 28)
      centralEntry.writeUInt16LE(0, 30)
      centralEntry.writeUInt16LE(0, 32)
      centralEntry.writeUInt16LE(0, 34)
      centralEntry.writeUInt16LE(0, 36)
      centralEntry.writeUInt32LE(0, 38)
      centralEntry.writeUInt32LE(offset, 42)
      fileName.copy(centralEntry, 46)

      centralDir.push(centralEntry)
      offset += localHeader.length + fileContent.length
    }

    const centralDirData = Buffer.concat(centralDir)

    const endOfCentralDir = Buffer.alloc(22)
    endOfCentralDir.writeUInt32LE(0x06054b50, 0)
    endOfCentralDir.writeUInt16LE(0, 4)
    endOfCentralDir.writeUInt16LE(0, 6)
    endOfCentralDir.writeUInt16LE(files.length, 8)
    endOfCentralDir.writeUInt16LE(files.length, 10)
    endOfCentralDir.writeUInt32LE(centralDirData.length, 12)
    endOfCentralDir.writeUInt32LE(offset, 16)
    endOfCentralDir.writeUInt16LE(0, 20)

    return Buffer.concat([...zipData, centralDirData, endOfCentralDir])
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

  static createTimestampedPath(baseName, extension = '.kml') {
    const timestamp = Date.now()
    return `test/resources/generated-${baseName}-${timestamp}${extension}`
  }

  static logFileCreation(filePath, targetSizeMB) {
    const stats = fs.statSync(filePath)
    const actualSizeMB = stats.size / (1024 * 1024)
    logOperation(
      'File Generation',
      `Generated large file: ${filePath} (${actualSizeMB.toFixed(2)} MB)`
    )
  }
}
