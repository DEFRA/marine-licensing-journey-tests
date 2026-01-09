#!/usr/bin/env node

/**
 * Steps Analyzer CLI
 * Identifies unused and duplicate Cucumber step definitions
 */

import {
  analyzeStepUsage,
  analyzeDuplicateSteps,
  findFeatureFiles,
  findStepFiles
} from './src/analyzers/usage-analyzer.js'
import { reportResults } from './src/reporters/usage-reporter.js'

const FEATURES_DIR = 'test/features'
const STEPS_DIR = 'test/steps'

/**
 * Main execution
 */
export async function main() {
  console.log('🔍 Analysing step definitions...\n')

  try {
    const stepFiles = await findStepFiles(STEPS_DIR)
    const featureFiles = await findFeatureFiles(FEATURES_DIR)

    if (stepFiles.length === 0) {
      console.log('ℹ️  No step definition files found.')
      return 0
    }

    if (featureFiles.length === 0) {
      console.log('ℹ️  No feature files found.')
      return 0
    }

    const unusedSteps = analyzeStepUsage(stepFiles, featureFiles)
    const duplicateSteps = analyzeDuplicateSteps(stepFiles)

    const exitCode = reportResults({ unusedSteps, duplicateSteps })
    process.exit(exitCode)
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    process.exit(1)
  }
}

// Handle CLI usage when called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await main()
}
