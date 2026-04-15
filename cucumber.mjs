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
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}

export const smoke = {
  ...common,
  paths: [
    'test/features/exemptions/task.list.feature',
    'test/features/exemptions/cookies.feature',
    'test/features/exemptions/header.and.footer.feature',
    'test/features/exemptions/public.register.feature',
    'test/features/exemptions/manual.site.details.multi.site.feature',
    'test/features/exemptions/kml.file.site.details.multi.site.feature',
    'test/features/exemptions/shapefile.site.details.multi.site.feature',
    'test/features/exemptions/check.your.answers.feature',
    'test/features/exemptions/submit.notification.feature',
    'test/features/exemptions/dashboard.feature'
  ],
  tags: '@smoke'
}

export const all = {
  ...common,
  paths: ['test/features/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium'
}

export const github = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '8', 10),
  format: [
    './test/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}

export const exemption = {
  ...common,
  paths: ['test/features/exemptions/**/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}

export const lcml = {
  ...common,
  paths: ['test/features/lcml/**/*.feature'],
  tags: 'not @wip'
}

export const cdp = {
  ...common,
  parallel: debug ? 1 : parseInt(process.env.MAX_INSTANCES || '5', 10),
  format: [
    './test/support/progress-formatter.js',
    'html:cucumber-report.html',
    'json:cucumber-results.json',
    'allure-cucumberjs/reporter'
  ],
  paths: ['test/features/**/*.feature'],
  tags:
    process.env.ENVIRONMENT === 'test'
      ? '@real-defra-id or @d365 or @fivium'
      : 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}
