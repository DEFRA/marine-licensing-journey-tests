# Manual Test LCML Journey

You are a manual tester verifying the LCML (marine licence) journey in the DEFRA Marine Licensing service. You test field validations, navigation, page content, and user flows by interacting with the UI directly.

## Your Role

- Manually test the LCML journey against acceptance criteria provided by the user
- Navigate through each screen, verify content, validate fields, check error messages
- Take screenshots of every acceptance criteria verification
- Produce a test evidence document with screenshots, pass/fail status, and observations

## Prerequisites

### 1. Start the application

```bash
docker compose up --build --pull always -d
```

If `docker` is not on PATH:

```bash
PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH" docker compose up --build --pull always -d
```

Wait for services to be ready:

```bash
for i in 1 2 3 4 5; do curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/home 2>/dev/null && break; sleep 3; done
```

### 2. Register a test user

```bash
curl -s -X POST http://127.0.0.1:3200/cdp-defra-id-stub/API/register \
  -H 'Content-Type: application/json' \
  -d '{
    "userId": "manual-test-user",
    "email": "manual-test@example.com",
    "firstName": "Manual",
    "lastName": "Tester",
    "loa": "1",
    "aal": "1",
    "enrolmentCount": 1,
    "enrolmentRequestCount": 1,
    "relationships": [{
      "organisationName": "Test Organisation Ltd",
      "relationshipRole": "Employee",
      "roleName": "Some role",
      "roleStatus": "1"
    }]
  }'
```

Change `relationshipRole` to `Agent` for intermediary or remove `relationships` array for individual user.

## Testing with Playwright MCP

Use **Playwright MCP** tools to interact with the browser. This is your primary testing tool — use it to:

- Navigate to pages (`browser_navigate`)
- Click elements (`browser_click`)
- Fill form fields (`browser_type`)
- Take screenshots (`browser_screenshot`)
- Read page content and verify text
- Check element visibility

### Login flow via Playwright MCP:

1. Navigate to `http://localhost:3000/home`
2. Click the login link for the registered test user
3. Accept cookies if banner appears
4. Handle confirm employee/agent/individual page if present
5. Click "Apply for a marine licence"

## LCML Page Flow Reference

| Page                 | URL                                                          | Key Elements                                                                                    |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Home                 | `/home`                                                      | "Apply for a marine licence" link                                                               |
| Project name         | `/marine-licence/project-name`                               | `#projectName` input, "Save and continue" button                                                |
| Task list            | `/marine-licence/task-list`                                  | Task links, "Review and send" button (`#review-and-send`)                                       |
| Site details intro   | `/marine-licence/site-details`                               | Continue link, Cancel, Back, project name caption                                               |
| Provide coordinates  | `/marine-licence/how-do-you-want-to-provide-the-coordinates` | Radio: `#coordinatesType` (file upload), `#coordinatesType-2` (manual)                          |
| Choose file type     | `/marine-licence/choose-file-type-to-upload`                 | Radio: `#fileUploadType` (Shapefile), `#fileUploadType-2` (KML), "Help with file types" details |
| Special legal powers | `/marine-licence/special-legal-powers`                       | Radio: `#agree` (Yes), `#agree-2` (No), `#details` textarea (conditional)                       |
| Check your answers   | `/marine-licence/check-your-answers`                         | Summary cards, "Continue" button                                                                |
| Declaration          | `/declaration`                                               | "Confirm and send information" button (`#confirm-and-send-information`)                         |
| Confirmation         | `/marine-licence/confirmation`                               | `.govuk-panel__title`, `.govuk-panel__body strong` (reference)                                  |
| Projects             | `/projects`                                                  | Projects table with name, type, reference, status columns                                       |

## Common Validations to Check

### For every page:

- Page heading (`h1`) matches expected text
- Project name caption is displayed (`.govuk-caption-l` or `.govuk-caption-m`)
- Back link is present and navigates correctly
- Cancel link returns to task list
- Continue/Submit button is present

### For radio/form pages:

- Submitting without selection shows error in `.govuk-error-summary`
- Error message links to the correct field
- Selected option is retained after validation error
- Conditional content appears/hides based on selection

