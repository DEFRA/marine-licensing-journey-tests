import { expect } from 'chai'

export default class ExemptionData {
  constructor(initialData) {
    this._data = { ...initialData }
    this._isStored = false
  }

  static isExemptionData(obj) {
    return obj instanceof ExemptionData
  }

  markAsStored() {
    this._isStored = true
    return this
  }

  updatePublicRegister(publicRegisterData) {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.publicRegister = { ...publicRegisterData }
    return this
  }

  updateProjectName(projectName) {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.projectName = projectName
    return this
  }

  updateSiteDetails(siteDetails) {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.siteDetails = siteDetails
    return this
  }

  markProjectNameTaskCompleted() {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.projectNameTaskCompleted = true
    return this
  }

  markPublicRegisterTaskCompleted() {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.publicRegisterTaskCompleted = true
    return this
  }

  markSiteDetailsTaskCompleted() {
    expect(this._isStored, 'Cannot update unstored exemption').to.be.true // eslint-disable-line no-unused-expressions
    this._data.siteDetailsTaskCompleted = true
    return this
  }

  getData() {
    return { ...this._data }
  }

  get projectName() {
    return this._data.projectName
  }

  get publicRegister() {
    return this._data.publicRegister
  }

  get siteDetails() {
    return this._data.siteDetails
  }

  get projectNameTaskCompleted() {
    return this._data.projectNameTaskCompleted
  }

  get publicRegisterTaskCompleted() {
    return this._data.publicRegisterTaskCompleted
  }

  get siteDetailsTaskCompleted() {
    return this._data.siteDetailsTaskCompleted
  }
}
