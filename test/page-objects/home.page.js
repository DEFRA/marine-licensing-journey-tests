import { Page } from 'page-objects/page'

export class HomePage extends Page {
  async open() {
    return await super.open('')
  }
}

export default new HomePage()
