import { Formatter } from '@cucumber/cucumber'

export default class ProgressBarFormatter extends Formatter {
  constructor(options) {
    super(options)
    this.total = 0
    this.completed = 0
    this.passed = 0
    this.failed = 0
    this.testCaseResults = new Map()

    options.eventBroadcaster.on('envelope', (envelope) => {
      if (envelope.pickle) {
        this.total++
      }

      if (envelope.testStepFinished) {
        const { testCaseStartedId, testStepResult } = envelope.testStepFinished
        if (testStepResult.status === 'FAILED') {
          this.testCaseResults.set(testCaseStartedId, 'FAILED')
        }
      }

      if (envelope.testCaseFinished) {
        this.completed++
        const { testCaseStartedId } = envelope.testCaseFinished
        if (this.testCaseResults.get(testCaseStartedId) === 'FAILED') {
          this.failed++
        } else {
          this.passed++
        }

        const remaining = this.total - this.completed
        const pct = Math.round((this.completed / this.total) * 100)
        const barWidth = 30
        const filled = Math.round((pct / 100) * barWidth)
        const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled)
        process.stderr.write(
          `\n[${bar}] ${pct}% | ${this.passed} passed | ${this.failed} failed | ${remaining} remaining\n`
        )
      }
    })
  }
}
