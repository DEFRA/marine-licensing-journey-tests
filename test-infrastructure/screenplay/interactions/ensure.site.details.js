import { expect } from 'chai'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await this.verifyMethodOfProvidingSiteLocationDisplayed(browseTheWeb, actor)
    await this.verifySiteDetailsAreDisplayed(browseTheWeb, actor)
  }

  async verifyMethodOfProvidingSiteLocationDisplayed(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    let expectedMethod

    if (siteDetails?.coordinatesEntryMethod === 'file-upload') {
      expectedMethod = 'Upload a file with the coordinates of the site'
    } else if (siteDetails?.siteType === 'circle') {
      expectedMethod =
        'Manually enter one set of coordinates and a width to create a circular site'
    } else if (siteDetails?.siteType === 'boundary') {
      expectedMethod =
        'Enter multiple sets of coordinates to mark the boundary of the site'
    } else {
      expect.fail(
        `Unable to determine expected method from actor's memory. Site details: ${JSON.stringify(siteDetails)}`
      )
    }

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.methodOfProvidingSiteLocationValue,
      expectedMethod
    )
  }

  async verifySiteDetailsAreDisplayed(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (siteDetails?.coordinatesEntryMethod === 'file-upload') {
      await this.verifyFileUploadSiteDetails(browseTheWeb, actor)
    } else {
      await this.verifyManualEntrySiteDetails(browseTheWeb, actor)
    }
  }

  async verifyFileUploadSiteDetails(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails
    const expectedFileType = siteDetails?.fileType

    if (!expectedFileType) {
      expect.fail(
        `Unable to determine expected file type from actor's memory. Site details: ${JSON.stringify(siteDetails)}`
      )
    }

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.fileTypeValue,
      expectedFileType
    )

    const fileUploadedElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.fileUploadedValue
    )
    const fileName = await fileUploadedElement.getText()

    if (!fileName || fileName.trim() === '') {
      expect.fail('Uploaded file name should be displayed but was empty')
    }

    await this.verifyExtractedCoordinates(browseTheWeb, actor)
  }

  async verifyManualEntrySiteDetails(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!siteDetails) {
      expect.fail(
        "Unable to determine expected coordinate entry details from actor's memory"
      )
    }

    await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.coordinateSystemValue)

    if (siteDetails.siteType === 'circle') {
      await browseTheWeb.isDisplayed(
        ReviewSiteDetailsPage.coordinatesAtCentreOfSiteValue
      )
      await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.widthValue)
    } else if (siteDetails.siteType === 'boundary') {
      await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.coordinatesValue)
    } else {
      expect.fail(`Unexpected site type: ${siteDetails.siteType}`)
    }
  }

  async verifyExtractedCoordinates(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const expectedCoordinates = exemption?.siteDetails?.expectedCoordinates

    if (!expectedCoordinates) {
      expect.fail(
        'No expected coordinates found in actor memory for verification'
      )
    }

    const actualCoordinatesElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.extractedCoordinatesValue
    )
    const actualCoordinatesText = await actualCoordinatesElement.getText()

    if (!actualCoordinatesText) {
      expect.fail('No extracted coordinates displayed on review page')
    }

    const actualCoordinates = JSON.parse(actualCoordinatesText.trim())

    expect(actualCoordinates).to.deep.equal(expectedCoordinates)
  }
}
