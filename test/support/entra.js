const ENTRA_STEP_TIMEOUT = 30_000

export function entraCredentials() {
  const userId = process.env.ENTRA_USER_ID ?? process.env.D365_USER_ID
  const password =
    process.env.ENTRA_USER_PASSWORD ?? process.env.D365_USER_PASSWORD

  if (!userId || !password) {
    throw new Error(
      'Missing Entra env vars: set ENTRA_USER_ID and ENTRA_USER_PASSWORD, or the D365 equivalents'
    )
  }

  return { userId, password }
}

export async function signInWithEntra(page) {
  const { userId, password } = entraCredentials()

  const email = page
    .locator('input[type="email"], input[name="loginfmt"]')
    .first()
  try {
    await email.waitFor({ state: 'visible', timeout: ENTRA_STEP_TIMEOUT })
  } catch {
    return
  }

  await email.fill(userId)
  await page.locator('input[type="submit"], #idSIButton9').first().click()

  const passwordField = page.locator('input[type="password"]').first()
  await passwordField.waitFor({ state: 'visible', timeout: ENTRA_STEP_TIMEOUT })
  await passwordField.fill(password)
  await page.locator('input[type="submit"], #idSIButton9').first().click()

  const staySignedIn = page.locator('#idSIButton9').first()
  try {
    await staySignedIn.waitFor({ state: 'visible', timeout: 15_000 })
    await staySignedIn.click()
  } catch {
    // the prompt is not always shown
  }

  await page.waitForLoadState('load').catch(() => {})
}

export function redactionUrlSegment(applicationReference) {
  return applicationReference.replaceAll('/', '-')
}
