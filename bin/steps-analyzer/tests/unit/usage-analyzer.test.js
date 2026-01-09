/**
 * Usage Analyzer Unit Tests
 */

import fs from 'fs'
import path from 'path'
import {
  analyzeStepUsage,
  analyzeDuplicateSteps,
  findFeatureFiles,
  findStepFiles
} from '../../src/analyzers/usage-analyzer.js'

describe('Usage Analyzer', () => {
  const tempDir = '/tmp/test-analyzer-data'

  beforeEach(() => {
    // Clean up any existing temp data
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
    fs.mkdirSync(tempDir, { recursive: true })
  })

  afterEach(() => {
    // Clean up temp data
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  describe('findStepFiles', () => {
    it('should find JavaScript step files', () => {
      const stepsDir = path.join(tempDir, 'steps')
      fs.mkdirSync(stepsDir)

      // Create test files
      fs.writeFileSync(path.join(stepsDir, 'login.steps.js'), 'content')
      fs.writeFileSync(path.join(stepsDir, 'dashboard.steps.js'), 'content')
      fs.writeFileSync(path.join(stepsDir, 'README.md'), 'content')
      fs.writeFileSync(path.join(stepsDir, 'config.json'), 'content')

      const result = findStepFiles(stepsDir)

      expect(result).toHaveLength(2)
      expect(result).toContain(path.join(stepsDir, 'login.steps.js'))
      expect(result).toContain(path.join(stepsDir, 'dashboard.steps.js'))
    })

    it('should handle empty directories', () => {
      const stepsDir = path.join(tempDir, 'empty-steps')
      fs.mkdirSync(stepsDir)

      const result = findStepFiles(stepsDir)

      expect(result).toEqual([])
    })

    it('should throw error for non-existent directories', () => {
      expect(() => findStepFiles('/non/existent/path')).toThrow(
        'Cannot read steps directory /non/existent/path'
      )
    })
  })

  describe('findFeatureFiles', () => {
    it('should find feature files', () => {
      const featuresDir = path.join(tempDir, 'features')
      fs.mkdirSync(featuresDir)

      fs.writeFileSync(path.join(featuresDir, 'login.feature'), 'content')
      fs.writeFileSync(path.join(featuresDir, 'dashboard.feature'), 'content')
      fs.writeFileSync(path.join(featuresDir, 'README.md'), 'content')

      const result = findFeatureFiles(featuresDir)

      expect(result).toHaveLength(2)
      expect(result).toContain(path.join(featuresDir, 'login.feature'))
      expect(result).toContain(path.join(featuresDir, 'dashboard.feature'))
    })

    it('should handle empty directories', () => {
      const featuresDir = path.join(tempDir, 'empty-features')
      fs.mkdirSync(featuresDir)

      const result = findFeatureFiles(featuresDir)

      expect(result).toEqual([])
    })
  })

  describe('analyzeStepUsage', () => {
    it('should identify unused steps correctly', () => {
      const stepsDir = path.join(tempDir, 'steps')
      const featuresDir = path.join(tempDir, 'features')
      fs.mkdirSync(stepsDir, { recursive: true })
      fs.mkdirSync(featuresDir, { recursive: true })

      // Create step file with mixed used/unused steps
      fs.writeFileSync(
        path.join(stepsDir, 'test.steps.js'),
        `
        Given('user is logged in', async function() {})
        When('user clicks {string}', async function(button) {})
        Then('user sees success', async function() {})
      `
      )

      // Create feature that uses some steps
      fs.writeFileSync(
        path.join(featuresDir, 'test.feature'),
        `
        Feature: Login Test
        
        Scenario: User login
          Given user is logged in
          When user clicks "Login"
      `
      )

      const stepFiles = [path.join(stepsDir, 'test.steps.js')]
      const featureFiles = [path.join(featuresDir, 'test.feature')]

      const result = analyzeStepUsage(stepFiles, featureFiles)

      expect(result).toHaveLength(1)
      expect(result[0].pattern).toBe('user sees success')
      expect(result[0].type).toBe('Then')
    })

    it('should return empty array when all steps are used', () => {
      const stepsDir = path.join(tempDir, 'steps')
      const featuresDir = path.join(tempDir, 'features')
      fs.mkdirSync(stepsDir, { recursive: true })
      fs.mkdirSync(featuresDir, { recursive: true })

      fs.writeFileSync(
        path.join(stepsDir, 'all-used.steps.js'),
        `
        Given('user exists', async function() {})
      `
      )

      fs.writeFileSync(
        path.join(featuresDir, 'all-used.feature'),
        `
        Feature: All Used
        Given user exists
      `
      )

      const stepFiles = [path.join(stepsDir, 'all-used.steps.js')]
      const featureFiles = [path.join(featuresDir, 'all-used.feature')]

      const result = analyzeStepUsage(stepFiles, featureFiles)

      expect(result).toEqual([])
    })
  })

  describe('analyzeDuplicateSteps', () => {
    it('should identify duplicate steps across files', () => {
      const stepsDir = path.join(tempDir, 'steps')
      fs.mkdirSync(stepsDir, { recursive: true })

      // Create first step file
      fs.writeFileSync(
        path.join(stepsDir, 'login.steps.js'),
        `
        Given('user is logged in', async function() {})
        When('user clicks {string}', async function(button) {})
      `
      )

      // Create second step file with duplicates
      fs.writeFileSync(
        path.join(stepsDir, 'auth.steps.js'),
        `
        Given('user is logged in', async function() {})
        Then('user sees dashboard', async function() {})
      `
      )

      const stepFiles = [
        path.join(stepsDir, 'login.steps.js'),
        path.join(stepsDir, 'auth.steps.js')
      ]

      const result = analyzeDuplicateSteps(stepFiles)

      expect(result).toHaveLength(1)
      expect(result[0].pattern).toBe('user is logged in')
      expect(result[0].type).toBe('Given')
      expect(result[0].count).toBe(2)
      expect(result[0].files).toContain('login.steps.js')
      expect(result[0].files).toContain('auth.steps.js')
    })

    it('should return empty array when no duplicates exist', () => {
      const stepsDir = path.join(tempDir, 'steps')
      fs.mkdirSync(stepsDir, { recursive: true })

      fs.writeFileSync(
        path.join(stepsDir, 'unique1.steps.js'),
        `
        Given('unique step one', async function() {})
      `
      )

      fs.writeFileSync(
        path.join(stepsDir, 'unique2.steps.js'),
        `
        Given('unique step two', async function() {})
      `
      )

      const stepFiles = [
        path.join(stepsDir, 'unique1.steps.js'),
        path.join(stepsDir, 'unique2.steps.js')
      ]

      const result = analyzeDuplicateSteps(stepFiles)

      expect(result).toEqual([])
    })

    it('should handle multiple duplicates', () => {
      const stepsDir = path.join(tempDir, 'steps')
      fs.mkdirSync(stepsDir, { recursive: true })

      fs.writeFileSync(
        path.join(stepsDir, 'file1.steps.js'),
        `
        Given('step A', async function() {})
        When('step B', async function() {})
      `
      )

      fs.writeFileSync(
        path.join(stepsDir, 'file2.steps.js'),
        `
        Given('step A', async function() {})
        When('step B', async function() {})
      `
      )

      const stepFiles = [
        path.join(stepsDir, 'file1.steps.js'),
        path.join(stepsDir, 'file2.steps.js')
      ]

      const result = analyzeDuplicateSteps(stepFiles)

      expect(result).toHaveLength(2)
      expect(result.map((r) => r.pattern)).toContain('step A')
      expect(result.map((r) => r.pattern)).toContain('step B')
    })

    it('should treat different step types as different steps', () => {
      const stepsDir = path.join(tempDir, 'steps')
      fs.mkdirSync(stepsDir, { recursive: true })

      fs.writeFileSync(
        path.join(stepsDir, 'file1.steps.js'),
        `
        Given('user clicks button', async function() {})
      `
      )

      fs.writeFileSync(
        path.join(stepsDir, 'file2.steps.js'),
        `
        When('user clicks button', async function() {})
      `
      )

      const stepFiles = [
        path.join(stepsDir, 'file1.steps.js'),
        path.join(stepsDir, 'file2.steps.js')
      ]

      const result = analyzeDuplicateSteps(stepFiles)

      expect(result).toEqual([])
    })
  })
})
