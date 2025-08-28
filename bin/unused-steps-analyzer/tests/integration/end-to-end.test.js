/**
 * End-to-End Integration Tests
 * Tests the complete unused steps analysis workflow
 */

import fs from 'fs'
import path from 'path'
import { analyzeStepUsage } from '../../src/analyzers/usage-analyzer.js'

describe('End-to-End Integration Tests', () => {
  const tempDir = path.join(process.cwd(), 'temp-test-data')
  const stepsDir = path.join(tempDir, 'steps')
  const featuresDir = path.join(tempDir, 'features')

  beforeAll(() => {
    // Create test directory structure
    fs.mkdirSync(tempDir, { recursive: true })
    fs.mkdirSync(stepsDir, { recursive: true })
    fs.mkdirSync(featuresDir, { recursive: true })
  })

  afterAll(() => {
    // Clean up test directories
    fs.rmSync(tempDir, { recursive: true, force: true })
  })

  beforeEach(() => {
    // Clean up any existing test files
    const cleanup = (dir) => {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
          fs.unlinkSync(path.join(dir, file))
        })
      }
    }
    cleanup(stepsDir)
    cleanup(featuresDir)
  })

  it('should identify unused steps in a real scenario', () => {
    // Create test step file with mixed used/unused steps
    fs.writeFileSync(
      path.join(stepsDir, 'test.steps.js'),
      `
      import { Given, When, Then } from '@cucumber/cucumber'
      
      Given('the user is on the login page', async function() {
        // Used in feature
      })
      
      When('the user enters {string} credentials', async function(credType) {
        // Used in feature
      })
      
      Then('the {string} page is displayed', async function(pageName) {
        // Used in feature
      })
      
      Given('the user has admin privileges', async function() {
        // UNUSED - not in any feature
      })
      
      When('the user deletes {string}', async function(item) {
        // UNUSED - not in any feature
      })
    `
    )

    // Create test feature file
    fs.writeFileSync(
      path.join(featuresDir, 'test.feature'),
      `
      Feature: User Login
      
      Scenario: Successful login
        Given the user is on the login page
        When the user enters "valid" credentials  
        Then the "Dashboard" page is displayed
    `
    )

    const stepFiles = [path.join(stepsDir, 'test.steps.js')]
    const featureFiles = [path.join(featuresDir, 'test.feature')]

    const unusedSteps = analyzeStepUsage(stepFiles, featureFiles)

    expect(unusedSteps).toHaveLength(2)
    expect(unusedSteps.map((s) => s.pattern)).toEqual([
      'the user has admin privileges',
      'the user deletes {string}'
    ])
  })

  it('should handle complex parameter matching', () => {
    // Create step file with parameter patterns
    fs.writeFileSync(
      path.join(stepsDir, 'task.steps.js'),
      `
      When('the {string} task is selected', async function(taskName) {})
      Then('the {string} task status is {string}', async function(task, status) {})
      Given('there are {int} items', async function(count) {})
    `
    )

    // Create feature file that uses some patterns
    fs.writeFileSync(
      path.join(featuresDir, 'tasks.feature'),
      `
      Feature: Task Management
      
      Scenario: Complete task
        When the "Project name" task is selected
        Then the "Project name" task status is "Completed"
    `
    )

    const stepFiles = [path.join(stepsDir, 'task.steps.js')]
    const featureFiles = [path.join(featuresDir, 'tasks.feature')]

    const unusedSteps = analyzeStepUsage(stepFiles, featureFiles)

    expect(unusedSteps).toHaveLength(1)
    expect(unusedSteps[0].pattern).toBe('there are {int} items')
  })

  it('should handle multiple files correctly', () => {
    // Create multiple step files
    fs.writeFileSync(
      path.join(stepsDir, 'user.steps.js'),
      `
      Given('user exists', async function() {})
      When('user logs in', async function() {})
    `
    )

    fs.writeFileSync(
      path.join(stepsDir, 'admin.steps.js'),
      `
      Given('admin user exists', async function() {})  
      When('admin performs action', async function() {})
    `
    )

    // Create feature that only uses user steps
    fs.writeFileSync(
      path.join(featuresDir, 'user.feature'),
      `
      Feature: User Actions
      
      Scenario: User login
        Given user exists
        When user logs in
    `
    )

    const stepFiles = [
      path.join(stepsDir, 'user.steps.js'),
      path.join(stepsDir, 'admin.steps.js')
    ]
    const featureFiles = [path.join(featuresDir, 'user.feature')]

    const unusedSteps = analyzeStepUsage(stepFiles, featureFiles)

    expect(unusedSteps).toHaveLength(2)
    expect(unusedSteps.map((s) => s.pattern)).toEqual([
      'admin user exists',
      'admin performs action'
    ])
  })

  it('should return correct file names without full paths', () => {
    fs.writeFileSync(
      path.join(stepsDir, 'example.steps.js'),
      `
      Given('unused step', async function() {})
    `
    )

    fs.writeFileSync(
      path.join(featuresDir, 'example.feature'),
      `
      Feature: Example
      Scenario: Test
        Given some other step
    `
    )

    const stepFiles = [path.join(stepsDir, 'example.steps.js')]
    const featureFiles = [path.join(featuresDir, 'example.feature')]

    const unusedSteps = analyzeStepUsage(stepFiles, featureFiles)

    expect(unusedSteps).toHaveLength(1)
    expect(unusedSteps[0].file).toBe('example.steps.js')
  })
})
