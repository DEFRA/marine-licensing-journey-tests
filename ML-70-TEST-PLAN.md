# ML-70 Test Implementation Plan

## Current Status: 4/20 scenarios implemented ✅

### ✅ **COMPLETED SCENARIOS:**

- [x] Successfully upload a valid KML file
- [x] Successfully upload a valid Shapefile
- [x] Uploading a file with a virus fails
- [x] Uploading without selecting a file fails

---

## 🎯 **REMAINING SCENARIOS TO IMPLEMENT:**

### **AC3 - Drag & Drop** (2 scenarios) - I don't think we can automate this but maybe we can?

- [ ] Drag and drop file functionality works
- [ ] Dropped file name displays on page

### **AC4 - Missing Validation Scenarios** (4 scenarios)

- [ ] Wrong file type error: "The selected file must be a KML file"
- [ ] File too large error: "The selected file must be smaller than 50 MB"
- [ ] Empty file error: "The selected file is empty"
- [ ] Generic upload error: "The selected file could not be uploaded – try again"

### **AC5 - Upload Flow Details** (2 scenarios)

- [ ] Spinner page displays during upload process

### **AC6 - Cancel Navigation** (2 scenarios)

- [ ] Cancel returns to task list
- [ ] Task status remains unchanged after cancel

### **AC7 - Back Navigation** (2 scenarios)

- [ ] Back returns to "Which type of file do you want to upload?" page
- [ ] Changes are discarded when using back navigation

---

## 🛠 **IMPLEMENTATION NOTES:**

### **Test Files to Update:**

- `test/features/upload.coordinate.file.feature` - Add new scenarios
- `test/steps/file.upload.steps.js` - Add new step definitions
- `test-infrastructure/screenplay/factories/exemption.factory.js` - Add new test data
- `test-infrastructure/pages/file.upload.page.js` - Add any missing selectors

### **Test Data Needed:**

- Large file (>50MB) for size validation
- Empty file for empty validation
- Wrong file type (e.g., .txt, .pdf) for type validation
- Configure mock responses for generic upload errors

### **Page Objects to Consider:**

- Spinner/loading page selectors
- Task list page selectors for cancel scenarios
- File type selection page for back navigation

---

## 📝 **IMPLEMENTATION ORDER:**

1. **Start with Display/UI scenarios** (AC1) - easiest to implement
2. **Add Validation scenarios** (AC4) - extend existing error patterns
3. **Navigation scenarios** (AC6, AC7) - requires additional page objects
4. **Interactive scenarios** (AC2, AC3) - may need file handling setup
5. **Upload flow scenarios** (AC5) - most complex, may require mocking

---

## 🎯 **TARGET: 20/20 scenarios complete**

**Progress tracking:**

- Completed: 4 ✅
- Remaining: 16 ⏳
- Total scenarios: 20
