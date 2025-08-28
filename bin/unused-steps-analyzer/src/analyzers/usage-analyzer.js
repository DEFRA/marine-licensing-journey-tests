/**
 * Usage Analyzer Module
 * Analyzes step definitions against feature file usage
 */

import { readdirSync } from 'fs'
import { join } from 'path'
import {
  extractStepUsage,
  isStepPatternUsed
} from '../parsers/feature-parser.js'
import { extractAllStepDefinitions } from '../parsers/step-parser.js'

/**
 * Find all step definition files
 */
export function findStepFiles(stepsDir) {
  try {
    const files = readdirSync(stepsDir)
    return files.filter((f) => f.endsWith('.js')).map((f) => join(stepsDir, f))
  } catch (error) {
    throw new Error(`Cannot read steps directory ${stepsDir}: ${error.message}`)
  }
}

/**
 * Find all feature files
 */
export function findFeatureFiles(featuresDir) {
  try {
    const files = readdirSync(featuresDir)
    return files
      .filter((f) => f.endsWith('.feature'))
      .map((f) => join(featuresDir, f))
  } catch (error) {
    throw new Error(
      `Cannot read features directory ${featuresDir}: ${error.message}`
    )
  }
}

/**
 * Analyze step definitions for usage
 */
export function analyzeStepUsage(stepFiles, featureFiles) {
  const stepDefinitions = extractAllStepDefinitions(stepFiles)
  const featureContent = extractStepUsage(featureFiles)

  const unusedSteps = []

  stepDefinitions.forEach((stepDef) => {
    if (!isStepPatternUsed(stepDef.pattern, featureContent)) {
      unusedSteps.push({
        type: stepDef.type,
        pattern: stepDef.pattern,
        file: getFileNameFromPath(stepDef.file)
      })
    }
  })

  return unusedSteps
}

/**
 * Extract filename from full path
 */
function getFileNameFromPath(filePath) {
  return filePath.split('/').pop()
}
