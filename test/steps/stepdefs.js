import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { browser } from '@wdio/globals'

Given('a web browser is on the home page', async () => {
  await browser.url('')
  await browser.takeScreenshot()
})

When(
  'the user inputs a valid project name and clicks save and continue',
  function () {
    this.projectName = 'My First Project'
  }
)

Then('the user is on the home page', async () => {
  expect(await browser.$('h1').getText()).to.equal('Home')
})
