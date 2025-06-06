import allure from '@wdio/allure-reporter'

export const attachJson = (result, name = 'result') => {
  allure.addAttachment(
    name,
    JSON.stringify(result, null, 2),
    'application/json'
  )
}
