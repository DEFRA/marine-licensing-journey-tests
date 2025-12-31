# Steps Analyzer

A modular tool for identifying issues in Cucumber step definitions:

- **Unused steps**: Step definitions not used in any feature files
- **Duplicate steps**: Step definitions that appear in multiple files

## Quick Start

1. **Run the analyzer**:

   ```bash
   npm run lint:steps
   # or directly:
   node bin/steps-analyzer/index.js
   ```

2. **Exit codes**:
   - `0`: No issues found ✅
   - `1`: Unused or duplicate steps detected ❌ (fails CI/precommit)

## Features

- **Unused Step Detection**: Identifies step definitions not referenced in any feature files
- **Duplicate Step Detection**: Finds step definitions that appear in multiple files
- **Accurate Pattern Matching**: Handles Cucumber parameters (`{string}`, `{int}`, etc.)
- **Multi-file Analysis**: Processes all step files and feature files
- **Clear Reporting**: Separate reports for unused and duplicate steps
- **CI Integration**: Exits with error code for automated processes
- **Error Handling**: Graceful handling of missing files or parse errors

## Project Structure

```
src/
├── parsers/
│   ├── step-parser.js       # Extracts step definitions from .js files
│   └── feature-parser.js    # Extracts step usage from .feature files
├── analyzers/
│   └── usage-analyzer.js    # Analyzes unused and duplicate steps
└── reporters/
    └── usage-reporter.js    # Formats and displays results

tests/
├── unit/                    # Unit tests for each module
│   ├── step-parser.test.js
│   ├── feature-parser.test.js
│   ├── usage-analyzer.test.js
│   └── usage-reporter.test.js
└── integration/
    └── end-to-end.test.js   # Integration tests with real test data
```

## Usage

### CLI Usage

```bash
# Run from project root
node bin/steps-analyzer/index.js

# Via npm script (recommended)
npm run lint:steps
```

### Integration with Git Hooks

The analyzer is integrated into the precommit hook:

```bash
npm run git:pre-commit-hook
# Runs: format → lint → lint:gherkin → lint:steps
```

### Example Output

**When issues are found:**

```
🔍 Analysing step definitions...

❌ Found 5 potentially unused step definitions:

📄 login.steps.js (2 unused):
  Given: "the user has admin privileges"
  When: "the user deletes {string}"

📄 validation.steps.js (3 unused):
  Then: "the error {string} is displayed"
  Then: "the field {string} is highlighted"
  When: "the form is submitted with {string}"

💡 Total: 5 step definitions can potentially be removed

❌ Found 2 duplicate step definitions:

  Given: "user is logged in"
    Found in 2 files:
      - login.steps.js
      - auth.steps.js

  When: "user clicks {string}"
    Found in 3 files:
      - login.steps.js
      - navigation.steps.js
      - common.steps.js

💡 Total: 2 duplicate step definitions should be consolidated

🔧 Run 'npm run lint:steps' to see this report again
```

**When no issues are found:**

```
🔍 Analysing step definitions...

✅ No unused step definitions found!

✅ No duplicate step definitions found!
```

## Parameter Handling

The analyzer correctly handles Cucumber parameter types:

- `{string}` → Matches `"quoted strings"` in feature files
- `{int}` → Matches `123`, `456` etc.
- `{float}` → Matches `12.34`, `0.5` etc.

### Example

**Step Definition:**

```javascript
Then('the {string} task status is {string}', async function (task, status) {})
```

**Matches in Features:**

```gherkin
Then the "Project name" task status is "Completed"
Then the "Activity dates" task status is "Incomplete"
```

## Development

### Running Tests

```bash
cd bin/steps-analyzer
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

### Code Quality

```bash
npm run lint           # Check code style
npm run lint:fix       # Fix code style issues
```

## Architecture

The tool follows clean code principles with:

- **Single Responsibility**: Each module has one clear purpose
- **Separation of Concerns**: Parsing, analysis, and reporting are separate
- **Testability**: Each module is independently testable
- **Error Handling**: Graceful degradation for missing files
- **Clear Dependencies**: Explicit imports and exports
