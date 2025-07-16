/**
 * Simple Integration Tests
 * Testing actual functionality without complex mocking
 */

import fs from 'fs'
import { extractScenariosFromContent } from '../../src/parsers/gherkin-parser.js'
import {
  findFeatureFiles,
  lintFeatureFile
} from '../../src/processors/file-processor.js'
import { validateScenario } from '../../src/validators/step-validators.js'

const TEST_DATA = {
  VALID_SIMPLE_FEATURE: `
    Feature: User Login
    
    Scenario: Successful login
      Given I am on the login page
      When I enter valid credentials
      Then I should be logged in
  `,

  INVALID_TOO_MANY_STEPS: `
    Feature: Complex Process
    
    Scenario: Process with too many steps
      Given I am logged in
      And I navigate to the form
      And I fill in field 1
      When I submit the form
      And I wait for processing
      And I confirm the submission
      And I check the status
      Then I should see success
      And I should get an email
  `,

  SHOPPING_CART_FEATURE: `
    Feature: Shopping Cart
    
    Scenario: Add item to cart
      Given I have an empty cart
      When I add an item
      Then the cart should contain 1 item
      
    Scenario: Remove item from cart
      Given I have 1 item in my cart
      When I remove the item
      Then the cart should be empty
  `,

  EMPTY_CONTENT: '',

  NO_SCENARIOS_FEATURE: `
    Feature: Empty Feature
    As a user
    I want something
    So that I can do something
  `,

  KNOWN_VALID_FEATURE: `
    Feature: Simple Valid Feature
    
    Scenario: Short scenario
      Given a simple setup
      When an action occurs
      Then verify result
  `,

  KNOWN_INVALID_FEATURE: `
    Feature: Invalid Feature
    
    Scenario: Too many steps scenario
      Given step 1
      And step 2
      And step 3
      When step 4
      And step 5
      And step 6
      And step 7
      Then step 8
      And step 9
  `
}

const testWithTempFile = (content, maxSteps = 6) => {
  const tempFile = `temp-${Date.now()}.feature`
  fs.writeFileSync(tempFile, content)

  try {
    return lintFeatureFile(tempFile, maxSteps)
  } finally {
    fs.unlinkSync(tempFile)
  }
}

