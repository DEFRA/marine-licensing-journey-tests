/**
 * Summary Generator for Rules
 *
 * This script helps generate standardized summaries for the remaining rules.
 * It reads the rule files, extracts key information, and creates summary files
 * in the established format.
 */

import { exec as execCallback } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const exec = promisify(execCallback)

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Config - Fix paths by removing the .cursor prefix
const RULES_DIR = path.join(__dirname, 'rules')
const SUMMARIES_DIR = path.join(__dirname, 'rules/summaries')
const RULES_JSON = path.join(__dirname, 'cursor.rules.json')

async function loadRulesData() {
  const rulesJson = await fs.readFile(RULES_JSON, 'utf8')
  return JSON.parse(rulesJson)
}

async function getExistingSummaries() {
  try {
    const files = await fs.readdir(SUMMARIES_DIR)
    return files.filter((file) => file.endsWith('.summary.md'))
  } catch (err) {
    console.error('Error reading summaries directory:', err)
    return []
  }
}

async function createSummary(ruleName, ruleData) {
  // Fix paths by removing the .cursor prefix
  const fullRulePath = path.join(RULES_DIR, `${ruleName}.mdc`)
  const summaryPath = path.join(SUMMARIES_DIR, `${ruleName}.summary.md`)

  console.log(`Processing ${ruleName}...`)
  console.log(`Rule path: ${fullRulePath}`)
  console.log(`Summary path: ${summaryPath}`)

  // Check if summary already exists
  try {
    await fs.access(summaryPath)
    console.log(`Summary for ${ruleName} already exists, skipping...`)
    return false
  } catch (err) {
    // File doesn't exist, proceed with creation
    console.log(`Summary doesn't exist yet, creating...`)
  }

  // Read the rule content
  let ruleContent
  try {
    ruleContent = await fs.readFile(fullRulePath, 'utf8')
  } catch (err) {
    console.error(`Error reading rule file ${fullRulePath}:`, err)
    return false
  }

  // Extract the rule title (first heading)
  const titleMatch = ruleContent.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : ruleName

  // Create a basic summary structure
  const summary = [
    `# ${title}`,
    '',
    '## Core Principle',
    `${ruleData.summary}`,
    '',
    '## When to Apply'
  ]

  // Extract "when to apply" from the description
  const whenToApply = ruleData.description
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.startsWith('when '))
    .map((item) => `- ${item.replace('when ', '')}`)

  summary.push(...whenToApply)
  summary.push('')
  summary.push('## Key Guidelines')

  // Look for sections with guidelines, principles, or approaches
  const sections = ruleContent.split(/^## /m).slice(1)
  let guidelinesFound = false

  // Try to find a section that looks like it contains guidelines
  for (const section of sections) {
    const sectionTitle = section.split('\n')[0]
    if (
      sectionTitle.toLowerCase().includes('principle') ||
      sectionTitle.toLowerCase().includes('guideline') ||
      sectionTitle.toLowerCase().includes('approach') ||
      sectionTitle.toLowerCase().includes('practice') ||
      sectionTitle.toLowerCase().includes('core')
    ) {
      // Extract bullet points
      const bulletPoints = section
        .split('\n')
        .filter(
          (line) =>
            line.trim().startsWith('-') ||
            line.trim().startsWith('*') ||
            line.trim().match(/^\d+\./)
        )
        .map((line, index) => {
          const cleanLine = line
            .trim()
            .replace(/^[-*]\s*/, '')
            .replace(/^\d+\.\s*/, '')
          // Extract a potential bold title if it exists
          const boldMatch = cleanLine.match(/\*\*([^*]+)\*\*(.+)/)
          if (boldMatch) {
            return `${index + 1}. **${boldMatch[1]}** -${boldMatch[2]}`
          } else {
            // Try to create a title from the first few words
            const words = cleanLine.split(' ')
            const title = words.slice(0, Math.min(3, words.length)).join(' ')
            const rest = words.slice(Math.min(3, words.length)).join(' ')
            return `${index + 1}. **${title}** - ${rest}`
          }
        })
        .slice(0, 5) // Limit to 5 guidelines

      if (bulletPoints.length > 0) {
        summary.push(...bulletPoints)
        guidelinesFound = true
        break
      }
    }
  }

  // If no guidelines found, create placeholder guidelines
  if (!guidelinesFound) {
    summary.push('1. **Guideline 1** - Brief explanation')
    summary.push('2. **Guideline 2** - Brief explanation')
    summary.push('3. **Guideline 3** - Brief explanation')
    summary.push('4. **Guideline 4** - Brief explanation')
    summary.push('5. **Guideline 5** - Brief explanation')
  }

  summary.push('')
  summary.push('## Examples')
  summary.push('| Scenario | Application |')
  summary.push('|----------|------------|')

  // Look for examples in the content
  const exampleMatch = ruleContent.match(/```[^`]+```/g)
  if (exampleMatch && exampleMatch.length > 0) {
    summary.push('| Code example | Follows established patterns |')
  } else {
    // Try to find other examples in sections
    for (const section of sections) {
      if (
        section.toLowerCase().includes('example') ||
        section.toLowerCase().includes('scenario') ||
        section.toLowerCase().includes('usage')
      ) {
        summary.push(
          '| Domain-specific | Application matches real-world usage |'
        )
        break
      }
    }
  }

  // Add at least one example row if none found
  if (summary[summary.length - 1] === '|----------|------------|') {
    summary.push('| Typical use case | How to apply the rule effectively |')
  }

  summary.push('')
  summary.push('## Related Rules')

  // Find related rules based on category
  const allRules = await loadRulesData()
  const relatedRules = allRules.rules
    .filter(
      (r) =>
        r.name !== ruleData.name &&
        (r.category === ruleData.category ||
          (ruleData.tags &&
            r.tags &&
            r.tags.some((tag) => ruleData.tags.includes(tag))))
    )
    .slice(0, 3)

  for (const related of relatedRules) {
    const shortName = related.name.split('/').pop()
    summary.push(
      `- [${shortName}](../${shortName}.mdc) - ${related.summary.split('.')[0]}`
    )
  }

  // Write the summary to file
  try {
    await fs.writeFile(summaryPath, summary.join('\n'), 'utf8')
    console.log(`Created summary for ${ruleName} at ${summaryPath}`)
    return true
  } catch (err) {
    console.error(`Error writing summary for ${ruleName}:`, err)
    return false
  }
}

async function main() {
  // Load rules data
  const rulesData = await loadRulesData()
  const existingSummaries = await getExistingSummaries()

  console.log('Existing summaries:', existingSummaries)

  // Filter to rules that don't have summaries yet
  const pendingRules = rulesData.rules.filter((rule) => {
    const shortName = rule.name.split('/').pop()
    const summaryFileName = `${shortName}.summary.md`
    return !existingSummaries.includes(summaryFileName)
  })

  // Sort by priority
  pendingRules.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  console.log(`Found ${pendingRules.length} rules without summaries.`)

  // Generate summaries
  let created = 0
  for (const rule of pendingRules) {
    const shortName = rule.name.split('/').pop()
    const success = await createSummary(shortName, rule)
    if (success) created++
  }

  console.log(`Created ${created} summaries.`)
}

main().catch(console.error)
