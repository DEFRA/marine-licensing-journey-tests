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

  const stepRegex = /(Given|When|Then)\s*\(\s*['"`]([^'"`]+)['"`]/g
  let match

  while ((match = stepRegex.exec(content)) !== null) {
    stepDefinitions.push({
      type: match[1],
      pattern: match[2],
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
