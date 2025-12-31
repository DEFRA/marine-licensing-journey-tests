/**
 * Step Definition Parser Module
 * Extracts step definitions from Cucumber step files
 */

import { readFileSync } from 'fs'

/**
 * Extract all step definitions from a step file
 */
export function extractStepDefinitions(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const stepDefinitions = []

  // Match Given/When/Then with single quotes, double quotes, or backticks
  // Handles quotes inside the pattern string correctly
  const stepRegex =
    /(Given|When|Then)\s*\(\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`)/g
  let match

  while ((match = stepRegex.exec(content)) !== null) {
    // Pattern is in capture group 2 (single quote), 3 (double quote), or 4 (backtick)
    const pattern = match[2] || match[3] || match[4]
    stepDefinitions.push({
      type: match[1],
      pattern,
      file: filePath
    })
  }

  return stepDefinitions
}

/**
 * Extract step definitions from multiple step files
 */
export function extractAllStepDefinitions(stepFiles) {
  const allStepDefinitions = []

  stepFiles.forEach((filePath) => {
    try {
      const stepDefinitions = extractStepDefinitions(filePath)
      allStepDefinitions.push(...stepDefinitions)
    } catch (error) {
      console.warn(`⚠️  Warning: Could not parse ${filePath}: ${error.message}`)
    }
  })

  return allStepDefinitions
}
