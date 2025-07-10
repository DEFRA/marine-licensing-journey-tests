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
    const zipContent = this.createShapefileZipContent()
    return this.createFileWithContent(
      filePath,
      zipContent,
      'Shapefile',
      'valid'
    )
  }

  static generateVirusShapefile(filePath) {
    const zipContent = this.createShapefileZipContent('virus-shapefile')
    return this.createFileWithContent(
      filePath,
      zipContent,
      'Shapefile',
      'virus'
    )
  }

  static generateLargeShapefile(filePath, targetSizeMB = 51) {
    return this.createLargeFileWithContent(
      filePath,
      (size) => this.createLargeShapefileZipContent(size),
      targetSizeMB,
      'Shapefile'
    )
  }

  static generateEmptyShapefile(filePath) {
    return this.createEmptyFile(filePath, 'Shapefile')
  }

  static generateGenericErrorShapefile(filePath) {
    const zipContent = this.createShapefileZipContent('upload-error-trigger')
    return this.createFileWithContent(
      filePath,
      zipContent,
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
