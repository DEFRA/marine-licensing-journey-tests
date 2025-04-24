import allure from '@wdio/allure-reporter'

export const attachJson = (result) => {
  allure.addAttachment(
    'MongoDb Query Result',
    JSON.stringify(result, null, 2),
    'application/json'
  )
}
