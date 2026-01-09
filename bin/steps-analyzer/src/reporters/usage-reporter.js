/**
 * Usage Reporter Module
 * Formats and displays step analysis results (unused and duplicate steps)
 */

/**
 * Report the results of step analysis
 */
export function reportResults(analysisResults) {
  const { unusedSteps, duplicateSteps } = analysisResults
  let hasErrors = false

  // Report unused steps
  if (unusedSteps.length === 0) {
    console.log('✅ No unused step definitions found!')
  } else {
    console.log(
      `❌ Found ${unusedSteps.length} potentially unused step definitions:\n`
    )
    const groupedResults = groupResultsByFile(unusedSteps)
    displayGroupedResults(groupedResults)
    displayUnusedSummary(unusedSteps.length)
    hasErrors = true
  }

  // Report duplicate steps
  if (duplicateSteps.length === 0) {
    console.log('✅ No duplicate step definitions found!')
  } else {
    console.log(
      `❌ Found ${duplicateSteps.length} duplicate step definitions:\n`
    )
    displayDuplicateResults(duplicateSteps)
    displayDuplicateSummary(duplicateSteps.length)
    hasErrors = true
  }

  return hasErrors ? 1 : 0
}

/**
 * Group unused steps by file
 */
export function groupResultsByFile(unusedSteps) {
  return unusedSteps.reduce((acc, step) => {
    if (!acc[step.file]) acc[step.file] = []
    acc[step.file].push(step)
    return acc
  }, {})
}

/**
 * Display grouped results
 */
function displayGroupedResults(groupedResults) {
  Object.keys(groupedResults).forEach((file) => {
    const steps = groupedResults[file]
    console.log(`📄 ${file} (${steps.length} unused):`)

    steps.forEach((step) => {
      console.log(`  ${step.type}: "${step.pattern}"`)
    })

    console.log()
  })
}

/**
 * Display duplicate step results
 */
function displayDuplicateResults(duplicateSteps) {
  duplicateSteps.forEach((duplicate) => {
    console.log(`  ${duplicate.type}: "${duplicate.pattern}"`)
    console.log(`    Found in ${duplicate.count} files:`)
    duplicate.files.forEach((file) => {
      console.log(`      - ${file}`)
    })
    console.log()
  })
}

/**
 * Display unused steps summary information
 */
function displayUnusedSummary(totalCount) {
  console.log(
    `💡 Total: ${totalCount} step definitions can potentially be removed`
  )
}

/**
 * Display duplicate steps summary information
 */
function displayDuplicateSummary(totalCount) {
  console.log(
    `💡 Total: ${totalCount} duplicate step definitions should be consolidated`
  )
  console.log(`\n🔧 Run 'npm run lint:steps' to see this report again`)
}
