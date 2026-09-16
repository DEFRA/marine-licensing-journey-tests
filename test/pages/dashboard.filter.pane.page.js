import { expect } from '@playwright/test'

const STATUS_VALUES = {
  Active: 'ACTIVE',
  Draft: 'DRAFT',
  Expired: 'EXPIRED',
  Scheduled: 'SCHEDULED',
  Submitted: 'SUBMITTED',
  Transferred: 'TRANSFERRED',
  'Unable to progress': 'REJECTED',
  Withdrawn: 'WITHDRAWN'
}

const TYPE_VALUES = {
  'Exempt activity notification': 'exemption',
  'Marine licence application': 'marine-licence'
}

export default class DashboardFilterPanePage {
  constructor(page) {
    this.page = page
    this.showFilterButton = page.getByRole('button', { name: 'Show filter' })
    this.hideFilterButton = page.getByRole('button', { name: 'Hide filter' })
    this.applyFiltersButton = page.getByRole('button', {
      name: 'Apply filters'
    })
    this.filterToggle = page
      .locator('button[aria-expanded]')
      .filter({ hasText: /^(Show|Hide) filter$/ })
      .first()
    this.selectedFilters = page.locator('.moj-filter__selected')
    this.selectedFilterTags = page.locator('.moj-filter__tag')
    this.clearFiltersLinks = page.getByRole('link', { name: 'Clear filters' })
    this.resultsCaption = page
      .locator('h3.govuk-heading-s')
      .filter({ hasText: /results found in/ })
      .first()
    this.showRadio = (value) =>
      page.locator(`input[name="show"][value="${value}"]`)
    this.showOptionLabel = (value) =>
      page.locator(
        `.govuk-radios__item:has(input[name="show"][value="${value}"]) label`
      )
    this.typeCheckbox = (label) =>
      page.locator(`input[name="type"][value="${TYPE_VALUES[label]}"]`)
    this.statusCheckbox = (label) =>
      page.locator(`input[name="status"][value="${STATUS_VALUES[label]}"]`)
    this.emptyMessage = page.locator('p.app-empty-message')
  }

  async expectNotDisplayed() {
    await expect(this.filterToggle).toHaveCount(0)
    await expect(this.applyFiltersButton).toHaveCount(0)
  }

  async expectPaneHidden() {
    await expect(this.filterToggle).toHaveAttribute('aria-expanded', 'false', {
      timeout: 30_000
    })
  }

  async expectPaneShown() {
    await expect(this.filterToggle).toHaveAttribute('aria-expanded', 'true', {
      timeout: 30_000
    })
  }

  async openPane() {
    await this.filterToggle.waitFor({ state: 'visible', timeout: 30_000 })
    if ((await this.filterToggle.getAttribute('aria-expanded')) === 'false') {
      await this.filterToggle.click()
    }
    await this.expectPaneShown()
  }

  async closePane() {
    if ((await this.filterToggle.getAttribute('aria-expanded')) === 'true') {
      await this.filterToggle.click()
    }
    await this.expectPaneHidden()
  }

  async applyFilters({ type = [], status = [] } = {}) {
    await this.openPane()
    for (const label of type) {
      await this.typeCheckbox(label).check()
    }
    for (const label of status) {
      await this.statusCheckbox(label).check()
    }
    await this.applyFiltersButton.click()
    await this.page.waitForLoadState('load')
    await this.resultsCaption.waitFor({ state: 'visible', timeout: 30_000 })
  }

  async applyShowOption(value) {
    await this.openPane()
    await this.showRadio(value).check()
    await this.applyFiltersButton.click()
    await this.page.waitForLoadState('load')
    await this.resultsCaption.waitFor({ state: 'visible', timeout: 30_000 })
  }

  async expectSelectedFilterCount(count) {
    await expect(this.selectedFilterTags).toHaveCount(count, {
      timeout: 30_000
    })
  }

  async selectedFilterLabels() {
    const tags = await this.selectedFilterTags.allInnerTexts()
    return tags.map((t) =>
      t
        .replace(/Remove this filter/i, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
  }

  removeSelectedFilter(label) {
    return this.selectedFilterTags.filter({ hasText: label }).first()
  }
}
