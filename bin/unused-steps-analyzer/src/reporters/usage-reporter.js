/**
 * Usage Reporter Module
 * Formats and displays unused step analysis results
 */

/**
 * Report the results of unused step analysis
 */
export function reportResults(unusedSteps) {
  if (unusedSteps.length === 0) {
    console.log('✅ No unused step definitions found!')
    return 0
  }

  console.log(
    `❌ Found ${unusedSteps.length} potentially unused step definitions:\n`
  )

  const groupedResults = groupResultsByFile(unusedSteps)
  displayGroupedResults(groupedResults)
  displaySummary(unusedSteps.length)

  return 1
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
 * Display summary information
 */
function displaySummary(totalCount) {
  console.log(
    `💡 Total: ${totalCount} step definitions can potentially be removed`
  )
  console.log(`\n🔧 Run 'npm run lint:unused-steps' to see this report again`)
}
