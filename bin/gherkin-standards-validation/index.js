#!/usr/bin/env node

/**
 * Gherkin Standards Validator CLI
 * Validates Gherkin feature files against BDD standards and best practices
 */

import {
  findFeatureFiles,
  processAllFeatureFiles
} from './src/processors/file-processor.js'
import { printFixingTips } from './src/reporters/violation-reporter.js'

const MAX_STEPS = 7
const FEATURE_FILES_PATTERN = 'test/features/**/*.feature'

/**
 * Main execution
 */
export async function main() {
  console.log(
    `🔍 Validating Gherkin scenarios against BDD standards (max steps: ${MAX_STEPS})...\n`
  )

  const featureFiles = await findFeatureFiles(FEATURE_FILES_PATTERN)

  if (featureFiles.length === 0) {
    console.log('ℹ️  No feature files found.')
    return 0
  }

  const totalViolations = processAllFeatureFiles(featureFiles, MAX_STEPS)

  if (totalViolations === 0) {
    console.log(
      `\n✅ All ${featureFiles.length} feature file(s) comply with BDD standards.`
    )
    return
  }

  console.error(
    `\n❌ Found ${totalViolations} violation(s) in ${featureFiles.length} feature file(s).`
  )
  printFixingTips()
  process.exit(1)
}

// Handle CLI usage when called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await main()
}
