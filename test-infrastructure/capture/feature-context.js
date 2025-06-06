import allure from '@wdio/allure-reporter'

export const attachRichFeatureContext = (scenario) => {
  const feature = scenario.gherkinDocument?.feature
  if (!feature) return

  const description = feature.description?.trim()
  description && allure.addDescription(description, 'text')

  const featureName = feature.name
  featureName &&
    featureName !== 'Unknown Feature' &&
    allure.addFeature(featureName)
}
