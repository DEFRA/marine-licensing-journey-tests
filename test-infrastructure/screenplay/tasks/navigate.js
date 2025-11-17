import { expect } from 'chai'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import { constructIatUrl } from '../../helpers/iat-url-builder.js'
import Task from '../base/task.js'
import AuthenticateWithAPermanentUser from '../interactions/authenticate.with.a.permanent.user.js'
import AuthenticateWith from '../interactions/authenticate.with.js'
import HandleCookieBanner from '../interactions/handle.cookie.banner.js'

export default class Navigate extends Task {
  static now() {
    return new Navigate(ProjectNamePage.url)
  }

  static toTheMarineLicensingApp() {
    return new Navigate(ProjectNamePage.url)
  }

  static toProjectNamePage() {
    return new Navigate(ProjectNamePage.url)
  }

  constructor(url) {
    super()
    this.url = url
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    let finalUrl

    if (Object.prototype.hasOwnProperty.call(exemption, 'rawIatQueryString')) {
      const baseUrlFromPage = ProjectNamePage.url
      finalUrl = exemption.rawIatQueryString
        ? `${baseUrlFromPage}?${exemption.rawIatQueryString}`
        : baseUrlFromPage
    } else if (exemption?.iatContext) {
      finalUrl = constructIatUrl(this.url, exemption.iatContext)
    } else {
      expect.fail(
        'Navigate task requires exemption with iatContext to be present in actor memory'
      )
    }

    actor.remembers('navigationUrl', finalUrl)

    // Handle authentication based on environment
    if (process.env.ENVIRONMENT === 'test') {
      await this.authenticateWithRealDefraId(actor, finalUrl)
    } else {
      await this.authenticateWithDefraIdStub(actor, finalUrl)
    }
  }

  async authenticateWithRealDefraId(actor, finalUrl) {
    await actor.ability.navigateTo(finalUrl)
    if (!actor.hasMemoryOf('isAuthenticated')) {
      await actor.attemptsTo(AuthenticateWithAPermanentUser.now())
      actor.remembers('isAuthenticated', true)
      await actor.attemptsTo(HandleCookieBanner.now())
    }
  }

  async authenticateWithDefraIdStub(actor, finalUrl) {
    if (!actor.hasMemoryOf('testUser')) {
      const testUser = await actor.ability.registerTestUser(actor.name)
      actor.remembers('testUser', testUser)
    }
    await actor.ability.navigateTo(finalUrl)
    if (!actor.hasMemoryOf('isAuthenticated')) {
      await actor.attemptsTo(AuthenticateWith.theTestUser())
      actor.remembers('isAuthenticated', true)
      await actor.attemptsTo(HandleCookieBanner.now())
    }
  }
}
