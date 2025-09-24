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
}
