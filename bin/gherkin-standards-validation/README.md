# Gherkin Standards Validation

A clean code implementation of a Gherkin standards validator that ensures BDD feature files follow established best practices.

## Quick Start

1. **Add to your package.json**:

   ```json
   {
     "scripts": {
       "lint:gherkin": "node bin/gherkin-standards-validation/index.js"
     }
   }
   ```

2. **Update the feature files pattern** in `bin/gherkin-standards-validation/index.js`:

   ```javascript
   const FEATURE_FILES_PATTERN = 'your/features/path/**/*.feature'
   ```

3. **Run the validator**:
   ```bash
   npm run lint:gherkin
   ```

## Features

- **Step Count Validation**: Ensures scenarios don't exceed a configurable step limit (default: 6)
- **Step Order Validation**: Enforces proper Given-When-Then flow
- **Single Behaviour Validation**: Detects scenarios testing multiple behaviours
- **Comprehensive Reporting**: Clear violation messages with helpful fixing tips
- **Simple Configuration**: Easy setup via package.json script and file path modification

## Project Structure

```
src/
├── parsers/
│   └── gherkin-parser.js       # Parses Gherkin content and extracts scenarios
├── validators/
│   └── step-validators.js      # Validates scenarios against BDD standards
├── processors/
│   └── file-processor.js       # Handles file operations and orchestrates validation
├── reporters/
│   └── violation-reporter.js   # Formats and displays violation messages
└── gherkin-standards-validator.js  # Main validator module

tests/
├── integration/
│   └── simple-integration.test.js  # Integration tests for complete workflows
└── test-data/
    ├── valid-features/         # Example valid feature files
    └── invalid-features/       # Example files with violations
```

## Usage

### CLI Usage

```bash
# Run directly (looks for test/features/**/*.feature by default)
node index.js

# Run via npm script (recommended)
npm run lint:gherkin
```

### Package.json Integration

Add this script to your `package.json` to integrate with your project:

```json
{
  "scripts": {
    "lint:gherkin": "node bin/gherkin-standards-validation/index.js"
  }
}
```

**To use with your own feature files**, modify the default pattern in `index.js`:

```javascript
// Change this line to point to your feature files location
const FEATURE_FILES_PATTERN = 'test/features/**/*.feature' // ← Update this path

// Examples for different project structures:
// const FEATURE_FILES_PATTERN = 'features/**/*.feature'           // Root features folder
// const FEATURE_FILES_PATTERN = 'src/test/features/**/*.feature'  // Maven-style structure
// const FEATURE_FILES_PATTERN = 'cypress/integration/**/*.feature' // Cypress structure
```

### Programmatic Usage

```javascript
import { lintFeatureFile } from './src/processors/file-processor.js'

const violations = lintFeatureFile('path/to/feature.feature', 6)
console.log(`Found ${violations} violations`)
```

## Configuration

- **Step Limit**: Maximum allowed steps per scenario (default: 6)
- **Feature Pattern**: Glob pattern for feature files (default: `test/features/**/*.feature`)

To change the step limit, modify the `MAX_STEPS` constant in `index.js`:

```javascript
const MAX_STEPS = 6 // Change this number to adjust the step limit
```

## Validation Rules

### 1. Step Count

- Scenarios should not exceed the configured step limit
- Helps maintain focused, readable scenarios

### 2. Step Order

- Given steps must come before When and Then steps
- When steps must come after Given but before Then
- Then steps must come after When steps

### 3. Single Behaviour

- Each scenario should test only one behaviour
- Scenarios with multiple When-Then pairs are flagged

## Development

### Running Tests

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### Code Quality

```bash
npm run lint           # Check code style
npm run lint:fix       # Fix code style issues
```

## Example Output

```
🔍 Validating Gherkin scenarios against BDD standards (max steps: 6)...

✅ test/features/login.feature
✅ test/features/registration.feature

❌ test/features/complex-workflow.feature
  Line 8: Scenario "Complete user onboarding process" has 12 steps (max: 6)
    Consider breaking this scenario into smaller, more focused scenarios.

❌ Found 1 violation(s) in 3 feature file(s).

💡 Tips for fixing BDD standards violations:
   📊 Step Count Issues:
   • Break complex scenarios into multiple focused scenarios
   • Consider using Background for common setup steps
   ...
```

## Clean Code Principles Applied

This implementation follows Uncle Bob's clean code principles:

- **Single Responsibility**: Each module has one clear purpose
- **Separation of Concerns**: Parsing, validation, and reporting are separate
- **Descriptive Names**: Functions and variables clearly express their intent
- **Small Functions**: Each function does one thing well
- **No Duplication**: Common functionality is extracted and reused
- **Clean Dependencies**: Clear import/export structure

## Contributing

When contributing, please maintain the clean code standards and ensure all tests pass.
