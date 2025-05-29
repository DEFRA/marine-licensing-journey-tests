import Task from '../base/task.js'

export default class FillForm extends Task {
  static withInteractions(formFiller) {
    return new FillForm(formFiller)
  }

  static async _importPage(pagePath) {
    return (await import(pagePath)).default
  }

  static _createClickHandler(pagePath, selector, additionalActions = null) {
    return async (actor) => {
      const page = await this._importPage(pagePath)
      const browseTheWeb = actor.ability

      await browseTheWeb.click(page[selector])

      if (additionalActions) {
        await additionalActions(actor, browseTheWeb, page)
      }
    }
  }

  static publicRegisterWithhold(reason) {
    return new FillForm(
      this._createClickHandler(
        '~/test-infrastructure/pages/public.register.page',
        'withhold',
        async (actor, browseTheWeb, page) => {
          if (reason && reason.length > 0) {
            return await browseTheWeb.sendKeys(page.withholdReason, reason)
          }
        }
      )
    )
  }

  static chooseToEnterCoordinatesManually() {
    return new FillForm(
      this._createClickHandler(
        '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page',
        'enterCoordinates'
      )
    )
  }

  static provideASinglePointForACircularSite() {
    return new FillForm(
      this._createClickHandler(
        '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js',
        'circularSite'
      )
    )
  }

  static selectWGS84CoordinateSystem() {
    return new FillForm(
      this._createClickHandler(
        '~/test-infrastructure/pages/what.coordinate.system.page',
        'wgs84'
      )
    )
  }

  constructor(formFiller) {
    super()
    this.formFiller = formFiller
  }

  async performAs(actor) {
    await this.formFiller(actor)
  }
}
