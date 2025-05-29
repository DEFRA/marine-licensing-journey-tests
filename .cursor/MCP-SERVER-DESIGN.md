# Progressive Rules MCP Server Design

This document outlines the design and implementation plan for a custom Model Context Protocol (MCP) server focused on progressive rule loading to optimize context window usage.

## Overview

The Progressive Rules MCP server will provide intelligent, context-efficient rule loading for AI assistants, ensuring the most relevant guidance is available while minimizing token usage. It implements the three-tier approach (metadata, summaries, full content) as first-class MCP tools.

## Continuous Learning from Agent Interactions

A key enhancement to the standard MCP server design is a system for continuous learning and improvement based on actual agent interactions. This allows the system to become more efficient and relevant over time.

### Interaction History Storage

```
┌────────────────────────────────────┐
│     Agent Interaction Database     │
├────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Chat Context │ │ Rule Usage   │  │
│ └──────────────┘ └──────────────┘  │
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Effectiveness│ │ Follow-up    │  │
│ │   Metrics    │ │  Patterns    │  │
│ └──────────────┘ └──────────────┘  │
└────────────────────────────────────┘
```

The system will capture and store:

- Which rules were requested in which contexts
- Whether the full rule was needed after seeing the summary
- The co-occurrence patterns between different rules
- Effectiveness of rule recommendations based on subsequent interactions

### Usage Pattern Analysis

The system will analyze interaction history to identify patterns:

1. **Rule Co-occurrence**: Identify which rules are frequently used together

   ```typescript
   // Example co-occurrence analysis
   interface CoOccurrenceMap {
     [ruleName: string]: {
       [coOccurringRule: string]: number // frequency count
     }
   }
   ```

2. **Context Clustering**: Group similar chat contexts that lead to similar rule usage

   ```typescript
   interface ContextCluster {
     id: string
     contextFeatures: string[] // key terms or topics
     commonRules: string[] // frequently used rules in this context
     typicalDetailLevel: DetailLevel // typically required detail level
   }
   ```

3. **Detail Level Prediction**: Predict which rules typically need full content vs. just summaries
   ```typescript
   interface DetailLevelPredictor {
     predictDetailLevel(ruleName: string, context: string): DetailLevel
     updateModel(
       ruleName: string,
       context: string,
       actualDetailLevel: DetailLevel
     ): void
   }
   ```

### Adaptive Rule Selection

Based on the learned patterns, the system will:

1. **Pre-cache Likely Rules**: Predictively load rules that might be needed based on context

   ```typescript
   // src/services/predictiveLoader.ts
   export class PredictiveLoader {
     async preloadLikelyRules(contextFeatures: string[]): Promise<void> {
       const predictedRules = this.predictRulesForContext(contextFeatures)
       // Pre-cache these rules at appropriate detail levels
     }
   }
   ```

2. **Dynamic Bundle Creation**: Automatically create and refine rule bundles based on usage patterns

   ```typescript
   // src/services/dynamicBundler.ts
   export class DynamicBundler {
     async createBundleFromUsagePattern(
       contextFeatures: string[]
     ): Promise<RuleBundle> {
       // Analyze past usage to create an optimized bundle
     }
   }
   ```

3. **Smart Detail Level Selection**: Automatically choose the most appropriate detail level based on historical needs
   ```typescript
   // Example decision logic
   function selectOptimalDetailLevel(
     rule: string,
     context: string,
     history: InteractionHistory
   ): DetailLevel {
     // Use historical data to determine optimal detail level
   }
   ```

### Feedback Loop Integration

The system will implement a feedback loop for continuous improvement:

1. **Explicit Feedback Collection**: Add a mechanism for the agent to provide feedback on rule relevance

   ```javascript
   {
     "name": "provideRuleFeedback",
     "description": "Provide feedback on the relevance and usefulness of previously loaded rules",
     "parameters": {
       "type": "object",
       "properties": {
         "ruleName": {
           "type": "string",
           "description": "Name of the rule receiving feedback"
         },
         "relevanceScore": {
           "type": "integer",
           "minimum": 1,
           "maximum": 5,
           "description": "How relevant the rule was (1-5)"
         },
         "wasDetailLevelAppropriate": {
           "type": "boolean",
           "description": "Whether the detail level was appropriate"
         },
         "comments": {
           "type": "string",
           "description": "Optional comments about the rule's usefulness"
         }
       },
       "required": ["ruleName", "relevanceScore"]
     }
   }
   ```

