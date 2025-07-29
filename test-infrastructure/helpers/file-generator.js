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
    // File code (9994)
    header.writeInt32BE(9994, 0)
    // File length in 16-bit words (header: 50 words + record: 14 words = 64 words total)
    header.writeInt32BE(64, 24)
    // Version
    header.writeInt32LE(1000, 28)
    // Shape type (1 = Point)
    header.writeInt32LE(1, 32)

    // Bounding box (using actual test coordinates)
    header.writeDoubleLE(-1.234567, 36) // Xmin
    header.writeDoubleLE(51.123456, 44) // Ymin
    header.writeDoubleLE(-1.234567, 52) // Xmax
    header.writeDoubleLE(51.123456, 60) // Ymax

    // Record header (8 bytes)
    const recordHeader = Buffer.alloc(8)
    recordHeader.writeInt32BE(1, 0) // Record number
    recordHeader.writeInt32BE(10, 4) // Content length in 16-bit words (20 bytes = 10 words)

    // Point record content (20 bytes)
    const pointRecord = Buffer.alloc(20)
    pointRecord.writeInt32LE(1, 0) // Shape type (Point)
    pointRecord.writeDoubleLE(-1.234567, 4) // X coordinate
    pointRecord.writeDoubleLE(51.123456, 12) // Y coordinate

    return Buffer.concat([header, recordHeader, pointRecord])
  }

  static createSHXContent() {
    const header = Buffer.alloc(100)
    // File code (9994)
    header.writeInt32BE(9994, 0)
    // File length in 16-bit words (header: 50 words + index record: 4 words = 54 words total)
    header.writeInt32BE(54, 24)
    // Version
    header.writeInt32LE(1000, 28)
    // Shape type (1 = Point)
    header.writeInt32LE(1, 32)

    // Bounding box (same as SHP file)
    header.writeDoubleLE(-1.234567, 36) // Xmin
    header.writeDoubleLE(51.123456, 44) // Ymin
    header.writeDoubleLE(-1.234567, 52) // Xmax
    header.writeDoubleLE(51.123456, 60) // Ymax

    // Index record (8 bytes)
    const record = Buffer.alloc(8)
    record.writeInt32BE(50, 0) // Offset to record in 16-bit words (after 100-byte header = 50 words)
    record.writeInt32BE(10, 4) // Content length in 16-bit words (20 bytes = 10 words)

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

      // Calculate CRC32 for the file content
      const crc32 = this.calculateCRC32(fileContent)

      const localHeader = Buffer.alloc(30 + fileName.length)
      localHeader.writeUInt32LE(0x04034b50, 0) // Local file header signature
      localHeader.writeUInt16LE(20, 4) // Version needed to extract
      localHeader.writeUInt16LE(0, 6) // General purpose bit flag
      localHeader.writeUInt16LE(0, 8) // Compression method (none)
      localHeader.writeUInt16LE(0, 10) // Last mod file time
      localHeader.writeUInt16LE(0, 12) // Last mod file date
      localHeader.writeUInt32LE(crc32, 14) // CRC-32
      localHeader.writeUInt32LE(fileContent.length, 18) // Compressed size
      localHeader.writeUInt32LE(fileContent.length, 22) // Uncompressed size
      localHeader.writeUInt16LE(fileName.length, 26) // File name length
      localHeader.writeUInt16LE(0, 28) // Extra field length
      fileName.copy(localHeader, 30)

      zipData.push(localHeader)
      zipData.push(fileContent)

      const centralEntry = Buffer.alloc(46 + fileName.length)
      centralEntry.writeUInt32LE(0x02014b50, 0) // Central directory header signature
      centralEntry.writeUInt16LE(20, 4) // Version made by
      centralEntry.writeUInt16LE(20, 6) // Version needed to extract
      centralEntry.writeUInt16LE(0, 8) // General purpose bit flag
      centralEntry.writeUInt16LE(0, 10) // Compression method
      centralEntry.writeUInt16LE(0, 12) // Last mod file time
      centralEntry.writeUInt16LE(0, 14) // Last mod file date
      centralEntry.writeUInt32LE(crc32, 16) // CRC-32
      centralEntry.writeUInt32LE(fileContent.length, 20) // Compressed size
      centralEntry.writeUInt32LE(fileContent.length, 24) // Uncompressed size
      centralEntry.writeUInt16LE(fileName.length, 28) // File name length
      centralEntry.writeUInt16LE(0, 30) // Extra field length
      centralEntry.writeUInt16LE(0, 32) // File comment length
      centralEntry.writeUInt16LE(0, 34) // Disk number start
      centralEntry.writeUInt16LE(0, 36) // Internal file attributes
      centralEntry.writeUInt32LE(0, 38) // External file attributes
      centralEntry.writeUInt32LE(offset, 42) // Relative offset of local header
      fileName.copy(centralEntry, 46)

      centralDir.push(centralEntry)
      offset += localHeader.length + fileContent.length
    }

    const centralDirData = Buffer.concat(centralDir)

    const endOfCentralDir = Buffer.alloc(22)
    endOfCentralDir.writeUInt32LE(0x06054b50, 0) // End of central dir signature
    endOfCentralDir.writeUInt16LE(0, 4) // Number of this disk
    endOfCentralDir.writeUInt16LE(0, 6) // Disk where central directory starts
    endOfCentralDir.writeUInt16LE(files.length, 8) // Number of central directory records on this disk
    endOfCentralDir.writeUInt16LE(files.length, 10) // Total number of central directory records
    endOfCentralDir.writeUInt32LE(centralDirData.length, 12) // Size of central directory
    endOfCentralDir.writeUInt32LE(offset, 16) // Offset of start of central directory
    endOfCentralDir.writeUInt16LE(0, 20) // ZIP file comment length

    return Buffer.concat([...zipData, centralDirData, endOfCentralDir])
  }

  static calculateCRC32(buffer) {
    // CRC32 polynomial: 0xEDB88320 (reversed IEEE 802.3)
    const crcTable = []
    for (let i = 0; i < 256; i++) {
      let crc = i
      for (let j = 0; j < 8; j++) {
        crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
      }
      crcTable[i] = crc
    }

    let crc = 0xffffffff
    for (let i = 0; i < buffer.length; i++) {
      const byte = buffer[i]
      crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
    }
    return (crc ^ 0xffffffff) >>> 0 // Convert to unsigned 32-bit
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
