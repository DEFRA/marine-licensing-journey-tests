import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page.js'

export default class WhatCoordinateSystemPageInteractions {
  static async selectCoordinateSystemAndContinue(
    browseTheWeb,
    coordinateSystem
  ) {
    const selector =
      WhatCoordinateSystemPage.getCoordinateSystemSelector(coordinateSystem)
    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
  }

  static async selectWGS84(browseTheWeb) {
    await browseTheWeb.click(WhatCoordinateSystemPage.wgs84)
  }

  static async selectWGS84AndContinue(browseTheWeb) {
    await browseTheWeb.click(WhatCoordinateSystemPage.wgs84)
    await browseTheWeb.click(WhatCoordinateSystemPage.saveAndContinue)
  }

  static async selectOSGB36AndContinue(browseTheWeb) {
    await browseTheWeb.click(WhatCoordinateSystemPage.osgb36)
    await browseTheWeb.click(WhatCoordinateSystemPage.saveAndContinue)
  }
}
