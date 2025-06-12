/**
 * BDD Standards Validators Module
 * Validates scenarios against established BDD standards and best practices
 */

/**
 * Validate a single scenario against all rules
 */
export function validateScenario(scenario, maxSteps) {
  const violations = []

  violations.push(...validateStepCount(scenario, maxSteps))
  violations.push(...validateStepOrder(scenario))
  violations.push(...validateSingleBehaviour(scenario))

  return violations
}

/**
 * Validate step count rule
 */
export function validateStepCount(scenario, maxSteps) {
  if (scenario.steps.length <= maxSteps) return []

  return [
    {
      type: 'step_count',
      scenarioName: scenario.name,
      stepCount: scenario.steps.length,
      lineNumber: scenario.startLine
    }
  ]
}

/**
 * Validate step order rule
 */
export function validateStepOrder(scenario) {
  const context = createValidationContext(scenario)

  for (const step of scenario.steps) {
    processStep(step, context)
  }

  return context.violations
}

/**
 * Validate single behaviour rule
 */
export function validateSingleBehaviour(scenario) {
  if (scenario.whenCount <= 1 && scenario.thenCount <= 1) return []

  return [
    {
      type: 'multiple_behaviours',
      scenarioName: scenario.name,
      whenCount: scenario.whenCount,
      thenCount: scenario.thenCount,
      lineNumber: scenario.startLine
    }
  ]
}

/**
 * Create validation context parameter object
 */
function createValidationContext(scenario) {
  return {
    scenario,
    violations: [],
    hasGiven: false,
    hasWhen: false,
    hasThen: false
  }
}

/**
 * Process a single step and update validation context
 */
function processStep(step, context) {
  const stepHandlers = {
    Given: () => handleGivenStep(step, context),
    When: () => handleWhenStep(step, context),
    Then: () => handleThenStep(step, context)
  }

  const handler = stepHandlers[step.type]
  if (handler) {
    handler()
  }
}

/**
 * Handle Given step validation
 */
function handleGivenStep(step, context) {
  if (context.hasWhen || context.hasThen) {
    context.violations.push(
      createOrderViolation('given_after_when_then', context.scenario, step)
    )
  }
  context.hasGiven = true
}

/**
 * Handle When step validation
 */
function handleWhenStep(step, context) {
  if (!context.hasGiven) {
    context.violations.push(
      createOrderViolation('when_before_given', context.scenario, step)
    )
  }
  if (context.hasThen) {
    context.violations.push(
      createOrderViolation('when_after_then', context.scenario, step)
    )
  }
  context.hasWhen = true
}

/**
 * Handle Then step validation
 */
function handleThenStep(step, context) {
  if (!context.hasWhen) {
    context.violations.push(
      createOrderViolation('then_before_when', context.scenario, step)
    )
  }
  context.hasThen = true
}

/**
 * Create a step order violation
 */
function createOrderViolation(violationType, scenario, step) {
  return {
    type: violationType,
    scenarioName: scenario.name,
    stepType: step.type,
    stepLineNumber: step.lineNumber,
    lineNumber: scenario.startLine
  }
}
