import { expect } from 'chai'
import Task from '../base/task.js'
import { WhichTypeOfFileDoYouWantToUploadPageInteractions } from '../page-interactions/index.js'

export default class SelectFileType extends Task {
  static shapefile() {
    return new SelectFileType('shapefile')
  }

  static kml() {
    return new SelectFileType('kml')
  }

  constructor(action) {
    super()
    this.action = action
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.action) {
      case 'shapefile':
        await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
          browseTheWeb,
          'Shapefile'
        )
        break
      case 'kml':
        await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
          browseTheWeb,
          'KML'
        )
        break
      case 'continue-without-selection':
        await WhichTypeOfFileDoYouWantToUploadPageInteractions.clickContinue(
          browseTheWeb
        )
        break
      default:
        expect.fail(`Unknown file type action: ${this.action}`)
    }
  }
}
