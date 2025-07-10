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
      name: 'tbody tr:first-child td:nth-child(1)',
      type: 'tbody tr:first-child td:nth-child(2)',
      reference: 'tbody tr:first-child td:nth-child(3)',
      status: 'tbody tr:first-child td:nth-child(4)',
      dateSubmitted: 'tbody tr:first-child td:nth-child(5)',
      actions: 'tbody tr:first-child td:nth-child(6)'
    }
  }
}
