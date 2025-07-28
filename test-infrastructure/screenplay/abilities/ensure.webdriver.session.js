import { remote } from 'webdriverio'

export async function ensureWebDriverSession() {
  const hostname = process.env.CHROMEDRIVER_URL || 'localhost'
  const port = parseInt(process.env.CHROMEDRIVER_PORT) || 4444

  const session = await remote({
    hostname,
    port,
    capabilities: {
      browserName: 'chrome'
    }
  })

  await session.url('about:blank')
  return session
}
