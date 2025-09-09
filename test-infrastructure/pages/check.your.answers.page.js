import NotificationSummaryBasePage from './notification.summary.base.page.js'

export default class CheckYourAnswersPage extends NotificationSummaryBasePage {
  static url = '/exemption/check-your-answers'

  static locators = {
    // Inherit all shared locators
    ...NotificationSummaryBasePage.sharedLocators,

    // Check Your Answers specific locators
    mainHeading: 'h2#check-your-answers-heading',

    // Override inherited locators to add change links
    projectDetails: {
      ...NotificationSummaryBasePage.sharedLocators.projectDetails,
      changeLink: '//a[contains(@href, "project-name")]'
    },

    activityDates: {
      ...NotificationSummaryBasePage.sharedLocators.activityDates,
      changeLink: '//a[contains(@href, "activity-dates")]'
    },

    activityDetails: {
      ...NotificationSummaryBasePage.sharedLocators.activityDetails,
      changeLink: '//a[contains(@href, "activity-description")]'
    },

    siteDetails: {
      ...NotificationSummaryBasePage.sharedLocators.siteDetails,
      changeLink: '//a[contains(@href, "coordinates")]'
    },

    publicRegister: {
      ...NotificationSummaryBasePage.sharedLocators.publicRegister,
      changeLink: '//a[contains(@href, "public-register")]'
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
}
