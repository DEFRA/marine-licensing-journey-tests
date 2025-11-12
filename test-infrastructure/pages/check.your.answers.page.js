import NotificationSummaryBasePage from './notification.summary.base.page.js'

export default class CheckYourAnswersPage extends NotificationSummaryBasePage {
  static url = '/exemption/check-your-answers'

  static locators = {
    // Inherit all shared locators
    ...NotificationSummaryBasePage.sharedLocators,

    // Check Your Answers specific locators
    mainHeading: 'h2#check-your-answers-heading',

    // Override inherited locators to add change links
    projectSummary: {
      ...NotificationSummaryBasePage.sharedLocators.projectSummary,
      changeLink:
        '//h2[contains(text(), "Project summary")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(text(), "Project name")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    },

    activityDates: {
      ...NotificationSummaryBasePage.sharedLocators.activityDates,
      changeLink:
        '//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(text(), "Activity dates")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    },

    activityDetails: {
      ...NotificationSummaryBasePage.sharedLocators.activityDetails,
      changeLink:
        '//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(text(), "Activity description")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    },

    providingSiteLocation: {
      ...NotificationSummaryBasePage.sharedLocators.providingSiteLocation,
      changeLink:
        '//h2[contains(text(), "Providing the site location")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[text()="Change"]'
    },

    siteDetails: {
      ...NotificationSummaryBasePage.sharedLocators.siteDetails,
      changeLink:
        '//h2[contains(text(), "Site details")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[text()="Change"]'
    },

    publicRegister: {
      ...NotificationSummaryBasePage.sharedLocators.publicRegister,
      changeLink:
        '//h2[contains(text(), "Sharing your project information publicly") or contains(text(), "Sharing your information publicly")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[text()="Change"]'
    },

    submission: {
      heading:
        '//h2[contains(@class, "govuk-heading-m") and contains(text(), "Now send your information")]',
      confirmAndSendButton: 'button[type="submit"]',
      declarationCheckbox: '#confirm-declaration'
    },

    generic: {
      allHeadings: 'h1, h2',
      allChangeLinks: '//a[contains(text(), "Change")]',
      allTerms: 'dt',
      allValues: 'dd'
    }
  }

  static getSiteDetailsCardChangeLink(siteNumber, totalSites = 1) {
    const isSingleSite = totalSites === 1
    const cardHeading = isSingleSite
      ? 'Site details'
      : `Site ${siteNumber} details`
    return `//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "${cardHeading}")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Change")]`
  }

  static getActivityDetailsCardChangeLink() {
    return `//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Change")]`
  }
}
