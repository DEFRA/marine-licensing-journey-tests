export default class DoYouNeedToTellUsAboutMoreThanOneSitePage {
  static no = '#multipleSitesEnabled-2'
  static yes = '#multipleSitesEnabled'
  static saveAndContinue = 'button[type="submit"]'

  static getMoreThanOneSiteSelector(moreThanOneSite) {
    if (moreThanOneSite === 'yes') return this.yes
    if (moreThanOneSite === 'no') return this.no
    return moreThanOneSite
  }
}
