/**
 * Step Parser Unit Tests
 */

import fs from 'fs'
import { extractStepDefinitions } from '../../src/parsers/step-parser.js'

describe('Step Parser', () => {
  describe('extractStepDefinitions', () => {
    it('should extract Given step definitions from string content', () => {
      const stepFileContent = `
        import { Given } from '@cucumber/cucumber'
        
        Given('the user is on the login page', async function() {
          // implementation
        })
        
        Given('the user has valid credentials', async function() {
          // implementation  
        })
      `

      // Create a temporary file for testing
      const tempFile = '/tmp/test-steps.js'
      fs.writeFileSync(tempFile, stepFileContent)

      try {
        const result = extractStepDefinitions(tempFile)

        expect(result).toHaveLength(2)
        expect(result[0]).toEqual({
          type: 'Given',
          pattern: 'the user is on the login page',
          file: tempFile
        })
        expect(result[1]).toEqual({
          type: 'Given',
          pattern: 'the user has valid credentials',
          file: tempFile
        })
      } finally {
        fs.unlinkSync(tempFile)
      }
    })

    it('should extract When and Then step definitions', () => {
      const stepFileContent = `
        When('the user clicks {string}', async function(buttonText) {
          // implementation
        })
        
        Then('the {string} page is displayed', async function(pageName) {
          // implementation
        })
      `

      const tempFile = '/tmp/test-steps2.js'
      fs.writeFileSync(tempFile, stepFileContent)

      try {
        const result = extractStepDefinitions(tempFile)

        expect(result).toHaveLength(2)
        expect(result[0].type).toBe('When')
        expect(result[0].pattern).toBe('the user clicks {string}')
        expect(result[1].type).toBe('Then')
        expect(result[1].pattern).toBe('the {string} page is displayed')
      } finally {
        fs.unlinkSync(tempFile)
      }
    })

    it('should handle empty step files', () => {
      const tempFile = '/tmp/empty-steps.js'
      fs.writeFileSync(tempFile, '// empty file')

      try {
        const result = extractStepDefinitions(tempFile)
        expect(result).toHaveLength(0)
      } finally {
        fs.unlinkSync(tempFile)
      }
    })

    it('should handle different quote styles', () => {
      const stepFileContent = `
        Given('single quotes', async function() {})
        When("double quotes", async function() {})
        Then(\`template literals\`, async function() {})
      `

      const tempFile = '/tmp/quotes-test.js'
      fs.writeFileSync(tempFile, stepFileContent)

      try {
        const result = extractStepDefinitions(tempFile)

        expect(result).toHaveLength(3)
        expect(result.map((r) => r.pattern)).toEqual([
          'single quotes',
          'double quotes',
          'template literals'
        ])
      } finally {
        fs.unlinkSync(tempFile)
      }
    })
  })
})
