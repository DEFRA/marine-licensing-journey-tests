import { createRequire } from 'module'

const JSQR_PATH = createRequire(import.meta.url).resolve('jsqr/dist/jsQR.js')
const QR_DECODE_SIZE = 800

export default class LcmlSiteNoticePrintPage {
  constructor(page) {
    this.page = page
  }

  static PATH = /\/marine-licence\/site-notice\/print\/([a-f0-9]{24})$/

  get heading() {
    return this.page.locator('h1')
  }

  get subheading() {
    return this.page.getByTestId('site-notice-subheading')
  }

  get applicant() {
    return this.page.getByTestId('site-notice-applicant')
  }

  get summary() {
    return this.page.getByTestId('site-notice-summary')
  }

  get qrCode() {
    return this.page.getByTestId('site-notice-qr-code')
  }

  get webAddress() {
    return this.page.getByTestId('site-notice-url')
  }

  get qrReference() {
    return this.page.getByTestId('site-notice-qr-reference')
  }

  get bulletReference() {
    return this.page.getByTestId('site-notice-bullet-reference')
  }

  get printControls() {
    return this.page.getByTestId('print-controls')
  }

  get printButton() {
    return this.page.getByRole('button', { name: 'Print this page' })
  }

  marineLicenceId() {
    return this.page.url().match(LcmlSiteNoticePrintPage.PATH)?.[1]
  }

  async links() {
    return this.page
      .locator(
        'a:not(.govuk-skip-link):not(.govuk-header__homepage-link):not(.govuk-cookie-banner a)'
      )
      .evaluateAll((links) =>
        links.map((link) => ({
          text: link.textContent.trim(),
          inPhaseBanner: Boolean(link.closest('.govuk-phase-banner'))
        }))
      )
  }

  async fontFamilies() {
    return this.page
      .getByTestId('site-notice')
      .locator('h1, h2, p, li')
      .evaluateAll((elements) => [
        ...new Set(elements.map((el) => window.getComputedStyle(el).fontFamily))
      ])
  }

  async decodeQrCode() {
    const svg = await this.qrCode.locator('svg').evaluate((el) => el.outerHTML)
    const decoder = await this.page.context().newPage()
    try {
      await decoder.setContent('<canvas></canvas>')
      await decoder.addScriptTag({ path: JSQR_PATH })
      return await decoder.evaluate(
        async ({ markup, size }) => {
          const image = new window.Image()
          image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`
          await image.decode()
          const canvas = document.querySelector('canvas')
          canvas.width = size
          canvas.height = size
          const context = canvas.getContext('2d')
          context.fillStyle = '#fff'
          context.fillRect(0, 0, size, size)
          context.drawImage(image, 0, 0, size, size)
          const { data } = context.getImageData(0, 0, size, size)
          return window.jsQR(data, size, size)?.data ?? null
        },
        { markup: svg, size: QR_DECODE_SIZE }
      )
    } finally {
      await decoder.close()
    }
  }

  async interceptPrintDialog() {
    await this.page.evaluate(() => {
      window.printDialogOpened = 0
      window.print = () => {
        window.printDialogOpened++
      }
    })
  }

  async printDialogOpenings() {
    return this.page.evaluate(() => window.printDialogOpened)
  }

  async printedPageCount() {
    const pdf = await this.page.pdf({ preferCSSPageSize: true })
    return pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0
  }
}
