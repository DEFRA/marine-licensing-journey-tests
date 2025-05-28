export default class WhatCoordinateSystemPage {
  static wgs84 = '#coordinateSystem'
  static osgb36 = '#coordinateSystem-2'
  static saveAndContinue = 'button[type="submit"]'

  static getCoordinateSystemSelector(system) {
    if (system === 'WGS84') return this.wgs84
    if (system === 'OSGB36') return this.osgb36
    return system
  }
}