2. **Implicit Feedback Tracking**: Infer feedback based on agent behavior

   ```typescript
   // Types of implicit feedback to track
   enum ImplicitFeedbackType {
     REQUESTED_MORE_DETAIL, // Agent needed more detail after seeing summary
     IGNORED_RULE, // Agent didn't use a provided rule
     REPEATED_REQUEST, // Agent requested similar rules later
     SUCCESSFUL_COMPLETION // Task completed successfully with provided rules
   }
   ```

3. **Continuous Model Updating**: Regularly update recommendation models based on feedback
   ```typescript
   // Update schedule
   interface ModelUpdateConfig {
     updateFrequency: 'real-time' | 'hourly' | 'daily'
     minInteractionsBeforeUpdate: number
     weightDecayFactor: number // How quickly to discount old interactions
   }
   ```

### Implementation Approach

1. **Storage Layer**:

   - Use a lightweight database (SQLite for development, PostgreSQL for production)
   - Store interactions with metadata including timestamps, context features, and outcomes
   - Implement data retention policies and privacy controls

2. **Analysis Pipeline**:

   - Create background jobs to analyze interaction patterns
   - Implement simple statistical models for initial version
   - Prepare for more sophisticated ML models in future versions

3. **Integration with Existing Components**:
   - Modify the rule fetching module to consult the learning system
   - Add hooks in MCP tools to record interaction data
   - Create new endpoints for explicit feedback

## Architecture

### System Components

```
┌────────────────────────────────────┐
│        Cursor AI Interface         │
└───────────────────┬────────────────┘
                    │
                    ▼
┌────────────────────────────────────┐
│    Progressive Rules MCP Server    │
├────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐  │
│ │ Rule Fetcher │ │ Rule Search  │  │
│ └──────────────┘ └──────────────┘  │
│ ┌──────────────┐ ┌──────────────┐  │
│ │Rule Bundling │ │Token Tracker │  │
│ └──────────────┘ └──────────────┘  │
└───────────────────┬────────────────┘
                    │
                    ▼
┌────────────────────────────────────┐
│     Rule Storage & Indexing        │
├────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐  │
│ │  Metadata    │ │  Summaries   │  │
│ └──────────────┘ └──────────────┘  │
│ ┌──────────────┐ ┌──────────────┐  │
│ │Full Content  │ │  Embeddings  │  │
│ └──────────────┘ └──────────────┘  │
└────────────────────────────────────┘
```

### Core Components

1. **MCP Server Core**

   - Implements the Model Context Protocol
   - Handles request/response with Cursor
   - Manages tool registration and execution

2. **Rule Fetching Module**

   - Progressive loading based on specified detail level
   - Token budget management
   - Caching frequently accessed rules

3. **Rule Search Module**

   - Semantic search for finding relevant rules
   - Category, tag, and priority-based filtering
   - Relevance scoring and ranking

4. **Rule Bundling Module**

   - Predefined rule bundles for common scenarios
   - Dynamic bundling based on task context
   - Token optimization for bundle composition

5. **Token Tracking Module**
   - Monitors context window utilization
   - Optimizes rule loading based on available space
   - Provides metrics on token efficiency

## MCP Tools Specification

### 1. `progressiveRuleFetch`

```javascript
{
  "name": "progressiveRuleFetch",
  "description": "Fetches rules with progressive detail levels for optimized context window usage",
  "parameters": {
    "type": "object",
    "properties": {
      "ruleNames": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Names of specific rules to fetch"
      },
      "detailLevel": {
        "type": "string",
        "enum": ["metadata", "summary", "full"],
        "description": "Level of detail to fetch (metadata is most efficient, full is most detailed)"
      },
      "tokenBudget": {
        "type": "integer",
        "description": "Maximum tokens to use for rule loading (optional)"
      }
    },
    "required": ["ruleNames"]
  }
}
```

### 2. `ruleSearch`

