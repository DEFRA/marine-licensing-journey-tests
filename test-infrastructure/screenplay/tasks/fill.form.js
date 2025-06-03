import Task from '../base/task.js'

import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page'

export default class FillForm extends Task {
  static withInteractions(formFiller) {
    return new FillForm(formFiller)
  }

  static activityDescription(description) {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability

      if (description && description.length > 0) {
        await browseTheWeb.sendKeys(
          ActivityDescriptionPage.activityDescriptionInput,
          description
        )
      }
    })
  }

  static publicRegisterWithhold(reason) {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability

      await browseTheWeb.click(PublicRegisterPage.withhold)

      if (reason && reason.length > 0) {
        await browseTheWeb.sendKeys(PublicRegisterPage.withholdReason, reason)
      }
    })
  }

  static chooseToEnterCoordinatesManually() {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability
      await browseTheWeb.click(
        HowDoYouWantToProvideCoordinatesPage.enterCoordinates
      )
    })
  }

  static provideASinglePointForACircularSite() {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability
      await browseTheWeb.click(
        HowDoYouWantToEnterTheCoordinatesPage.circularSite
      )
    })
  }

  static selectWGS84CoordinateSystem() {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability
      await browseTheWeb.click(WhatCoordinateSystemPage.wgs84)
    })
  }

  constructor(formFiller) {
    super()
    this.formFiller = formFiller
  }

  async performAs(actor) {
    await this.formFiller(actor)
  }
}
