import allure from '@wdio/allure-reporter'

export const attachJson = (result) => {
  allure.addAttachment(
    'result',
    JSON.stringify(result, null, 2),
    'application/json'
  )
}
