const debug = process.env.DEBUG === 'true'

const common = {
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '1', 10),
  import: ['test-pw/steps/**/*.js', 'test-pw/support/**/*.js'],
  format: [
    './test-pw/support/progress-formatter.js',
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
  paths: ['test/features/*.feature', 'test-pw/features/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}

export const smoke = {
  ...common,
  paths: [
    'test/features/task.list.feature',
    'test/features/cookies.feature',
    'test/features/header.and.footer.feature',
    'test/features/public.register.feature',
    'test/features/manual.site.details.multi.site.feature',
    'test/features/kml.file.site.details.multi.site.feature',
    'test/features/shapefile.site.details.multi.site.feature',
    'test/features/check.your.answers.feature',
    'test/features/submit.notification.feature',
    'test/features/dashboard.feature'
  ],
  tags: '@smoke'
}

export const all = {
  ...common,
  paths: ['test/features/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium'
}

export const github = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '10', 10),
  format: [
    './test-pw/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/*.feature', 'test-pw/features/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}

export const cdp = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '10', 10),
  format: [
    './test-pw/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/*.feature', 'test-pw/features/*.feature'],
  tags:
    process.env.ENVIRONMENT === 'test'
      ? '@real-defra-id or @d365 or @fivium'
      : 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}
