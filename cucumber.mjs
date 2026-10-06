const debug = process.env.DEBUG === 'true'

const common = {
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '1', 10),
  import: ['test/steps/**/*.js', 'test/support/**/*.js'],
  format: [
    './test/support/progress-formatter.js',
    'html:cucumber-report.html',
    'allure-cucumberjs/reporter'
  ],
  formatOptions: {
    snippetInterface: 'async-await',
    resultsDir: 'allure-results',
    links: {
      issue: {
        pattern: [/@issue=(.*)/],
        urlTemplate: 'https://eaflood.atlassian.net/browse/%s'
      }
    },
    environmentInfo: {
      Browser: 'Chromium',
      Framework: 'Playwright + Cucumber'
    }
  },
  publishQuiet: true
}

export default {
  ...common,
  paths: ['test/features/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only and not @empOvernight'
}

const smokePaths = [
  'test/features/exemptions/submit.notification.feature',
  'test/features/exemptions/shapefile.site.details.multi.site.feature',
  'test/features/lcml/lcml.apply.for.marine.licence.feature'
]

const githubFormat = [
  './test/support/progress-formatter.js',
  'html:cucumber-report.html',
  'json:cucumber-results.json',
  'allure-cucumberjs/reporter'
]

export const smoke = {
  ...common,
  paths: smokePaths,
  tags: '@smoke'
}

export const all = {
  ...common,
  paths: ['test/features/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @empOvernight'
}

export const github = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: githubFormat,
  paths: ['test/features/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only and not @empOvernight'
}

/** CI smoke suite — same scenarios as `smoke`, with github reporting format. */
export const githubSmoke = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: githubFormat,
  paths: smokePaths,
  tags: '@smoke'
}

const githubExclusions =
  'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only and not @empOvernight'

/** CI exemption suite — all exemption features, github reporting format. */
export const githubExemption = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: githubFormat,
  paths: ['test/features/exemptions/**/*.feature'],
  tags: githubExclusions
}

/** CI LCML suite — LCML features plus @smoke safety net. */
export const githubLcml = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: githubFormat,
  paths: ['test/features/lcml/**/*.feature', ...smokePaths],
  tags: `@smoke or (@lcml and ${githubExclusions})`
}

/** CI IAT suite — IAT features plus @smoke safety net. */
export const githubIat = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: githubFormat,
  paths: ['test/features/iat/**/*.feature', ...smokePaths],
  tags: `@smoke or (@iat and ${githubExclusions})`
}

export const exemption = {
  ...common,
  paths: ['test/features/exemptions/**/*.feature'],
  tags: githubExclusions
}

export const lcml = {
  ...common,
  paths: ['test/features/lcml/**/*.feature'],
  tags: githubExclusions
}

export const iat = {
  ...common,
  paths: ['test/features/iat/**/*.feature'],
  tags: 'not @wip'
}

// The test environment runs the @d365 scenarios, and each of those launches a
// second Chromium for Dynamics on top of the one the worker already holds. Five
// workers therefore means up to ten browsers at once, which exhausts the CDP
// container's memory. Those scenarios are wait-bound rather than CPU-bound, so
// fewer workers costs little wall-clock time.
const cdpWorkers = process.env.ENVIRONMENT === 'test' ? '2' : '5'

export const cdp = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || cdpWorkers, 10),
  format: [
    './test/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/**/*.feature'],
  tags:
    process.env.ENVIRONMENT === 'test'
      ? '(@real-defra-id or @d365 or @fivium) and not @empOvernight'
      : 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only and not @empOvernight'
}

// The EMP overnight run (ML-1500), against the test environment. The CDP
// schedule at 23:55 London time sets PROFILE=empOvernight, which entrypoint.sh
// maps to this profile; it can also be run by hand. The withdrawal scenarios
// run at any time; the nightly one needs starting within ten minutes of
// midnight.
export const empOvernight = {
  ...common,
  // All three scenarios start at once so the nightly submissions land well
  // before midnight. None of them opens Dynamics, so the memory limit behind
  // cdpWorkers does not apply.
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '3', 10),
  format: [
    './test/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/exemptions/emp.status.feature'],
  tags: '@empOvernight'
}
