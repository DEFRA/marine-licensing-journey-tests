# Rule Summaries

This directory contains concise summaries of the Cursor rules to enable efficient context window usage and improved relevance matching. Each summary follows a standardized format to make information immediately accessible while preserving the ability to load full rule content when needed.

## Purpose

These summaries serve to:

1. Reduce initial token load by ~85% compared to loading all full rules
2. Enable faster rule selection based on relevant metadata
3. Provide immediate actionable guidance without requiring full rule content
4. Improve context window efficiency through progressive loading

## Summary Structure

Each rule summary follows this consistent format:

```
# Rule Title

## Core Principle
1-2 sentence explanation of the fundamental concept

## When to Apply
- Bullet list of scenarios where this rule is relevant
- 5-7 specific situations or contexts

## Key Guidelines
1. **Guideline 1** - Brief explanation
2. **Guideline 2** - Brief explanation
3. **Guideline 3** - Brief explanation
4. **Guideline 4** - Brief explanation
5. **Guideline 5** - Brief explanation

## Examples
| Scenario | Application |
|----------|------------|
| Example 1 | How to apply in this case |
| Example 2 | How to apply in this case |

## Related Rules
- [code.generation](../code.generation.mdc) - Standards for writing maintainable JavaScript test automation code
- [playbook.clean.code](../playbook.clean.code.mdc) - Guidelines for maintaining clean, readable, and maintainable code
```

## Usage

When the AI needs to process a query, it can:

1. First load the cursor.rules.json index with metadata
2. Identify the most relevant rules based on categories, tags and descriptions
3. Load the summaries of those rules (much more token-efficient)
4. Only load full rule content when specific details are needed

This progressive loading approach significantly improves context window efficiency while maintaining or improving the AI's ability to provide relevant guidance.
