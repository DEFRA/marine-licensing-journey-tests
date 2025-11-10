#!/usr/bin/env node

/**
 * Splits feature files into balanced shards for parallel execution
 * This ensures even distribution of scenarios across parallel workers
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FEATURES_DIR = path.join(__dirname, '../test/features')

function getFeatureScenarioCounts() {
  const features = []
  const files = fs
    .readdirSync(FEATURES_DIR)
    .filter((f) => f.endsWith('.feature'))

  for (const file of files) {
    const content = fs.readFileSync(path.join(FEATURES_DIR, file), 'utf8')
    const firstLine = content.split('\n')[0]

    // Check for excluded tags
    const excluded = /@(wip|bug|local-only|d365|real-defra-id|fivium)/.test(
      firstLine
    )
    const scenarioCount = (content.match(/Scenario:/g) || []).length

    if (!excluded && scenarioCount > 0) {
      features.push({
        file: `test/features/${file}`,
        scenarios: scenarioCount
      })
    }
  }

  return features
}

function createBalancedShards(features, numShards) {
  // Sort features by scenario count (descending) - largest first
  features.sort((a, b) => b.scenarios - a.scenarios)

  // Create empty shards
  const shards = Array.from({ length: numShards }, () => ({
    features: [],
    totalScenarios: 0
  }))

  // Greedy algorithm: assign each feature to the shard with fewest scenarios
  for (const feature of features) {
    // Find shard with minimum scenarios
    const minShard = shards.reduce(
      (min, shard, idx) =>
        shard.totalScenarios < min.shard.totalScenarios ? { shard, idx } : min,
      { shard: shards[0], idx: 0 }
    )

    minShard.shard.features.push(feature.file)
    minShard.shard.totalScenarios += feature.scenarios
  }

  return shards
}

// Main execution
const numShards = parseInt(process.env.MAX_INSTANCES) || 10
const features = getFeatureScenarioCounts()
const shards = createBalancedShards(features, numShards)

// Print distribution
console.log(
  `\n📊 Distributing ${features.length} features across ${numShards} shards:`
)
console.log('='.repeat(80))
shards.forEach((shard, idx) => {
  console.log(
    `Shard ${idx + 1}: ${shard.totalScenarios} scenarios (${shard.features.length} features)`
  )
  shard.features.forEach((f) => console.log(`  - ${path.basename(f)}`))
})
console.log('='.repeat(80))

// Export shards as JSON for consumption
const output = shards.map((shard) => shard.features)
console.log('\n' + JSON.stringify(output))
