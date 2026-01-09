/**
 * Usage Reporter Unit Tests
 */

import {
  groupResultsByFile,
  reportResults
} from '../../src/reporters/usage-reporter.js'

describe('Usage Reporter', () => {
  describe('groupResultsByFile', () => {
    it('should group steps by filename', () => {
      const unusedSteps = [
        { type: 'Given', pattern: 'step 1', file: 'login.steps.js' },
        { type: 'When', pattern: 'step 2', file: 'login.steps.js' },
        { type: 'Then', pattern: 'step 3', file: 'dashboard.steps.js' },
        { type: 'Given', pattern: 'step 4', file: 'dashboard.steps.js' }
      ]

      const result = groupResultsByFile(unusedSteps)

      expect(result).toEqual({
        'login.steps.js': [
          { type: 'Given', pattern: 'step 1', file: 'login.steps.js' },
          { type: 'When', pattern: 'step 2', file: 'login.steps.js' }
        ],
        'dashboard.steps.js': [
          { type: 'Then', pattern: 'step 3', file: 'dashboard.steps.js' },
          { type: 'Given', pattern: 'step 4', file: 'dashboard.steps.js' }
        ]
      })
    })

    it('should handle empty input', () => {
      const result = groupResultsByFile([])

      expect(result).toEqual({})
    })

    it('should handle single file', () => {
      const unusedSteps = [
        { type: 'Given', pattern: 'only step', file: 'single.steps.js' }
      ]

      const result = groupResultsByFile(unusedSteps)

      expect(result).toEqual({
        'single.steps.js': [
          { type: 'Given', pattern: 'only step', file: 'single.steps.js' }
        ]
      })
    })
  })

  describe('reportResults', () => {
    it('should return success code when no unused or duplicate steps found', () => {
      const exitCode = reportResults({ unusedSteps: [], duplicateSteps: [] })
      expect(exitCode).toBe(0)
    })

    it('should return failure code when unused steps found', () => {
      const unusedSteps = [
        { type: 'Given', pattern: 'unused step 1', file: 'test1.steps.js' },
        { type: 'When', pattern: 'unused step 2', file: 'test2.steps.js' }
      ]

      const exitCode = reportResults({ unusedSteps, duplicateSteps: [] })
      expect(exitCode).toBe(1)
    })

    it('should return failure code when duplicate steps found', () => {
      const duplicateSteps = [
        {
          type: 'Given',
          pattern: 'duplicate step',
          count: 2,
          files: ['test1.steps.js', 'test2.steps.js']
        }
      ]

      const exitCode = reportResults({ unusedSteps: [], duplicateSteps })
      expect(exitCode).toBe(1)
    })

    it('should return failure code when both unused and duplicate steps found', () => {
      const unusedSteps = [
        { type: 'Given', pattern: 'unused step', file: 'test1.steps.js' }
      ]
      const duplicateSteps = [
        {
          type: 'When',
          pattern: 'duplicate step',
          count: 2,
          files: ['test2.steps.js', 'test3.steps.js']
        }
      ]

      const exitCode = reportResults({ unusedSteps, duplicateSteps })
      expect(exitCode).toBe(1)
    })
  })
})