```javascript
{
  "name": "ruleSearch",
  "description": "Searches for relevant rules using semantic matching and metadata filtering",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Semantic search query to find relevant rules"
      },
      "categories": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Categories to filter by (optional)"
      },
      "tags": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Tags to filter by (optional)"
      },
      "minPriority": {
        "type": "string",
        "enum": ["low", "medium", "high"],
        "description": "Minimum priority level (optional)"
      },
      "maxResults": {
        "type": "integer",
        "description": "Maximum number of results to return"
      },
      "detailLevel": {
        "type": "string",
        "enum": ["metadata", "summary", "full"],
        "description": "Level of detail to return for matched rules"
      }
    },
    "required": ["query", "maxResults", "detailLevel"]
  }
}
```

### 3. `ruleBundleLoad`

```javascript
{
  "name": "ruleBundleLoad",
  "description": "Loads predefined or dynamically created rule bundles for common scenarios",
  "parameters": {
    "type": "object",
    "properties": {
      "bundleName": {
        "type": "string",
        "description": "Name of a predefined bundle (e.g., 'documentation_updates', 'test_creation')"
      },
      "taskDescription": {
        "type": "string",
        "description": "Description of the current task for dynamic bundle creation (alternative to bundleName)"
      },
      "detailLevel": {
        "type": "string",
        "enum": ["metadata", "summary", "full"],
        "description": "Level of detail to load for the bundle rules"
      },
      "tokenBudget": {
        "type": "integer",
        "description": "Maximum tokens to use for the bundle (optional)"
      }
    },
    "required": ["detailLevel"]
  }
}
```

## Implementation Plan

### 1. Project Setup

Create a new Node.js project with the following structure:

```
progressive-rules-mcp/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Main entry point
│   ├── server.ts             # MCP server setup
│   ├── tools/                # MCP tool implementations
│   │   ├── progressiveRuleFetch.ts
│   │   ├── ruleSearch.ts
│   │   └── ruleBundleLoad.ts
│   ├── services/             # Core services
│   │   ├── ruleLoader.ts     # Rule loading logic
│   │   ├── ruleSearcher.ts   # Search functionality
│   │   ├── ruleBundler.ts    # Bundle management
│   │   └── tokenTracker.ts   # Token usage tracking
│   ├── models/               # Type definitions
│   │   └── rule.ts
│   └── utils/                # Utility functions
│       ├── embedding.ts
│       └── tokenizer.ts
├── tests/                    # Unit and integration tests
└── config/                   # Configuration files
```

### 2. Development Environment

Set up the development environment with:

```bash
mkdir progressive-rules-mcp
cd progressive-rules-mcp
npm init -y
npm install typescript @types/node ts-node nodemon --save-dev
npm install @modelcontextprotocol/server
npm install dotenv express cors
```

Create a basic TypeScript configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### 3. Starting Point: MCP Server Template

Use the MCP server template as a starting point:

```typescript
// src/server.ts
import { MCPServer } from '@modelcontextprotocol/server'
import { progressiveRuleFetch } from './tools/progressiveRuleFetch'
import { ruleSearch } from './tools/ruleSearch'
import { ruleBundleLoad } from './tools/ruleBundleLoad'

export async function createServer() {
  const server = new MCPServer({
    tools: [progressiveRuleFetch, ruleSearch, ruleBundleLoad]
  })

  return server
}
```

```typescript
// src/index.ts
import { createServer } from './server'

async function main() {
  const server = await createServer()
  const port = process.env.PORT || 3000

  await server.listen(port)
  console.log(`Progressive Rules MCP Server running on port ${port}`)
}

main().catch(console.error)
```

### 4. Implement Core Services

Start by implementing the rule loader service:

