import allure from '@wdio/allure-reporter'

export const logOperation = (operation, message, isWarning = false) => {
  const attachmentType = isWarning ? 'Warning' : 'Success'
  allure.addAttachment(
    `${operation} - ${attachmentType}`,
    message,
    'text/plain'
  )
}

export const logUserCleanup = (userId, success = true, error = null) => {
  if (success) {
    logOperation('User Cleanup', `Successfully cleaned up test user: ${userId}`)
  } else {
    logOperation(
      'User Cleanup',
      `Failed to clean up test user ${userId}: ${error?.message || 'Unknown error'}`,
      true
    )
  }
}
