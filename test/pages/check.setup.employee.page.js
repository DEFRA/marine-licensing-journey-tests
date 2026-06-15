// "Can you sign in to your organisation's Defra account?" check-setup page,
// reached for the organisation flow before the confirm-employee page.
export default class CheckSetupEmployeePage {
  constructor(page) {
    this.page = page
    this.yesCanSignInRadio = page.locator('#checkSetupEmployee')
    this.createNewAccountRadio = page.locator('#checkSetupEmployee-2')
    this.needToBeAddedRadio = page.locator('#checkSetupEmployee-3')
  }

  async selectYesCanSignIn() {
    await this.yesCanSignInRadio.click()
  }

  async selectCreateNewAccount() {
    await this.createNewAccountRadio.click()
  }

  async selectNeedToBeAdded() {
    await this.needToBeAddedRadio.click()
  }
}
