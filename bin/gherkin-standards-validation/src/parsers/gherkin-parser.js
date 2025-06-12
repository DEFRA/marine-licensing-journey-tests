/**
 * Gherkin Parser Module
 * Responsible for parsing Gherkin content and extracting scenarios
 */

/**
 * Extract all scenarios from Gherkin content
 */
export function extractScenariosFromContent(content) {
  const lines = content.split('\n')
  const scenarios = []
  let currentScenario = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const lineNumber = i + 1

    if (isScenarioDeclaration(line)) {
      currentScenario = finishCurrentScenario(scenarios, currentScenario)
      currentScenario = createNewScenario(line, lineNumber)
      continue
    }

    if (isFeatureLine(line)) {
      currentScenario = null
      continue
    }

    if (isStepLine(line) && currentScenario) {
      addStepToScenario(currentScenario, line, lineNumber)
    }
  }

  finishCurrentScenario(scenarios, currentScenario)
  return scenarios
}

/**
 * Check if line is a scenario declaration
 */
function isScenarioDeclaration(line) {
  return line.match(/^\s*Scenario(?:\s+Outline)?:\s*(.+)/)
}

/**
 * Check if line is a step line
 */
function isStepLine(line) {
  return line.match(/^\s*(Given|When|Then|And|But)\s+/)
}

/**
 * Check if line is a feature line
 */
function isFeatureLine(line) {
  return line.match(/^\s*Feature:\s*/)
}

/**
 * Create a new scenario object
 */
function createNewScenario(line, lineNumber) {
  const name = line.replace(/^\s*Scenario(?:\s+Outline)?:\s*/, '').trim()
  return {
    name,
    startLine: lineNumber,
    steps: [],
    whenCount: 0,
    thenCount: 0
  }
}

/**
 * Add a step to the current scenario
 */
function addStepToScenario(scenario, line, lineNumber) {
  const stepMatch = line.match(/^\s*(Given|When|Then|And|But)\s+/)
  if (!stepMatch) return

  const stepType = stepMatch[1]
  const step = { type: stepType, lineNumber }

  scenario.steps.push(step)

  if (stepType === 'When') scenario.whenCount++
  else if (stepType === 'Then') scenario.thenCount++
}

/**
 * Helper to finish current scenario and add to scenarios array
 */
function finishCurrentScenario(scenarios, currentScenario) {
  if (currentScenario) {
    scenarios.push(currentScenario)
  }
  return null
}