describe('Simple Integration Tests', () => {
  describe('End-to-End Feature File Validation', () => {
    it('should validate a simple valid feature file', () => {
      const violations = testWithTempFile(TEST_DATA.VALID_SIMPLE_FEATURE)
      expect(violations).toBe(0)
    })

    it('should detect violations in a feature file with too many steps', () => {
      const violations = testWithTempFile(TEST_DATA.INVALID_TOO_MANY_STEPS)
      expect(violations).toBeGreaterThan(0)
    })
  })

  describe('Parser Integration', () => {
    it('should parse and extract scenarios correctly', () => {
      const scenarios = extractScenariosFromContent(
        TEST_DATA.SHOPPING_CART_FEATURE
      )

      expect(scenarios).toHaveLength(2)
      expect(scenarios[0].name).toBe('Add item to cart')
      expect(scenarios[1].name).toBe('Remove item from cart')
      expect(scenarios[0].steps).toHaveLength(3)
      expect(scenarios[1].steps).toHaveLength(3)
    })
  })

  describe('Validator Integration', () => {
    it('should validate scenario step counts', () => {
      const validScenario = {
        name: 'Valid scenario',
        startLine: 1,
        steps: [
          { type: 'Given', lineNumber: 2 },
          { type: 'When', lineNumber: 3 },
          { type: 'Then', lineNumber: 4 }
        ],
        whenCount: 1,
        thenCount: 1
      }

      const violations = validateScenario(validScenario, 6)
      const stepCountViolations = violations.filter(
        (v) => v.type === 'step_count'
      )

      expect(stepCountViolations).toHaveLength(0)
    })

    it('should detect step count violations', () => {
      const invalidScenario = {
        name: 'Invalid scenario',
        startLine: 1,
        steps: new Array(8).fill().map((_, i) => ({
          type: i === 0 ? 'Given' : i < 4 ? 'And' : i === 4 ? 'When' : 'Then',
          lineNumber: i + 2
        })),
        whenCount: 1,
        thenCount: 4
      }

      const violations = validateScenario(invalidScenario, 6)
      const stepCountViolations = violations.filter(
        (v) => v.type === 'step_count'
      )

      expect(stepCountViolations).toHaveLength(1)
      expect(stepCountViolations[0].stepCount).toBe(8)
    })

    it('should detect multiple behaviour violations', () => {
      const multipleWhenThenScenario = {
        name: 'Multiple behaviours',
        startLine: 1,
        steps: [
          { type: 'Given', lineNumber: 2 },
          { type: 'When', lineNumber: 3 },
          { type: 'Then', lineNumber: 4 },
          { type: 'When', lineNumber: 5 },
          { type: 'Then', lineNumber: 6 }
        ],
        whenCount: 2,
        thenCount: 2
      }

      const violations = validateScenario(multipleWhenThenScenario, 6)
      const behaviourViolations = violations.filter(
        (v) => v.type === 'multiple_behaviours'
      )

      expect(behaviourViolations).toHaveLength(1)
      expect(behaviourViolations[0].whenCount).toBe(2)
      expect(behaviourViolations[0].thenCount).toBe(2)
    })
  })

  describe('Additional Validation Cases', () => {
    it('should validate minimal valid feature', () => {
      const violations = testWithTempFile(TEST_DATA.KNOWN_VALID_FEATURE)
      expect(violations).toBe(0)
    })

    it('should detect clear step count violations', () => {
      const violations = testWithTempFile(TEST_DATA.KNOWN_INVALID_FEATURE)
      expect(violations).toBeGreaterThan(0)
    })
  })

  describe('Configuration Testing', () => {
    it('should respect different step limits', () => {
      const scenario = {
        name: 'Test scenario',
        startLine: 1,
        steps: new Array(5).fill().map((_, i) => ({
          type: 'Given',
          lineNumber: i + 2
        })),
        whenCount: 0,
        thenCount: 0
      }

      // With strict limit
      const strictViolations = validateScenario(scenario, 3)
      const strictStepViolations = strictViolations.filter(
        (v) => v.type === 'step_count'
      )
      expect(strictStepViolations).toHaveLength(1)

      // With lenient limit
      const lenientViolations = validateScenario(scenario, 10)
      const lenientStepViolations = lenientViolations.filter(
        (v) => v.type === 'step_count'
      )
      expect(lenientStepViolations).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty feature files', () => {
      const violations = testWithTempFile(TEST_DATA.EMPTY_CONTENT)
      expect(violations).toBe(0)
    })

    it('should handle feature files with no scenarios', () => {
      const violations = testWithTempFile(TEST_DATA.NO_SCENARIOS_FEATURE)
      expect(violations).toBe(0)
    })

    it('should handle scenarios with no steps', () => {
      const emptyScenario = {
        name: 'Empty scenario',
        startLine: 1,
        steps: [],
        whenCount: 0,
        thenCount: 0
      }

      const violations = validateScenario(emptyScenario, 6)
      const stepCountViolations = violations.filter(
        (v) => v.type === 'step_count'
      )

      expect(stepCountViolations).toHaveLength(0)
    })
  })

  describe('Pattern-Based Feature File Discovery', () => {
    it('should find feature files using test data pattern', async () => {
      const testDataPattern = 'tests/test-data/**/*.feature'
      const files = await findFeatureFiles(testDataPattern)

      expect(files.length).toBeGreaterThan(0)
      expect(
        files.some((file) => file.includes('too-many-steps.feature'))
      ).toBe(true)
      expect(files.some((file) => file.includes('simple-valid.feature'))).toBe(
        true
      )
    })

    it('should handle patterns that match no files', async () => {
      const nonExistentPattern = 'nonexistent/path/**/*.feature'
      const files = await findFeatureFiles(nonExistentPattern)

      expect(files).toHaveLength(0)
    })
  })
})
