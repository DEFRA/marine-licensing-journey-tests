# Marine Licensing UAT Delivery Summary

## Executive Summary

This document provides a comprehensive overview of the marine licensing features delivered for UAT testing, clarifying which requirements are current and which have been superseded. The application has evolved from supporting single-site notifications to comprehensive multi-site functionality, resulting in some earlier user stories being enhanced or replaced.

## Current Status of Delivered Features

### ✅ Core User Journey (Fully Delivered)

#### 1. Project Setup & Task Management

- **ML-1**: Create exemption and provide project name ✅
- **ML-9**: View and navigate task list ✅

#### 2. Activity Information

- **ML-10**: Activity dates (SUPERSEDED for multi-site - see ML-416, ML-419, ML-420)
- **ML-11**: Activity description (SUPERSEDED for multi-site - see ML-417, ML-421)
- **ML-12**: Public register consent ✅

#### 3. Site Details Entry

Multiple pathways available:

- **File Upload**: ML-69, ML-70, ML-74 ✅
- **Manual Entry - Circle**: ML-35, ML-36, ML-37 ✅
- **Manual Entry - Polygon**: ML-19, ML-38, ML-121 ✅
- **Entry Method Selection**: ML-16, ML-17, ML-18, ML-135 ✅

#### 4. Submission & Confirmation

- **ML-82, ML-139, ML-140**: Check your answers ✅
- **ML-84**: Submit notification ✅
- **ML-21**: Generate application reference ✅
- **ML-379**: D365 integration ✅

#### 5. Dashboard & Case Management

- **ML-96**: View dashboard ✅
- **ML-99**: Continue draft notification ✅
- **ML-100**: Delete draft notification ✅
- **ML-124, ML-591**: Dashboard status management ✅

### 🔄 Multi-Site Enhancement (Current Focus)

**IMPORTANT**: The application now supports multiple sites per notification. This has resulted in significant changes to the activity dates and descriptions workflow:

#### Original Single-Site Flow (PARTIALLY SUPERSEDED)

- **ML-10**: Activity dates at notification level
- **ML-11**: Activity description at notification level

#### Current Multi-Site Flow (ACTIVE)

- **ML-114**: Are all activity descriptions the same? ✅
- **ML-228**: Provide site name ✅
- **ML-419**: Are all activity dates the same? ✅
- **ML-416**: Activity dates for single manual entry site ✅
- **ML-420**: Activity dates for multiple sites ✅
- **ML-417**: Activity description for single manual entry site ✅
- **ML-421**: Activity description for multiple manual entry sites ✅

### 🔐 Authentication & Navigation

- **ML-277**: Defra account management ✅
- **ML-20**: Page header ✅
- **ML-279**: Footer links ✅
- **ML-543**: Service name verification ✅
- **ML-644**: Privacy policy ✅
- **ML-142**: IAT integration context ✅

## Important Notes for UAT Testing

### 1. Multi-Site Context

When testing activity dates and descriptions:

- **For single site entries**: The system goes directly to date/description entry
- **For multiple sites**: The system first asks if dates/descriptions are the same for all sites
- **File uploads**: Can contain multiple sites automatically parsed from KML/GeoJSON files

### 2. Superseded vs Enhanced Features

| Original Story               | Status   | Current Implementation                       |
| ---------------------------- | -------- | -------------------------------------------- |
| ML-10 (Activity dates)       | ENHANCED | Now site-specific via ML-416/420             |
| ML-11 (Activity description) | ENHANCED | Now site-specific via ML-417/421             |
| Other core features          | ACTIVE   | Continue to function as originally specified |

## Key Testing Scenarios

### 1. Single Site Journey

1. Create project (ML-1)
2. Enter activity dates directly (ML-416)
3. Enter activity description directly (ML-417)
4. Choose coordinate entry method (ML-16)
5. Enter site details (various stories based on method)
6. Check answers (ML-82/139/140)
7. Submit (ML-84)

### 2. Multiple Sites Journey

1. Create project (ML-1)
2. Choose multiple sites option
3. Decision: Same dates for all sites? (ML-419)
4. Enter dates (ML-420)
5. Decision: Same description for all sites? (ML-114)
6. Enter descriptions (ML-421)
7. Enter site details for each site
8. Check answers (ML-140)
9. Submit (ML-84)

### 3. File Upload Journey

1. Create project (ML-1)
2. Choose file upload (ML-69)
3. Upload KML/GeoJSON file (ML-70)
4. Review extracted sites (ML-74)
5. Provide activity information per site
6. Check answers (ML-140)
7. Submit (ML-84)

## Known Considerations

### Session Management

- Session data persists between navigation steps
- Switching between file upload and manual entry requires careful state management
- Previous answers are retained when using back navigation

### Validation Rules

- All original validation rules from single-site stories apply to multi-site contexts
- Date validation: Must be today or future, end date after start date
- Description: Maximum 4000 characters
- Coordinates: Support for both WGS84 and OSGB36 systems

### D365 Integration

- Real submission to D365 requires test environment configuration
- Dashboard reflects actual D365 case status
- Reference numbers are generated upon successful submission

## Recommendations for UAT Team

1. **Start with single-site scenarios** to understand core functionality
2. **Progress to multi-site scenarios** to test enhanced features
3. **Test navigation flows** including back button and cancel behaviours
4. **Verify data persistence** across the user journey
5. **Check validation messages** for clarity and helpfulness
6. **Confirm submission process** works as expected in your test environment

## Support & Documentation

- **User Stories**: `/documentation/user-stories/`
- **Domain Context**: Available in project documentation

---

_Last Updated: 12 September 2025_