```typescript
// src/services/ruleLoader.ts
import fs from 'fs/promises'
import path from 'path'
import { Rule, RuleMetadata, DetailLevel } from '../models/rule'
import { estimateTokens } from '../utils/tokenizer'

export class RuleLoader {
  private rulesPath: string
  private summariesPath: string
  private ruleCache: Map<string, Rule> = new Map()

  constructor(rulesPath: string, summariesPath: string) {
    this.rulesPath = rulesPath
    this.summariesPath = summariesPath
  }

  async loadRuleMetadata(ruleName: string): Promise<RuleMetadata> {
    // Implementation to load metadata from cursor.rules.json
  }

  async loadRuleSummary(ruleName: string): Promise<string> {
    // Implementation to load summary from the summaries directory
  }

  async loadRuleContent(ruleName: string): Promise<string> {
    // Implementation to load full rule content
  }

  async loadRule(ruleName: string, detailLevel: DetailLevel): Promise<string> {
    // Progressive loading based on detail level
  }

  async loadRules(
    ruleNames: string[],
    detailLevel: DetailLevel,
    tokenBudget?: number
  ): Promise<string> {
    // Load multiple rules with optional token budget
  }
}
```

### 5. Implement MCP Tools

Implement the tool handlers:

```typescript
// src/tools/progressiveRuleFetch.ts
import { RuleLoader } from '../services/ruleLoader'
import { DetailLevel } from '../models/rule'

const ruleLoader = new RuleLoader('path/to/rules', 'path/to/summaries')

export const progressiveRuleFetch = {
  name: 'progressiveRuleFetch',
  description:
    'Fetches rules with progressive detail levels for optimized context window usage',
  parameters: {
    // Parameters as defined in the specification
  },
  handler: async ({ ruleNames, detailLevel = 'summary', tokenBudget }) => {
    try {
      const result = await ruleLoader.loadRules(
        ruleNames,
        detailLevel as DetailLevel,
        tokenBudget
      )
      return { result }
    } catch (error) {
      return { error: error.message }
    }
  }
}
```

## Getting Started with Development

### Prerequisites

1. Node.js (v16 or higher)
2. Understanding of MCP (Model Context Protocol)
3. Access to Cursor's MCP integration features

### Development Workflow

1. **Clone the MCP Server Template**

   ```bash
   git clone https://github.com/modelcontextprotocol/server-template.git progressive-rules-mcp
   cd progressive-rules-mcp
   ```

2. **Adapt for Progressive Rules**

   - Modify package.json to update project details
   - Implement the core services outlined above
   - Add the MCP tool implementations
   - Create necessary utility functions

3. **Testing**

   - Write unit tests for each component
   - Create integration tests for the MCP tools
   - Test with Cursor using the local development server

4. **Deployment**
   - Package the server for deployment
   - Publish to npm for easy installation
   - Configure in Cursor settings

## Best Practices

1. **Token Efficiency**

   - Always track token usage in all operations
   - Prioritize metadata and summaries over full content
   - Implement intelligent caching for frequently used rules

2. **Semantic Search**

   - Use embeddings for improved relevance matching
   - Consider integrating with existing embedding models (e.g., OpenAI's)
   - Regularly update embeddings when rules change

3. **Dynamic Adaptation**

   - Adjust detail levels based on context window availability
   - Learn from usage patterns to improve rule suggestions
   - Consider adding rule "freshness" tracking

4. **Error Handling**
   - Implement robust error handling for all rule operations
   - Provide graceful fallbacks when rules aren't found
   - Log errors for debugging and improvement

## Resources and References

### MCP Documentation

- [Model Context Protocol Specification](https://github.com/modelcontextprotocol/spec)
- [MCP Server GitHub Repository](https://github.com/modelcontextprotocol/server)

### Starting Templates

- [MCP Server Template](https://github.com/modelcontextprotocol/server-template)
- [Sequential Thinking MCP Example](https://github.com/modelcontextprotocol/server-sequential-thinking)

### Related Technologies

- [Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [Token Counting Libraries](https://github.com/openai/tiktoken)

## Next Steps

1. Create a prototype implementation focusing on core functionality
2. Test with a small set of rules to validate the approach
3. Gather feedback on user experience and token efficiency
4. Expand functionality to include advanced features
5. Deploy and integrate with Cursor's MCP settings

## Conclusion

This MCP server design provides a foundation for implementing an efficient, progressive rule loading system. By utilizing the MCP framework, we can create a seamless integration with Cursor that significantly improves context window utilization while ensuring the most relevant rules are always available.

When development begins, focus on implementing the core functionality (rule loading with different detail levels) first, then gradually add more advanced features like semantic search and dynamic bundling.
