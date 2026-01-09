/**
 * Usage Analyzer Module
 * Analyzes step definitions against feature file usage
 */

import { readdirSync } from 'node:fs'
import { basename, join } from 'node:path'
import {
  extractStepUsage,
  isStepPatternUsed
} from '../parsers/feature-parser.js'
import { extractAllStepDefinitions } from '../parsers/step-parser.js'

/**
 * Find files with a specific extension in a directory
 */
function findFilesByExtension(dir, extension, dirType) {
  try {
    return readdirSync(dir)
      .filter((f) => f.endsWith(extension))
      .map((f) => join(dir, f))
  } catch (error) {
    throw new Error(`Cannot read ${dirType} directory ${dir}: ${error.message}`)
  }
}

/**
 * Find all step definition files
 */
export function findStepFiles(stepsDir) {
  return findFilesByExtension(stepsDir, '.js', 'steps')
}

/**
 * Find all feature files
 */
export function findFeatureFiles(featuresDir) {
  return findFilesByExtension(featuresDir, '.feature', 'features')
}

/**
 * Analyze step definitions for usage
 */
export function analyzeStepUsage(stepFiles, featureFiles) {
  const stepDefinitions = extractAllStepDefinitions(stepFiles)
  const featureContent = extractStepUsage(featureFiles)

  return stepDefinitions
    .filter((stepDef) => !isStepPatternUsed(stepDef.pattern, featureContent))
    .map((stepDef) => ({
      type: stepDef.type,
      pattern: stepDef.pattern,
      file: basename(stepDef.file)
    }))
}

/**
 * Analyze step definitions for duplicates
 */
export function analyzeDuplicateSteps(stepFiles) {
  const stepDefinitions = extractAllStepDefinitions(stepFiles)

  // Group steps by their pattern and type
  const stepsByKey = stepDefinitions.reduce((map, stepDef) => {
    const key = `${stepDef.type}:${stepDef.pattern}`
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(stepDef)
    return map
  }, new Map())

  // Find and format duplicates (patterns that appear more than once)
  return Array.from(stepsByKey.values())
    .filter((steps) => steps.length > 1)
    .map((steps) => ({
      type: steps[0].type,
      pattern: steps[0].pattern,
      count: steps.length,
      files: steps.map((s) => basename(s.file)),
      fullPaths: steps.map((s) => s.file)
    }))
}
