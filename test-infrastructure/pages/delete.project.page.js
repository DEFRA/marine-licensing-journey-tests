export default class DeleteProjectPage {
  static url = '/delete'

  static locators = {
    pageHeading: 'h1',
    projectName: 'body',
    deleteButton: '//button[normalize-space(text())="Yes, delete project"]',
    cancelLink: '//a[normalize-space(text())="Cancel"]',
    backLink: '//a[normalize-space(text())="Back"]'
  }
}
