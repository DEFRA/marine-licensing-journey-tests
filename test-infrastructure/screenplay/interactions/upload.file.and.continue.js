import Task from '../base/task.js'
import UploadFile from './upload.file.js'

export default class UploadFileAndContinue extends Task {
  static withPath(filePath) {
    return new UploadFileAndContinue(filePath)
  }

  constructor(filePath) {
    super()
    this.filePath = filePath
  }

  async performAs(actor) {
    await actor.attemptsTo(UploadFile.withPath(this.filePath))
    await actor.ability.clickSubmit()
  }
}
