/**
 * Standards Violation Reporter Module
 * Formats and displays BDD standards violation messages
 */

/**
 * Report a single violation
 */
export function reportViolation(violation, maxSteps) {
  const reporters = {
    step_count: () => reportStepCountViolation(violation, maxSteps),
    when_before_given: () =>
      reportOrderViolation(
        violation,
        'Gherkin scenarios must start with "Given" steps to establish context.'
      ),
    then_before_when: () =>
      reportOrderViolation(
        violation,
        '"Then" steps must come after "When" steps in Gherkin scenarios.'
      ),
    given_after_when_then: () =>
      reportOrderViolation(
        violation,
        'All "Given" steps must come before "When" and "Then" steps.'
      ),
    when_after_then: () =>
      reportOrderViolation(
        violation,
        '"When" steps must come before "Then" steps in Gherkin scenarios.'
      ),
    multiple_behaviours: () => reportMultipleBehavioursViolation(violation)
  }

  const reporter = reporters[violation.type]
  if (!reporter) {
    console.error(
      `  Line ${violation.lineNumber}: Unknown violation in scenario "${violation.scenarioName}"`
    )
    return
  }

  reporter()
}

/**
 * Report step count violation
 */
function reportStepCountViolation(violation, maxSteps) {
  console.error(
    `  Line ${violation.lineNumber}: Scenario "${violation.scenarioName}" has ${violation.stepCount} steps (max: ${maxSteps})`
  )
  console.error(
    '    Consider breaking this scenario into smaller, more focused scenarios.'
  )
}

/**
 * Report step order violation
 */
function reportOrderViolation(violation, advice) {
  console.error(
    `  Line ${violation.stepLineNumber}: "${violation.stepType}" step appears ${getOrderDescription(violation.type)} in scenario "${violation.scenarioName}"`
  )
  console.error(`    ${advice}`)
}

/**
 * Get order description for violation type
 */
function getOrderDescription(violationType) {
  const descriptions = {
    when_before_given: 'before any "Given" step',
    then_before_when: 'before any "When" step',
    given_after_when_then: 'after "When" or "Then" steps',
    when_after_then: 'after "Then" step'
  }
  return descriptions[violationType] || 'in wrong order'
}

/**
 * Report multiple behaviours violation
 */
function reportMultipleBehavioursViolation(violation) {
  console.error(
    `  Line ${violation.lineNumber}: Scenario "${violation.scenarioName}" has multiple behaviours (${violation.whenCount} When, ${violation.thenCount} Then)`
  )
  console.error(
    '    Each scenario should test a single behaviour. Consider splitting into separate scenarios.'
  )
}

/**
 * Print helpful tips for fixing violations
 */
export function printFixingTips() {
  console.error('\n💡 Tips for fixing BDD standards violations:')
  console.error('\n   📊 Step Count Issues:')
  console.error('   • Break complex scenarios into multiple focused scenarios')
  console.error('   • Consider using Background for common setup steps')
  console.error(
    '   • Group related assertions into single Then steps where appropriate'
  )
  console.error('   • Extract complex workflows into separate scenarios')
  console.error('\n   📋 Step Order Issues:')
  console.error('   • Always use Given-When-Then order in scenarios')
  console.error('   • Start scenarios with Given steps to establish context')
  console.error('   • Use When steps to describe the action being tested')
  console.error('   • Use Then steps to verify the expected outcome')
  console.error('   • Use And/But to continue the previous step type')
  console.error('\n   🎯 Single Behaviour Issues:')
  console.error('   • Each scenario should test one specific behaviour')
  console.error('   • Split scenarios with multiple When-Then pairs')
  console.error('   • Consider if complex scenarios need to be separate tests')
}
