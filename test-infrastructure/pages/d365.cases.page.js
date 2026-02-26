export default class D365CasesPage {
  static locators = {
    searchInput: '#SearchBoxWithTypeAhead-input',
    casesGrid: 'div[role="treegrid"][aria-label="Completed Cases"]',
    refreshButton: 'button[aria-label="Refresh"]'
  }

  static gridCell(colId) {
    return `div[role="gridcell"][col-id="${colId}"]`
  }

  static gridCellLabel(colId) {
    return `div[role="gridcell"][col-id="${colId}"] label`
  }

  static gridCellLink(colId) {
    return `div[role="gridcell"][col-id="${colId}"] a`
  }
}
