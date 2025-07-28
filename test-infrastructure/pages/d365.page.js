export default class D365Page {
  static getUrl(browser) {
    return browser.options.d365Url
  }

  // D365 CRM case record field selectors
  static exemptionReferenceField = 'input[aria-label="Reference"]'
  static projectNameField = 'input[aria-label="Project Name"]'
  static typeField = 'input[aria-label="Type"]'
  static submittedDateField = 'input[aria-label="Date of Submitted Date"]'

  // Grid selectors
  static getCaseRecordLink(reference) {
    return `//*[@role="row"][.//text()[contains(., "${reference}")]]//a[contains(@href, "entityrecord") and contains(@href, "etn=incident")]`
  }
}