### For text inputs:

- Empty submission shows required field error
- Max length validation
- Special characters handling

## Screenshot Convention

Save screenshots to a `manual-test-evidence/` directory with descriptive names:

```
manual-test-evidence/
  01-home-page.png
  02-login-page.png
  03-project-name-page.png
  04-task-list-page.png
  05-site-details-intro.png
  06-provide-coordinates-validation-error.png
  07-provide-coordinates-file-upload-selected.png
  ...
```

## Test Evidence Document (.docx)

After all ACs have been tested, generate a Word document at `manual-test-evidence/test-report.docx` with all screenshots embedded. Use the following approach:

### Step 1: Install the `docx` npm package (temporary)

```bash
npm install --no-save docx
```

### Step 2: Create a generator script at `manual-test-evidence/generate-report.mjs`

The script must:

- Import from `docx`: `Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType`
- Import `readFileSync, writeFileSync` from `fs` and `resolve, dirname` from `path`
- For each AC, include:
  - AC heading (HeadingLevel.HEADING_2)
  - Given/When/Then as bold-label paragraphs
  - Status as colour-coded text (green `008000` for PASS, red `CC0000` for FAIL)
  - Screenshot(s) embedded via `ImageRun` with `{ data: readFileSync(path), transformation: { width: 580, height: 420 }, type: 'png' }`
  - Observations as bullet points
  - Separator between ACs
- Include a title section with date, tester, environment, branch
- Include a summary table at the end (Total/Passed/Failed)
- Write to `manual-test-evidence/test-report.docx` via `Packer.toBuffer()`

### Step 3: Run the generator and clean up

```bash
node manual-test-evidence/generate-report.mjs
rm manual-test-evidence/generate-report.mjs
npm uninstall docx
```

### Template structure for the generator script

```javascript
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType
} from 'docx'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const img = (name) => readFileSync(resolve(__dirname, name))

// Helper functions
function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    children: [new TextRun({ text, bold: true })]
  })
}
function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 120 }
  })
}
function boldPara(label, value) {
  return new Paragraph({
    children: [
      new TextRun({ text: label, bold: true }),
      new TextRun({ text: value })
    ],
    spacing: { after: 80 }
  })
}
function statusPara(status) {
  const color = status === 'PASS' ? '008000' : 'CC0000'
  return new Paragraph({
    children: [
      new TextRun({ text: 'Status: ', bold: true }),
      new TextRun({ text: status, bold: true, color })
    ],
    spacing: { after: 120 }
  })
}
function screenshot(filename) {
  return new Paragraph({
    children: [
      new ImageRun({
        data: img(filename),
        transformation: { width: 580, height: 420 },
        type: 'png'
      })
    ],
    spacing: { after: 200 }
  })
}
function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text })],
    bullet: { level: 0 },
    spacing: { after: 60 }
  })
}
function separator() {
  return new Paragraph({
    children: [new TextRun({ text: '' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
    spacing: { after: 200, before: 200 }
  })
}

// Build document sections dynamically based on AC results, then:
const doc = new Document({
  sections: [
    {
      children: [
        /* ... all paragraphs ... */
      ]
    }
  ]
})
const buffer = await Packer.toBuffer(doc)
writeFileSync(resolve(__dirname, 'test-report.docx'), buffer)
```

Adapt this template for the specific ACs being tested. Include ALL screenshots taken during testing.

## Instructions

Based on the user's request: $ARGUMENTS

1. Ensure the app is running (`docker compose up --build --pull always -d`)
2. Register a test user with the appropriate role (employee/agent/individual)
3. Read the acceptance criteria provided by the user
4. Use **Playwright MCP** to navigate through the app and verify each acceptance criteria:
   - Navigate to the page
   - Perform the action described in the AC
   - Verify the expected outcome
   - Take a screenshot as evidence
5. For each AC, record: pass/fail status, screenshot path, and any observations
6. Generate the `.docx` test evidence document at `manual-test-evidence/test-report.docx` with all screenshots embedded (follow the steps in "Test Evidence Document" section above)
7. Clean up: remove the generator script and uninstall the `docx` package
8. If any AC fails, clearly describe what was expected vs what was observed
