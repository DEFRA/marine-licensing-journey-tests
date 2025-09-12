import { expect } from 'chai'
import { attachJson } from '~/test-infrastructure/capture'
import Task from '../base/task.js'

export default class EnsureAnalyticsCookiesSet extends Task {
  static areEnabled() {
    return new EnsureAnalyticsCookiesSet(true)
  }

  static areDisabled() {
    return new EnsureAnalyticsCookiesSet(false)
  }

  constructor(analyticsEnabled = true) {
    super()
    this.analyticsEnabled = analyticsEnabled
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectCookieToExist('cookies_policy')

    await browseTheWeb.expectCookieToHaveValue(
      'cookies_preferences_set',
      'true'
    )

    const cookiesPolicyCookie =
      await browseTheWeb.expectCookieToExist('cookies_policy')

    const decodedValue = Buffer.from(
      cookiesPolicyCookie.value,
      'base64'
    ).toString('utf-8')
    const policyData = JSON.parse(decodedValue)

    attachJson(policyData, 'Cookie Policy Data')

    expect(
      policyData.analytics,
      `Analytics cookies should be ${this.analyticsEnabled ? 'accepted' : 'rejected'}`
    ).to.equal(this.analyticsEnabled)

    expect(
      policyData.essential,
      'Essential cookies should always be enabled'
    ).to.equal(true)
  }
}
