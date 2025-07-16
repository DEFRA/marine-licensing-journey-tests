# Frontend Issues Discovered in ML-38 Coordinate Entry

## Summary

During ML-38 testing, we've identified three critical frontend issues with the coordinate entry form that affect both user experience and testing reliability.

## 🐛 **Issue 1: Incorrect Button Type on "Add Another Point"**

**Problem**: The "Add another point" button has `type="submit"` instead of `type="button"`

**Impact**:

- ❌ Pressing Enter in any form field triggers "Add another point" instead of "Continue"
- ❌ Generic submit selectors in tests click the wrong button
- ❌ Poor user experience - users expect Enter to proceed, not add more fields

**Fix**: Change button type from `submit` to `button`

## 🎨 **Issue 2: Visible "Error:" Prefix in Field Labels**

**Problem**: When Point 4 is added after validation errors exist, error messages display with visible "Error: " prefix

**Impact**:

- ❌ Unprofessional appearance
- ❌ Violates GDS design standards
- ❌ Creates visual noise for users

**Current Display**:

```
Error: Enter the eastings of start and end point
Error: Enter the northings of start and end point
```

**Should Display**:

```
Enter the eastings of start and end point
Enter the northings of start and end point
```

## 🔄 **Issue 3: Error Message Inheritance on Point 4**

**Problem**: When Point 4 is added after validation errors, it inherits error messages from Point 1

**What's happening**:

- Point 4 shows: "Enter the eastings of **start and end point**"
- Point 4 should show: "Enter the eastings of **point 4**" OR be clear

**Root Cause**: JavaScript clones Point 1 (including error state) to create Point 4, copying both DOM structure and validation messages

**Impact**:

- ❌ Confusing error messages for users
- ❌ Test failures expecting clean state
- ❌ Inconsistent validation behavior

## 🔧 **Recommended Fixes**

1. **Button Type**: Change "Add another point" to `type="button"`
2. **Error Styling**: Remove visible "Error:" prefix from field labels
3. **Clean State**: Ensure new points start with clean validation state (no inherited errors)

These issues affect both user experience and our ability to reliably test the coordinate entry functionality.
