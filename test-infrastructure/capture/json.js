import allure from '@wdio/allure-reporter'

export const attachJson = (result, name = 'result') => {
  allure.addAttachment(
    name,
    JSON.stringify(result, null, 2),
    'application/json'
  )
}

export const attachRichFeatureContext = (scenario) => {
  const feature = scenario.gherkinDocument?.feature
  const scenarioInfo = scenario.pickle

  if (!feature) return

  // Extract rich information from the Cucumber context
  const contextInfo = {
    featureName: feature.name || 'Unknown Feature',
    scenarioName: scenarioInfo.name || 'Unknown Scenario',
    featureDescription: feature.description?.trim() || '',
    scenarioSteps: scenarioInfo.steps?.map((step) => step.text) || [],
    location: {
      uri: scenario.uri || '',
      line: scenarioInfo.astNodeIds?.[0] || ''
    },
    tags: {
      feature: feature.tags?.map((tag) => tag.name) || [],
      scenario: scenarioInfo.tags?.map((tag) => tag.name) || []
    }
  }

  // Create human-readable documentation from the context
  const documentation = []

  if (contextInfo.featureName) {
    documentation.push(`🎯 Feature: ${contextInfo.featureName}`)
  }

  if (contextInfo.scenarioName) {
    documentation.push(`📋 Scenario: ${contextInfo.scenarioName}`)
  }

  if (contextInfo.featureDescription) {
    documentation.push(`📝 Description: ${contextInfo.featureDescription}`)
  }

  if (contextInfo.scenarioSteps.length > 0) {
    documentation.push(`🔄 Test Steps:`)
    contextInfo.scenarioSteps.forEach((step, index) => {
      documentation.push(`   ${index + 1}. ${step}`)
    })
  }

  if (contextInfo.location.uri) {
    documentation.push(`📁 File: ${contextInfo.location.uri}`)
  }

  // Process tags and add to documentation
  const allTags = [...contextInfo.tags.feature, ...contextInfo.tags.scenario]
  if (allTags.length > 0) {
    documentation.push(`🏷️ Tags:`)
    allTags.forEach((tag) => {
      if (tag.includes('=')) {
        const [key, value] = tag.replace('@', '').split('=', 2)
        if (key === 'issue') {
          documentation.push(`   🎫 User Story: ${value}`)
        } else {
          documentation.push(`   📌 ${key}: ${value.replace(/_/g, ' ')}`)
        }
      } else {
        documentation.push(`   📌 ${tag.replace('@', '')}`)
      }
    })
  }

  // Attach the rich context information
  allure.addAttachment(
    'Feature Context Documentation',
    documentation.join('\n'),
    'text/plain'
  )

  // Also attach structured JSON for programmatic access
  allure.addAttachment(
    'Structured Feature Context',
    JSON.stringify(contextInfo, null, 2),
    'application/json'
  )
}
