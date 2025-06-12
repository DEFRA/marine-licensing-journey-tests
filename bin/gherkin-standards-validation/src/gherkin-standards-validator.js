#!/usr/bin/env node

/**
 * Gherkin Standards Validator
 * Validates Gherkin files against established BDD standards and best practices
 */

export {
  lintFeatureFile,
  parseGherkinAndCheckSteps
} from './processors/file-processor.js'

// If called directly, run the standards validation CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  // Import and run the CLI from the index module
  const { main } = await import('../index.js')
  await main()
}
