/**
 * Feature Parser Unit Tests
 */

import {
  isStepPatternUsed,
  stepPatternToRegex
} from '../../src/parsers/feature-parser.js'

describe('Feature Parser', () => {
  describe('stepPatternToRegex', () => {
    it('should convert {string} parameters to quoted string patterns', () => {
      const pattern = 'the {string} task is selected'
      const regex = stepPatternToRegex(pattern)

      expect(regex.test('When the "Project name" task is selected')).toBe(true)
      expect(regex.test('When the "Activity dates" task is selected')).toBe(
        true
      )
      expect(regex.test('When the task is selected')).toBe(false) // No quotes
    })

    it('should convert {int} parameters to number patterns', () => {
      const pattern = 'there are {int} items'
      const regex = stepPatternToRegex(pattern)

      expect(regex.test('Given there are 5 items')).toBe(true)
      expect(regex.test('Given there are 123 items')).toBe(true)
      expect(regex.test('Given there are abc items')).toBe(false)
    })

    it('should handle {int} parameters with Scenario Outline variables', () => {
      const pattern =
        'the {int} point random polygon coordinates are entered using add another point'
      const regex = stepPatternToRegex(pattern)

      // Should match Scenario Outline variables like <coordinateCount>
      expect(
        regex.test(
          'When the <coordinateCount> point random polygon coordinates are entered using add another point'
        )
      ).toBe(true)
      // Should also still match actual numbers
      expect(
        regex.test(
          'When the 5 point random polygon coordinates are entered using add another point'
        )
      ).toBe(true)
    })

    it('should handle multiple parameters', () => {
      const pattern = 'the {string} task status is {string}'
      const regex = stepPatternToRegex(pattern)

      expect(
        regex.test('Then the "Project name" task status is "Completed"')
      ).toBe(true)
      expect(
        regex.test('Then the "Site details" task status is "Incomplete"')
      ).toBe(true)
      expect(regex.test('Then the task status is')).toBe(false)
    })

    it('should escape special regex characters', () => {
      const pattern = 'user clicks button (advanced)'
      const regex = stepPatternToRegex(pattern)

      expect(regex.test('When user clicks button (advanced)')).toBe(true)
      expect(regex.test('When user clicks button advanced')).toBe(false)
    })

    it('should be case insensitive', () => {
      const pattern = 'the user logs in'
      const regex = stepPatternToRegex(pattern)

      expect(regex.test('Given the user logs in')).toBe(true)
      expect(regex.test('Given THE USER LOGS IN')).toBe(true)
      expect(regex.test('Given The User Logs In')).toBe(true)
    })
  })

  describe('isStepPatternUsed', () => {
    const featureContent = `
      Feature: User Management
      
      Scenario: User login
        Given the user is on the login page  
        When the user enters valid credentials
        Then the "Dashboard" page is displayed
        
      Scenario: Task selection
        When the "Project name" task is selected
        Then the "Project name" task status is "Completed"
    `

    it('should detect used step patterns', () => {
      expect(
        isStepPatternUsed('the user is on the login page', featureContent)
      ).toBe(true)
      expect(
        isStepPatternUsed('the {string} page is displayed', featureContent)
      ).toBe(true)
      expect(
        isStepPatternUsed('the {string} task is selected', featureContent)
      ).toBe(true)
    })

    it('should detect unused step patterns', () => {
      expect(isStepPatternUsed('the user clicks logout', featureContent)).toBe(
        false
      )
      expect(
        isStepPatternUsed('the {string} form is submitted', featureContent)
      ).toBe(false)
    })

    it('should handle complex parameter patterns', () => {
      expect(
        isStepPatternUsed(
          'the {string} task status is {string}',
          featureContent
        )
      ).toBe(true)
    })
  })
})
