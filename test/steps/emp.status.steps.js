import { Given, When, Then } from '@cucumber/cucumber'
import DashboardPage from '../pages/dashboard.page.js'
import { generateIatContext } from '../test-data/exemption.js'
import { createCircleWGS84Data } from '../test-data/site-details.js'
import { withPublicRegister } from '../test-data/check-your-answers.js'
import { submitNotification } from '../support/task-flow.js'
import { navigateAndReAuthenticate } from '../support/navigation.js'
import { londonDateParts, londonNow } from '../support/london-clock.js'
import { waitForEmpStatus } from '../support/emp.js'

const EXEMPTION =
  '(starting tomorrow|ending today|starting in the future|running today)'

// Day offsets from today (London) for each exemption's activity dates.
const DATE_OFFSETS = {
  'starting tomorrow': [1, 31],
  'ending today': [-30, 0],
  'starting in the future': [30, 60],
  'running today': [0, 30]
}

// Only articles 20 and 34 accept activity dates in the past, which the
// exemption ending today needs.
const PAST_DATES_IAT_CONTEXT = {
  articleCode: '34',
  activityTypeCode: 'REMOVAL',
  activityPurpose: 'emergency'
}

// The exemption-status job fires at 00:05 London time and takes milliseconds;
// polling EMP from then on covers the moment it finishes.
const NIGHTLY_JOB_MINUTE = 5

// The scheduled run starts at 23:55 and waits about ten minutes; a run that
// would wait longer than this started too early and fails at once.
const MAX_WAIT_MINUTES = 15

const THIRTY_SECONDS = 30_000

// The backend pushes to EMP as soon as a status changes, so a healthy system
// shows it within seconds. A push that needs the backend's five-minute retry,
// or a system that is slow, fails the test rather than being waited out.
const EMP_PUSH_TIMEOUT = 5 * 60_000

// The exemptions the nightly job has to move on. Their dates are entered
// against today's London date, so their submissions must land before midnight;
// a submission takes about 25 seconds, so none starts from 23:59. Nor after
// midnight: the job would have nothing to change until the next night.
const NIGHTLY_EXEMPTIONS = ['starting tomorrow', 'ending today']
const LAST_SUBMISSION_START = 23 * 60 + 59
const OVERNIGHT_RUN_END = 1 * 60

function tooLateToSubmitTonight() {
  const { hour, minute } = londonNow()
  const minutes = hour * 60 + minute
  return minutes >= LAST_SUBMISSION_START || minutes < OVERNIGHT_RUN_END
}

function minutesUntilNightlyJob(submittedOn) {
  const { date, hour, minute } = londonNow()
  const minutes = hour * 60 + minute
  if (date === submittedOn) {
    return 24 * 60 - minutes + NIGHTLY_JOB_MINUTE
  }
  return Math.max(0, NIGHTLY_JOB_MINUTE - minutes)
}

function nightlyJobHasRun(submittedOn) {
  return minutesUntilNightlyJob(submittedOn) === 0
}

Given(
  new RegExp(`^an exemption ${EXEMPTION} has been submitted$`),
  { timeout: 300_000 },
  async function (exemption) {
    const nightly = NIGHTLY_EXEMPTIONS.includes(exemption)

    if (nightly && tooLateToSubmitTonight()) {
      throw new Error(
        `The run started too late to submit the exemption ${exemption} before midnight London time - check when the CDP scheduled run started`
      )
    }

    const [startOffset, endOffset] = DATE_OFFSETS[exemption]
    const submittedOn = londonNow().date

    const data = withPublicRegister(
      createCircleWGS84Data({
        activityDates: {
          startDate: londonDateParts(startOffset),
          endDate: londonDateParts(endOffset)
        }
      })
    )
    data.iatContext = generateIatContext(PAST_DATES_IAT_CONTEXT)
    this.data = data
    await submitNotification(this)

    // Dates were entered against today's London date; submitting after
    // midnight would leave them a day out and the statuses meaningless.
    if (nightly && londonNow().date !== submittedOn) {
      throw new Error(
        `The exemption ${exemption} was submitted after midnight London time - schedule the run earlier`
      )
    }

    this.submittedOn = submittedOn
    this.empExemptions ??= {}
    this.empExemptions[exemption] = {
      projectName: this.data.projectName,
      applicationReference: this.data.applicationReference
    }
  }
)

When(
  'the nightly exemption status job has run',
  { timeout: (MAX_WAIT_MINUTES + 1) * 60_000 },
  async function () {
    const wait = minutesUntilNightlyJob(this.submittedOn)
    if (wait > MAX_WAIT_MINUTES) {
      throw new Error(
        `The run would wait ${wait} minutes for the 00:05 exemption-status job, more than ${MAX_WAIT_MINUTES} - it started too early; check the CDP schedule (22:55 UTC on BST, 23:55 UTC on GMT)`
      )
    }

    while (!nightlyJobHasRun(this.submittedOn)) {
      await new Promise((resolve) => setTimeout(resolve, THIRTY_SECONDS))
    }
  }
)

When(
  new RegExp(`^the user withdraws the exemption ${EXEMPTION}$`),
  async function (exemption) {
    await navigateAndReAuthenticate(this, DashboardPage.path)
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectIsDisplayed()
    await dashboard.withdraw(this.empExemptions[exemption].projectName)
  }
)

Then(
  new RegExp(`^EMP shows the exemption ${EXEMPTION} as "([^"]*)"$`),
  { timeout: EMP_PUSH_TIMEOUT + 60_000 },
  async function (exemption, status) {
    const { applicationReference } = this.empExemptions[exemption]
    const features = await waitForEmpStatus(
      applicationReference,
      status,
      EMP_PUSH_TIMEOUT
    )
    await this.attach(JSON.stringify(features, null, 2), 'application/json')
  }
)
