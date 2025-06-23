export default class CheckYourAnswersPage {
  static url = '/exemption/check-your-answers'

  // Main heading
  static getMainHeading() {
    return 'h2#check-your-answers-heading'
  }

  // Project details section
  static getProjectDetailsSection() {
    return {
      heading: 'h2:has-text("Project details")',
      projectName: {
        term: 'dt:has-text("Project name")',
        value: 'dt:has-text("Project name") + dd'
      },
      changeLink: 'a:has-text("Change (Project details)")'
    }
  }

  // Activity dates section
  static getActivityDatesSection() {
    return {
      heading: 'h2:has-text("Activity dates")',
      startDate: {
        term: 'dt:has-text("Start date")',
        value: 'dt:has-text("Start date") + dd'
      },
      endDate: {
        term: 'dt:has-text("End date")',
        value: 'dt:has-text("End date") + dd'
      },
      changeLink: 'a:has-text("Change (Activity dates)")'
    }
  }

  // Activity details section
  static getActivityDetailsSection() {
    return {
      heading: 'h2:has-text("Activity details")',
      activityDescription: {
        term: 'dt:has-text("Activity description")',
        value: 'dt:has-text("Activity description") + dd'
      },
      typeOfActivity: {
        term: 'dt:has-text("Type of activity")',
        value: 'dt:has-text("Type of activity") + dd'
      },
      purposeOfActivity: {
        term: 'dt:has-text("The purpose of the activity")',
        value: 'dt:has-text("The purpose of the activity") + dd'
      },
      whatActivityInvolves: {
        term: 'dt:has-text("What the activity involves")',
        value: 'dt:has-text("What the activity involves") + dd'
      },
      whyActivityExempt: {
        term: 'dt:has-text("Why this activity is exempt")',
        value: 'dt:has-text("Why this activity is exempt") + dd'
      },
      changeActivityDescriptionLink: 'a:has-text("Change activity description")'
    }
  }

  // Site details section
  static getSiteDetailsSection() {
    return {
      heading: 'h2:has-text("Site details")',
      coordinatesType: {
        term: 'dt:has-text("Coordinates type")',
        value: 'dt:has-text("Coordinates type") + dd'
      },
      coordinatesEntry: {
        term: 'dt:has-text("Coordinates Entry")',
        value: 'dt:has-text("Coordinates Entry") + dd'
      },
      coordinatesSystem: {
        term: 'dt:has-text("Coordinates system")',
        value: 'dt:has-text("Coordinates system") + dd'
      },
      coordinates: {
        term: 'dt:has-text("Coordinates")',
        value: 'dt:has-text("Coordinates") + dd'
      },
      circleWidth: {
        term: 'dt:has-text("Circle width")',
        value: 'dt:has-text("Circle width") + dd'
      },
      changeLink: 'a:has-text("Change (Site details)")'
    }
  }

  // Public register section
  static getPublicRegisterSection() {
    return {
      heading: 'h2:has-text("Public register")',
      informationWithheld: {
        term: 'dt:has-text("Information withheld from public register")',
        value: 'dt:has-text("Information withheld from public register") + dd'
      },
      changeLink: 'a:has-text("Change (Public register)")'
    }
  }

  // Submission section
  static getSubmissionSection() {
    return {
      heading: 'h2:has-text("Now send your information")',
      confirmButton: 'button:has-text("Confirm and send")'
    }
  }

  // Generic selectors for validation
  static getAllSummaryCards() {
    return '.govuk-summary-card'
  }

  static getAllDefinitionLists() {
    return 'dl'
  }

  static getAllTerms() {
    return 'dt'
  }

  static getAllDefinitions() {
    return 'dd'
  }
}
