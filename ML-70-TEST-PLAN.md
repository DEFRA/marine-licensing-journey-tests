# ML-70 Test Implementation Plan

## ✅ **IMPLEMENTATION COMPLETE: 14/14 achievable scenarios (100%)**

### 🎯 **ALL TESTABLE SCENARIOS IMPLEMENTED:**

#### **✅ KML UPLOAD SCENARIOS (7/7 complete)**

- [x] Successfully upload a valid KML file
- [x] Spinner page displays during KML upload process
- [x] Uploading a KML file with a virus fails
- [x] Uploading without selecting a KML file fails
- [x] Wrong file type error for KML: "The selected file must be a KML file"
- [x] File too large error for KML: "The selected file must be smaller than 50 MB"
- [x] Empty file error for KML: "The selected file is empty"

#### **✅ SHAPEFILE UPLOAD SCENARIOS (7/7 complete)**

- [x] Successfully upload a valid Shapefile ✨ **UPDATED with proper ZIP validation**
- [x] Spinner page displays during Shapefile upload process ✨ **NEW**
- [x] Uploading a Shapefile with a virus fails ✨ **NEW**
- [x] Uploading without selecting a Shapefile fails ✨ **NEW**
- [x] Wrong file type error for Shapefile: "The selected file must be a Shapefile" ✨ **NEW**
- [x] File too large error for Shapefile: "The selected file must be smaller than 50 MB" ✨ **NEW**
- [x] Empty Shapefile error: "The selected file is empty" ✨ **NEW**

#### **❌ EXCLUDED SCENARIOS (Environmental Limitation):**

- ~~Generic upload error for KML: "The selected file could not be uploaded – try again"~~ **REMOVED**
- ~~Generic upload error for Shapefile: "The selected file could not be uploaded – try again"~~ **REMOVED**

**Reason for Exclusion**: The CDP uploader stub in the test environment only explicitly handles virus detection (`.*virus.*` regex pattern). There is no documented way to trigger the generic "could not be uploaded" error message, as confirmed by [CDP uploader documentation](https://github.com/DEFRA/cdp-uploader) and testing results.

---

## 🛠 **IMPLEMENTATION SUMMARY:**

### **✅ Files Updated:**

1. **`test/features/upload.coordinate.file.feature`** - 14 comprehensive scenarios (removed 2 untestable)
2. **`test/steps/file.upload.steps.js`** - 14 step definitions + legacy compatibility
3. **`test-infrastructure/screenplay/factories/exemption.factory.js`** - 14 factory methods (cleaned up)
4. **`test-infrastructure/screenplay/factories/apply.for.exemption.js`** - 14 builder methods (cleaned up)
5. **`test-infrastructure/helpers/file-generator.js`** - 8 file generation methods (removed unused)

### **✅ File Generators Available:**

#### **KML Generators:**

- `FileGenerator.generateTemporaryLargeFile()` - Large KML > 50MB
- `FileGenerator.generateTemporaryEmptyFile()` - Empty KML file

#### **Shapefile Generators:**

- `FileGenerator.generateTemporaryValidShapefile()` - Valid ZIP with .shp, .shx, .dbf, .prj
- `FileGenerator.generateTemporaryVirusShapefile()` - ZIP with "virus" in filename
- `FileGenerator.generateTemporaryLargeShapefile()` - Large ZIP > 50MB
- `FileGenerator.generateTemporaryEmptyShapefile()` - Empty ZIP file

### **✅ Technical Features:**

- **Proper ZIP File Generation**: Creates valid ZIP files with binary Shapefile components
- **File Type Separation**: Distinct test flows for KML (.kml) and Shapefile (.zip) validation
- **Error Message Validation**: File type-specific error messages
- **Automatic Cleanup**: Generated files are automatically cleaned up after tests
- **Backward Compatibility**: Legacy step definitions maintained for existing tests

---

## 🧪 **TESTING MATRIX - 100% ACHIEVABLE COVERAGE:**

| Test Scenario     | KML Status  | Shapefile Status | Implementation           |
| ----------------- | ----------- | ---------------- | ------------------------ |
| Valid file upload | ✅ Complete | ✅ Complete      | Both file types          |
| Virus detection   | ✅ Complete | ✅ Complete      | Both file types          |
| No file selected  | ✅ Complete | ✅ Complete      | Both file types          |
| Wrong file type   | ✅ Complete | ✅ Complete      | Different error messages |
| File too large    | ✅ Complete | ✅ Complete      | Both file types          |
| Empty file        | ✅ Complete | ✅ Complete      | Both file types          |
| Upload spinner    | ✅ Complete | ✅ Complete      | Both file types          |

**Total Coverage**: 14/14 achievable scenarios (100%) ✅

---

## 🚀 **READY FOR TESTING:**

### **Run All Tests:**

```bash
npm run test:parallel:local -- --cucumberOpts.tags "@issue=ML-70"
```

### **Run KML Tests Only:**

```bash
npm run test:parallel:local -- --cucumberOpts.tags "@kml"
```

### **Run Shapefile Tests Only:**

```bash
npm run test:parallel:local -- --cucumberOpts.tags "@shapefile"
```

### **Run Smoke Tests:**

```bash
npm run test:parallel:local -- --cucumberOpts.tags "@smoke"
```

---

## 📋 **TEST SCENARIO NAMING:**

Each scenario is clearly named with file type context:

- `Successfully upload a valid KML file`
- `Successfully upload a valid Shapefile`
- `Uploading wrong file type fails - KML`
- `Uploading wrong file type fails - Shapefile`

---

## 🎯 **ACHIEVEMENT UNLOCKED:**

✅ **Complete Testable File Upload Coverage**

- 14 comprehensive scenarios implemented and passing
- Both KML and Shapefile workflows fully covered
- All testable error conditions validated
- Proper file generators with binary format support
- Clean, maintainable test code structure
- 100% success rate on achievable scenarios

**Status**: **PRODUCTION READY** 🚀

All testable file upload scenarios for ML-70 are implemented, passing, and ready for production validation across both KML and Shapefile upload workflows.

---

## 📝 **LESSONS LEARNED:**

### **Environmental Testing Constraints:**

- Mock services have limitations that may not reflect production behaviour
- Generic error scenarios may require manual testing or production validation
- Focus on achievable automation scenarios for reliable CI/CD pipelines

### **Test Design Best Practices:**

- Comprehensive file type coverage ensures robust validation
- Binary file generation improves test realism
- Proper cleanup prevents test environment pollution
- File type-specific error messages improve user experience validation
