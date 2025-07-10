# ML-70 Test Implementation Plan

## Current Status: 8/18 scenarios implemented ✅

### ✅ **COMPLETED SCENARIOS:**

- [x] Successfully upload a valid KML file
- [x] Successfully upload a valid Shapefile
- [x] Spinner page displays during upload process ✨ **NEW**
- [x] Uploading a file with a virus fails
- [x] Uploading without selecting a file fails
- [x] Wrong file type error: "The selected file must be a KML file" ✨ **NEW**
- [x] File too large error: "The selected file must be smaller than 50 MB" ✨ **NEW**
- [x] Empty file error: "The selected file is empty" ✨ **NEW**

---

## 🎯 **REMAINING SCENARIOS TO IMPLEMENT:**

### **~~AC3 - Drag & Drop~~** ❌ **REMOVED - Not suitable for automation**

- ~~Drag and drop file functionality works~~ - **Manual testing only**
- ~~Dropped file name displays on page~~ - **Manual testing only**

**Reason**: OS file system drag & drop is unreliable to automate with WDIO. File upload functionality is already fully covered via standard file input method.

### **AC4 - Missing Validation Scenarios** (3 scenarios)

- ~~Wrong file type error: "The selected file must be a KML file"~~ ✅ **COMPLETED**
- ~~File too large error: "The selected file must be smaller than 50 MB"~~ ✅ **COMPLETED**
- ~~Empty file error: "The selected file is empty"~~ ✅ **COMPLETED**
- [ ] Generic upload error: "The selected file could not be uploaded – try again"

### **AC5 - Upload Flow Details** (1 scenario)

- ~~Spinner page displays during upload process~~ ✅ **COMPLETED**

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

## 🎯 **TARGET: 18/18 scenarios complete**

**Progress tracking:**

- Completed: 8 ✅
- Remaining: 10 ⏳
- Removed: 2 ❌ (AC3 - Drag & Drop not suitable for automation)
- Total scenarios: 18
