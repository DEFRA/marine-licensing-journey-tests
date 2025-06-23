export default class CheckYourAnswersPage {
  static url = '/exemption/check-your-answers'

  static locators = {
    // Main heading
    mainHeading: 'h2#check-your-answers-heading',

    // Project details section
    projectDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Project details")]',
      projectNameTerm: '//dt[contains(text(), "Project name")]',
      projectNameValue:
        '//dt[contains(text(), "Project name")]/following-sibling::dd[1]',
      changeLink: '//a[contains(@href, "project-name")]'
    },

    // Activity dates section
    activityDates: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity dates")]',
      startDateTerm: '//dt[contains(text(), "Start date")]',
      startDateValue:
        '//dt[contains(text(), "Start date")]/following-sibling::dd[1]',
      endDateTerm: '//dt[contains(text(), "End date")]',
      endDateValue:
        '//dt[contains(text(), "End date")]/following-sibling::dd[1]',
      changeLink: '//a[contains(@href, "activity-dates")]'
    },

    // Activity details section
    activityDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity details")]',
      activityDescriptionTerm: '//dt[contains(text(), "Activity description")]',
      activityDescriptionValue:
        '//dt[contains(text(), "Activity description")]/following-sibling::dd[1]',
      changeLink: '//a[contains(@href, "activity-description")]'
    },

    // Site details section
    siteDetails: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Site details")]',
      coordinatesTypeTerm: '//dt[contains(text(), "Coordinates type")]',
      coordinatesTypeValue:
        '//dt[contains(text(), "Coordinates type")]/following-sibling::dd[1]',
      coordinatesEntryTerm: '//dt[contains(text(), "Coordinates Entry")]',
      coordinatesEntryValue:
        '//dt[contains(text(), "Coordinates Entry")]/following-sibling::dd[1]',
      coordinateSystemTerm: '//dt[contains(text(), "Coordinates system")]',
      coordinateSystemValue:
        '//dt[contains(text(), "Coordinates system")]/following-sibling::dd[1]',
      coordinatesTerm: '//dt[contains(text(), "Coordinates")]',
      coordinatesValue:
        '//dt[contains(text(), "Coordinates")]/following-sibling::dd[1]',
      circleWidthTerm: '//dt[contains(text(), "Circle width")]',
      circleWidthValue:
        '//dt[contains(text(), "Circle width")]/following-sibling::dd[1]',
      changeLink: '//a[contains(@href, "coordinates")]'
    },

    // Public register section
    publicRegister: {
      heading:
        '//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Public register")]',
      informationWithheldTerm:
        '//dt[contains(text(), "Information withheld from public register")]',
      informationWithheldValue:
        '//dt[contains(text(), "Information withheld from public register")]/following-sibling::dd[1]',
      changeLink: '//a[contains(@href, "public-register")]'
    },

    // Submission section
    submission: {
      heading:
        '//h2[contains(@class, "govuk-heading-m") and contains(text(), "Now send your information")]',
      submitButton: 'button[type="submit"]',
      declarationCheckbox: '#confirm-declaration'
    },

    // Generic selectors
    generic: {
      allHeadings: 'h1, h2',
      allChangeLinks: '//a[contains(text(), "Change")]',
      allTerms: 'dt',
      allValues: 'dd'
    }
  }
}
