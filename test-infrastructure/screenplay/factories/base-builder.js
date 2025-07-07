export default class BaseBuilder {
  constructor(data) {
    this.data = { ...data }
  }

  getData() {
    return this.data
  }

  setProperty(path, value) {
    return this._setPropertyWithTraversal(path, value, true)
  }

  setSafeProperty(path, value) {
    return this._setPropertyWithTraversal(path, value, false)
  }

  _setPropertyWithTraversal(path, value, createPath) {
    const pathArray = path.split('.')
    let current = this.data

    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i]
      if (!current[key]) {
        if (createPath) {
          current[key] = {}
        } else {
          return this
        }
      }
      current = current[key]
    }

    const finalKey = pathArray[pathArray.length - 1]
    current[finalKey] = value
    return this
  }

  setTaskCompleted(taskName, completed = true) {
    return this.setProperty(`${taskName}TaskCompleted`, completed)
  }

  extend(extensionName, extensionObject) {
    if (!this._extensions) {
      this._extensions = {}
    }
    this._extensions[extensionName] = extensionObject
    return this
  }

  getExtension(extensionName) {
    return this._extensions?.[extensionName]
  }
}
