import Task from '../base/task.js'

export default class SignOut extends Task {
  static now() {
    return new SignOut()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Click the "Sign out" link in the navigation
    await browseTheWeb.click('a[href="/sign-out"]')
  }
}
