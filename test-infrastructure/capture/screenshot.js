import allureReporter from '@wdio/allure-reporter'
import { browser } from '@wdio/globals'

export const takeScreenshot = async (name = 'Screenshot') => {
  const screenshot = await browser.takeScreenshot()
  await allureReporter.addAttachment(
    name,
    Buffer.from(screenshot, 'base64'),
    'image/png'
  )
  return true
}
