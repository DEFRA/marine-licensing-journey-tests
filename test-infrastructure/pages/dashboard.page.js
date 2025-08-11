export default class DashboardPage {
  static url = '/home'

  static locators = {
    pageHeading: 'h1',
    projectsHomeLink: '//a[normalize-space(text())="Projects home"]',
    emptyStateMessage:
      '//p[contains(text(), "You currently have no projects.")]',
    projectsTable: 'table.govuk-table',
    tableHeaders: {
      name: '//th[contains(text(), "Name")]',
      type: '//th[contains(text(), "Type")]',
      reference: '//th[contains(text(), "Reference")]',
      status: '//th[contains(text(), "Status")]',
      dateSubmitted: '//th[contains(text(), "Date submitted")]',
      actions: '//th[contains(text(), "Actions")]'
    },
    tableRows: 'tbody tr',
    firstRowCells: {
      name: 'tbody tr:nth-child(1) td:nth-child(1)',
      type: 'tbody tr:nth-child(1) td:nth-child(2)',
      reference: 'tbody tr:nth-child(1) td:nth-child(3)',
      status: 'tbody tr:nth-child(1) td:nth-child(4)',
      dateSubmitted: 'tbody tr:nth-child(1) td:nth-child(5)',
      actions: 'tbody tr:nth-child(1) td:nth-child(6)'
    }
  }

  static continueLink(projectName) {
    return `//tr[td[1][normalize-space(text())="${projectName}"]]//a[@aria-label="Continue to task list"]`
  }

  static deleteLink(projectName) {
    return `//tr[td[1][normalize-space(text())="${projectName}"]]//a[normalize-space(text())="Delete"]`
  }

  static projectRow(projectName) {
    return `//tr[td[1][normalize-space(text())="${projectName}"]]`
  }
}
