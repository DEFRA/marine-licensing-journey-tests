/**
 * Feature File Parser Module
 * Extracts step usage from Cucumber feature files
 */

import { readFileSync } from 'fs'

/**
 * Extract all step usage from feature files
 */
export function extractStepUsage(featureFiles) {
  let allFeatureContent = ''

  featureFiles.forEach((filePath) => {
    try {
      const content = readFileSync(filePath, 'utf8')
      allFeatureContent += content + '\n'
    } catch (error) {
      console.warn(`⚠️  Warning: Could not read ${filePath}: ${error.message}`)
    }
  })

  return allFeatureContent
}

/**
 * Convert step definition pattern to regex for matching against feature content
 */
export function stepPatternToRegex(stepPattern) {
  // First escape special regex characters (except our placeholders)
  let searchPattern = stepPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Then replace Cucumber parameters with appropriate regex patterns
  searchPattern = searchPattern
    .replace(/\\\{string\\\}/g, '"[^"]+"') // Match quoted strings like "Project name"
    .replace(/\\\{int\\\}/g, '(\\d+|<[^>]+>)') // Match numbers OR Scenario Outline variables like <coordinateCount>
    .replace(/\\\{float\\\}/g, '(\\d+\\.\\d+|<[^>]+>)') // Match floats OR Scenario Outline variables

  return new RegExp(searchPattern, 'i')
}

/**
 * Check if a step definition pattern is used in feature content
 */
export function isStepPatternUsed(stepPattern, featureContent) {
  const regex = stepPatternToRegex(stepPattern)
  return regex.test(featureContent)
}
