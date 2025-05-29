/**
 * Progressive Rule Loading Utility
 *
 * This script demonstrates the approach for loading rules in a progressive manner,
 * starting with metadata, then summaries, and finally full content when needed.
 *
 * Usage:
 * const ruleFetcher = require('./.cursor/fetch_rule');
 *
 * // Get rule metadata only
 * const ruleMeta = ruleFetcher.getRuleMetadata('code.generation');
 *
 * // Get rule summary
 * const ruleSummary = await ruleFetcher.getRuleSummary('code.generation');
 *
 * // Get full rule content (only when necessary)
 * const fullRule = await ruleFetcher.getFullRuleContent('code.generation');
 *
 * // Find relevant rules by category
 * const testingRules = ruleFetcher.findRulesByCategory('testing-methodology');
 *
 * // Find rules by tags
 * const simplificationRules = ruleFetcher.findRulesByTags(['simplicity', 'yagni']);
 *
 * // Get a predefined bundle
 * const docRules = ruleFetcher.getRuleBundle('documentation_updates');
 */

const fs = require('fs').promises
const path = require('path')

// Cache for rules metadata
let rulesMetadata = null
let ruleBundles = null

/**
 * Load the rules metadata from cursor.rules.json
 */
async function loadRulesMetadata() {
  if (rulesMetadata) return rulesMetadata

  const rulesFile = path.join(__dirname, 'cursor.rules.json')
  const data = await fs.readFile(rulesFile, 'utf8')
  const parsed = JSON.parse(data)

  rulesMetadata = parsed.rules
  ruleBundles = parsed.rule_bundles

  return rulesMetadata
}

/**
 * Get metadata for a specific rule
 * @param {string} ruleName - Short name of the rule (e.g., 'code.generation')
 */
async function getRuleMetadata(ruleName) {
  const rules = await loadRulesMetadata()
  const fullName = `marine-licensing-journey-tests/${ruleName}`
  return rules.find((r) => r.name === fullName)
}

/**
 * Get the summary content for a rule
 * @param {string} ruleName - Short name of the rule
 */
async function getRuleSummary(ruleName) {
  const metadata = await getRuleMetadata(ruleName)
  if (!metadata) return null

  try {
    const summaryPath = metadata.summary_file
    return await fs.readFile(summaryPath, 'utf8')
  } catch (err) {
    console.error(`Error loading summary for ${ruleName}:`, err)
    return null
  }
}

/**
 * Get the full content for a rule (only when necessary)
 * @param {string} ruleName - Short name of the rule
 */
async function getFullRuleContent(ruleName) {
  const metadata = await getRuleMetadata(ruleName)
  if (!metadata) return null

  try {
    const rulePath = metadata.glob
    return await fs.readFile(rulePath, 'utf8')
  } catch (err) {
    console.error(`Error loading full content for ${ruleName}:`, err)
    return null
  }
}

/**
 * Find rules by category
 * @param {string} category - Category to search for
 */
async function findRulesByCategory(category) {
  const rules = await loadRulesMetadata()
  return rules.filter((r) => r.category === category)
}

/**
 * Find rules by tags
 * @param {string[]} tags - Array of tags to search for
 */
async function findRulesByTags(tags) {
  const rules = await loadRulesMetadata()
  return rules.filter((r) => {
    if (!r.tags) return false
    return tags.some((tag) => r.tags.includes(tag))
  })
}

/**
 * Get a predefined bundle of rules
 * @param {string} bundleName - Name of the bundle
 */
async function getRuleBundle(bundleName) {
  await loadRulesMetadata() // Ensure bundles are loaded

  if (!ruleBundles || !ruleBundles[bundleName]) {
    return null
  }

  const bundleRuleNames = ruleBundles[bundleName]
  const rules = await loadRulesMetadata()

  return rules.filter((r) => bundleRuleNames.includes(r.name))
}

/**
 * Find most relevant rules for a query
 * @param {string} query - User query text
 * @param {number} limit - Maximum number of rules to return
 */
async function findRelevantRules(query, limit = 3) {
  const rules = await loadRulesMetadata()

  // Simple relevance scoring - in a real implementation, this would use
  // more sophisticated semantic matching
  const scoredRules = rules.map((rule) => {
    const words = query.toLowerCase().split(/\s+/)

    // Calculate a simple relevance score
    let score = 0

    // Check description
    if (rule.description) {
      words.forEach((word) => {
        if (rule.description.toLowerCase().includes(word)) score += 2
      })
    }

    // Check tags
    if (rule.tags) {
      words.forEach((word) => {
        rule.tags.forEach((tag) => {
          if (tag.includes(word)) score += 3
        })
      })
    }

    // Check category
    if (rule.category) {
      words.forEach((word) => {
        if (rule.category.includes(word)) score += 4
      })
    }

    // Boost by priority
    if (rule.priority === 'high') score *= 1.5

    return { rule, score }
  })

  // Sort by score and take top results
  return scoredRules
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.rule)
}

module.exports = {
  getRuleMetadata,
  getRuleSummary,
  getFullRuleContent,
  findRulesByCategory,
  findRulesByTags,
  getRuleBundle,
  findRelevantRules
}
