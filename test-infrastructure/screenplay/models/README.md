# Test Data Models

Simple test data models for marine licensing journey tests.

## Available Models

### MarineProjectModel

- `generateProjectName()` - Creates realistic marine project names
- `generateOversizedProjectName()` - Creates 251+ character names for boundary testing

### PublicRegisterModel

- `generatePublicRegisterData(options)` - Creates public register consent data
- `generateWithholdingReason()` - Creates realistic withholding reasons
- `generateReasonExceedingMaxLength()` - Creates 1001+ character reasons for boundary testing

### ExemptionModel

- Constructor for creating exemption instances with basic update methods

## Usage

```javascript
import {
  MarineProjectModel,
  PublicRegisterModel
} from '~/test-infrastructure/screenplay/models'

// Generate test data
const projectName = MarineProjectModel.generateProjectName()
const publicRegister = PublicRegisterModel.generatePublicRegisterData({
  withhold: true
})
```

## Quick Access

```javascript
import { generateTestData } from '~/test-infrastructure/screenplay/models'

const projectName = generateTestData.projectName()
const publicRegister = generateTestData.publicRegister(true) // withhold = true
```

That's it. Simple, focused, and actually matches what exists.
