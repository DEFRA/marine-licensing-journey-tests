export default class Task {
  /**
   * Executes the task using the given actor.
   * This method should be overridden by subclasses.
   * @param {Actor} actor - The actor performing the task.
   * @returns {Promise<void>} A promise that resolves when the task is complete.
   * @throws {Error} Throws an error if not implemented in a subclass.
   */
  async performAs(actor) {
    throw new Error(
      'Tasks and interactions must implement the performAs method.'
    )
  }
}
