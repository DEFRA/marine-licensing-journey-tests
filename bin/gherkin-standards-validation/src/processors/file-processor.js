/**
 * File Processor Module
 * Responsible for file operations and orchestrating the linting process
 */

import fs from 'fs'
import { glob } from 'glob'
import { extractScenariosFromContent } from '../parsers/gherkin-parser.js'
import { reportViolation } from '../reporters/violation-reporter.js'
import { validateScenario } from '../validators/step-validators.js'

/**
 * Parse Gherkin content and find scenarios with violations
 */
export function parseGherkinAndCheckSteps(content, maxSteps) {
  const scenarios = extractScenariosFromContent(content)
  return scenarios.flatMap((scenario) => validateScenario(scenario, maxSteps))
}

/**
 * Lint a single feature file
 */
export function lintFeatureFile(filePath, maxSteps) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const violations = parseGherkinAndCheckSteps(content, maxSteps)

    if (violations.length === 0) {
      return 0
    }

    console.error(`\n❌ ${filePath}`)
    violations.forEach((violation) => reportViolation(violation, maxSteps))
    return violations.length
  } catch (error) {
    console.error(`❌ Error reading ${filePath}: ${error.message}`)
    return 1
  }
}

/**
 * Process all feature files and return total violation count
 */
export function processAllFeatureFiles(featureFiles, maxSteps) {
  let totalViolations = 0

  featureFiles.forEach((filePath) => {
    const violations = lintFeatureFile(filePath, maxSteps)
    totalViolations += violations

    if (violations === 0) {
      console.log(`✅ ${filePath}`)
    }
  })

  return totalViolations
}

/**
 * Find all feature files matching the pattern
 */
export async function findFeatureFiles(pattern) {
  return await glob(pattern)
}
