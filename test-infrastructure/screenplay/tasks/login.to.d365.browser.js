import Task from '../base/task.js'

export default class LoginToD365Browser extends Task {
  static now() {
    return new LoginToD365Browser()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')

    if (!browseD365) {
      throw new Error('Actor must have BrowseD365 ability to login to D365')
    }

    const d365Url = process.env.D365_URL
    const userId = process.env.D365_USER_ID
    const password = process.env.D365_USER_PASSWORD

    if (!d365Url || !userId || !password) {
      throw new Error(
        'Missing required env vars: D365_URL, D365_USER_ID, D365_USER_PASSWORD'
      )
    }

    const page = await browseD365.launch()

    // Navigate to D365 — Microsoft will redirect to login page
    await page.goto(d365Url, { waitUntil: 'domcontentloaded' })

    // Enter email
    await page.locator('input[type="email"]').fill(userId)
    await page.locator('input[type="submit"]').click()

    // Enter password
    await page
      .locator('input[type="password"]')
      .waitFor({ state: 'visible', timeout: 15000 })
    await page.locator('input[type="password"]').fill(password)
    await page.locator('input[type="submit"]').click()

    // Handle "Stay signed in?" prompt — keep clicking until it disappears
    const staySignedInBtn = page.locator(
      'input[type="submit"][value="Yes"], input#idSIButton9'
    )
    try {
      await staySignedInBtn.waitFor({ state: 'visible', timeout: 10000 })
      await staySignedInBtn.click()
      await staySignedInBtn.waitFor({ state: 'hidden', timeout: 30000 })
    } catch {
      // Prompt not shown or already dismissed
    }

    // Wait for D365 to fully load
    await page.waitForURL(/.*crm11\.dynamics\.com.*/, { timeout: 60000 })

    await browseD365.takeScreenshot('D365 after browser login')
  }
}
