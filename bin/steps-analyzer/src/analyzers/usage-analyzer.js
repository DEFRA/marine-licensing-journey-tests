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
 * Analyze step definitions for duplicates
 */
export function analyzeDuplicateSteps(stepFiles) {
  const stepDefinitions = extractAllStepDefinitions(stepFiles)
  const duplicateSteps = []

  // Group steps by their pattern and type
  const stepMap = new Map()

  stepDefinitions.forEach((stepDef) => {
    const key = `${stepDef.type}:${stepDef.pattern}`
    if (!stepMap.has(key)) {
      stepMap.set(key, [])
    }
    stepMap.get(key).push({
      type: stepDef.type,
      pattern: stepDef.pattern,
      file: getFileNameFromPath(stepDef.file),
      fullPath: stepDef.file
    })
  })

  // Find duplicates (patterns that appear more than once)
  stepMap.forEach((steps, key) => {
    if (steps.length > 1) {
      duplicateSteps.push({
        type: steps[0].type,
        pattern: steps[0].pattern,
        count: steps.length,
        files: steps.map((s) => s.file),
        fullPaths: steps.map((s) => s.fullPath)
      })
    }
  })

  return duplicateSteps
}

/**
 * Extract filename from full path
 */
function getFileNameFromPath(filePath) {
  return filePath.split('/').pop()
}
