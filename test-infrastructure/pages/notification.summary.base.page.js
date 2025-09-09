/**
 * Base page object for notification summary pages (Check Your Answers, View Details)
 * Contains shared locators for the common summary card components
 */
export default class NotificationSummaryBasePage {
  static sharedLocators = {
    projectSummary: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Project summary")]',
      projectNameTerm: '//dt[contains(text(), "Project name")]',
      projectNameValue:
        '//dt[contains(text(), "Project name")]/following-sibling::dd[1]',
      activityTypeTerm: '//dt[contains(text(), "Type of activity")]',
      activityTypeValue:
        '//dt[contains(text(), "Type of activity")]/following-sibling::dd[1]',
      exemptionReasonTerm:
        '//dt[contains(text(), "Why this activity is exempt")]',
      exemptionReasonValue:
        '//dt[contains(text(), "Why this activity is exempt")]/following-sibling::dd[1]',
      exemptionReasonLink:
        '//dt[contains(text(), "Why this activity is exempt")]/following-sibling::dd[1]//a',
      pdfDownloadTerm: '//dt[contains(text(), "Your answers from")]',
      pdfDownloadValue:
        '//dt[contains(text(), "Your answers from")]/following-sibling::dd[1]',
      pdfDownloadLink:
        '//dt[contains(text(), "Your answers from")]/following-sibling::dd[1]//a'
    },

    projectDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Project details")]',
      projectNameTerm: '//dt[contains(text(), "Project name")]',
      projectNameValue:
        '//dt[contains(text(), "Project name")]/following-sibling::dd[1]'
    },

    activityDates: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity dates")]',
      startDateTerm: '//dt[contains(text(), "Start date")]',
      startDateValue:
        '//dt[contains(text(), "Start date")]/following-sibling::dd[1]',
      endDateTerm: '//dt[contains(text(), "End date")]',
      endDateValue:
        '//dt[contains(text(), "End date")]/following-sibling::dd[1]'
    },

    activityDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity details")]',
      activityDescriptionTerm: '//dt[contains(text(), "Activity description")]',
      activityDescriptionValue:
        '//dt[contains(text(), "Activity description")]/following-sibling::dd[1]'
    },

    siteDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Site details")]',
      coordinatesTypeTerm: '//dt[contains(text(), "Coordinates type")]',
      coordinatesTypeValue:
        '//dt[contains(text(), "Coordinates type")]/following-sibling::dd[1]',
      coordinatesEntryTerm: '//dt[contains(text(), "Coordinates Entry")]',
      coordinatesEntryValue:
        '//dt[contains(text(), "Coordinates Entry")]/following-sibling::dd[1]',
      coordinateSystemTerm: '//dt[contains(text(), "Coordinate system")]',
      coordinateSystemValue:
        '//dt[contains(text(), "Coordinate system")]/following-sibling::dd[1]',
      coordinatesTerm: '//dt[contains(text(), "Coordinates")]',
      coordinatesValue:
        '//dt[contains(text(), "Coordinates")]/following-sibling::dd[1]',
      circleWidthTerm: '//dt[contains(text(), "Circle width")]',
      circleWidthValue:
        '//dt[contains(text(), "Circle width")]/following-sibling::dd[1]',
      methodOfProvidingSiteLocationTerm:
        '//dt[contains(text(), "Method of providing site location")]',
      methodOfProvidingSiteLocationValue:
        '//dt[contains(text(), "Method of providing site location")]/following-sibling::dd[1]',
      coordinatesAtCentreTerm:
        '//dt[contains(text(), "Coordinates at centre of site")]',
      coordinatesAtCentreValue:
        '//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd[1]',
      widthOfCircularSiteTerm:
        '//dt[contains(text(), "Width of circular site")]',
      widthOfCircularSiteValue:
        '//dt[contains(text(), "Width of circular site")]/following-sibling::dd[1]',
      fileTypeTerm: '//dt[contains(text(), "File type")]',
      fileTypeValue:
        '//dt[contains(text(), "File type")]/following-sibling::dd[1]',
      fileUploadedTerm: '//dt[contains(text(), "File uploaded")]',
      fileUploadedValue:
        '//dt[contains(text(), "File uploaded")]/following-sibling::dd[1]'
    },

    publicRegister: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Public register")]',
      informationWithheldTerm:
        '//dt[contains(text(), "Information withheld from public register")]',
      informationWithheldValue:
        '//dt[contains(text(), "Information withheld from public register")]/following-sibling::dd[1]'
    },

    // Common submission details locators
    applicationReference:
      '//dt[contains(text(), "Reference")]/following-sibling::dd[1] | //*[contains(@class, "govuk-panel__body")]//strong | //*[contains(@class, "govuk-body")]//strong',
    submissionDate:
      '//dt[contains(text(), "Date submitted")]/following-sibling::dd[1] | //p[contains(text(), "submitted on")]'
  }
}
