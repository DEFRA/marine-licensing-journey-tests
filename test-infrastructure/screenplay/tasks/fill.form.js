import Task from '../base/task.js'

export default class FillForm extends Task {
  static withInteractions(formFiller) {
    return new FillForm(formFiller)
  }

  static publicRegisterWithhold(reason) {
    return new FillForm(async (actor) => {
      const PublicRegisterPage = (
        await import('~/test-infrastructure/pages/public.register.page')
      ).default
      const browseTheWeb = actor.ability

      await browseTheWeb.click(PublicRegisterPage.withhold)

      if (reason && reason.length > 0) {
        await browseTheWeb.sendKeys(PublicRegisterPage.withholdReason, reason)
      }
    })
  }

  static chooseToEnterCoordinatesManually() {
    return new FillForm(async (actor) => {
      const HowDoYouWantToProvideCoordinatesPage = (
        await import(
          '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
        )
      ).default
      const browseTheWeb = actor.ability

      await browseTheWeb.click(
        HowDoYouWantToProvideCoordinatesPage.enterCoordinates
      )
    })
  }

  static provideASinglePointForACircularSite() {
    return new FillForm(async (actor) => {
      const HowDoYouWantToEnterTheCoordinatesPage = (
        await import(
          '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'
        )
      ).default
      const browseTheWeb = actor.ability

      await browseTheWeb.click(
        HowDoYouWantToEnterTheCoordinatesPage.circularSite
      )
    })
  }

  static selectWGS84CoordinateSystem() {
    return new FillForm(async (actor) => {
      const WhatCoordinateSystemPage = (
        await import('~/test-infrastructure/pages/what.coordinate.system.page')
      ).default
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
