const common = {
  import: ['test-pw/steps/**/*.js', 'test-pw/support/**/*.js'],
  format: ['progress', 'html:cucumber-report.html'],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true
}

export default {
  ...common,
  paths: [
    'test/features/task.list.feature',
    'test/features/validation.project.name.feature',
    'test/features/cookies.feature',
    'test/features/header.and.footer.feature',
    'test/features/privacy.policy.feature',
    'test/features/public.register.feature',
    'test/features/validation.public.register.feature',
    'test/features/site.details.manual.polygon.feature',
    'test/features/validation.site.details.feature',
    'test/features/validation.centre.point.coordinates.feature',
    'test/features/validation.coordinates.leading.zeroes.feature',
    'test/features/validation.polygon.osgb36.coordinates.feature',
    'test/features/validation.polygon.wgs84.coordinates.feature',
    'test/features/validation.width.circular.site.feature',
    'test/features/manual.site.details.multi.site.feature',
    'test/features/upload.coordinate.file.feature',
    'test/features/kml.file.site.details.multi.site.feature',
    'test/features/shapefile.site.details.multi.site.feature',
    'test/features/validate.shapefile.missing.files.feature',
    'test/features/check.your.answers.feature',
    'test/features/change.answers.check.your.answers.feature',
    'test/features/change.activity.details.review.site.details.feature',
    'test/features/change.site.details.boundary.review.site.details.feature',
    'test/features/change.site.details.circular.review.site.details.feature',
    'test/features/delete.all.site.details.review.site.details.feature',
    'test/features/submit.notification.feature',
    'test/features/dashboard.feature',
    'test/features/redirect.to.login.when.logged.out.feature',
    'test/features/mcms.context.validation.feature'
  ]
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
  format: [
    'progress',
    'html:cucumber-report.html',
    'json:cucumber-results.json'
  ],
  paths: ['test/features/*.feature'],
  tags: 'not @wip and not @bug and not @d365 and not @real-defra-id and not @fivium and not @local-only'
}
