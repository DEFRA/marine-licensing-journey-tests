export default class Task {
  async performAs(actor) {
    throw new Error(
      'Tasks and interactions must implement the performAs method.'
    )
  }
}
