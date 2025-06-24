export default class FileTypeModel {
  static generateFileType() {
    const fileTypes = ['Shapefile', 'KML']
    return fileTypes[Math.floor(Math.random() * fileTypes.length)]
  }

  static generateShapefile() {
    return 'Shapefile'
  }

  static generateKML() {
    return 'KML'
  }

  static getValidFileTypes() {
    return ['Shapefile', 'KML']
  }
}
