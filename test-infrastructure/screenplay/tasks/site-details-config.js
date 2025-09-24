export class SiteDetailsConfig {
  constructor(options = {}) {
    this.saveAndContinue = options.saveAndContinue ?? false
    this.coordinatesOnly = options.coordinatesOnly ?? false
    this.useAddAnotherPoint = options.useAddAnotherPoint ?? false
    this.toReviewOnly = options.toReviewOnly ?? false
  }

  static withSaveAndContinue() {
    return new SiteDetailsConfig({ saveAndContinue: true })
  }

  static coordinatesOnly() {
    return new SiteDetailsConfig({ coordinatesOnly: true })
  }

  static coordinatesWithAddAnotherPoint() {
    return new SiteDetailsConfig({
      coordinatesOnly: true,
      useAddAnotherPoint: true
    })
  }

  static toReviewOnly() {
    return new SiteDetailsConfig({ toReviewOnly: true })
  }
}
