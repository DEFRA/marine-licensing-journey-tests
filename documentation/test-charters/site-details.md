# Site Details Charter: Complete Coordinate Entry Workflow

## Investigation Plan

**EXPLORE:** Complete site details workflow including file upload and manual coordinate entry options  
**AS:** Marine licensing applicants (see References)  
**BECAUSE:** Site location provision is universally challenging and critical to application accuracy  
**LOOKING FOR:** Usability issues in location workflows, file type decisions, validation clarity, decision confidence, error recovery patterns  
**NOTE:** Some advanced back/cancel navigation scenarios from coordinate entry pages are marked @wip (ML-35, ML-36)

**Duration:** 100 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-69: Choose file type to upload](../user-stories/ML-69.choose.file.to.upload.md)
  - [ML-70: Upload a coordinate file](../user-stories/ML-70.upload.a.coordinate.file.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
  - [ML-19: Enter coordinate for polygon site](../user-stories/ML-19.enter.coordinate.for.polygon.site.md)
  - [ML-35: Enter centre point of a circle](../user-stories/ML-35.enter.centre.point.of.a.circle.md)
  - [ML-36: Enter width of circular site](../user-stories/ML-36.enter.width.of.circular.site.md)
  - [ML-37: Review circular site details](../user-stories/ML-37.review.circular.site.details.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Research Insights on Coordinate Entry:**

**Sarah (Discovery-First)**: _"The coordinates threw me off a bit"_ and _"Struggled a bit with finding the location on the map... Drew a triangle. Guessed with it"_ - Coordinate concepts create anxiety for non-technical users

**Marcus (Infrastructure)**: _"I am not a GIS person... I would lean on ABP Mayor to provide files to upload, not an expert in the locations"_ - Professional reliance on specialists

**Dr. James (Research)**: _"I've worked with ArcGIS which would give you points"_ - Technical competence but seeks validation

**Elena (Multi-Project)**: Professional coordinator patterns working with client-provided location data

**Critical Research Finding**: _"Even organisational pro users find providing location details the most challenging"_ - Universal difficulty across all user types.

## Realistic Activities

- Test complete file upload workflow: location method selection → file type choice (KML vs Shapefile) → upload process → validation scenarios
- Investigate file upload validation patterns: virus detection, file size limits (50MB), empty files, wrong file types
- Test file upload progress indication and error recovery patterns for both KML and Shapefile workflows
- Test complete manual coordinate entry workflow: manual selection → circle vs polygon choice → coordinate system selection → coordinate entry → review
- Investigate polygon coordinate entry: three-point triangular site definition for both WGS84 and OSGB36 systems
- Test coordinate validation across different entry methods: circle (single point + width) vs polygon (multiple coordinate points)
- Evaluate file type selection decisions based on user's existing data formats (Marcus's reliance on GIS specialists providing files)
- Evaluate help text effectiveness for understanding file type differences between KML and Shapefile formats
- Investigate coordinate system selection confidence (WGS84 vs OSGB36) across different user technical backgrounds
- Test centre point coordinate entry accuracy for circular sites with realistic scenarios
- Test polygon coordinate entry accuracy: start/end point, point 2, point 3 for triangular site boundaries
- Evaluate decimal place precision understanding (6 decimal places for WGS84, digit requirements for OSGB36)
- Test coordinate range validation (latitude -90 to 90, longitude -180 to 180, positive values for OSGB36)
- Investigate width entry validation and units comprehension for circular sites
- Test review screen comprehension and completion confidence for both file upload and manual entry workflows
- Evaluate error recovery patterns for coordinate validation failures across different coordinate systems
- Test navigation flow and state preservation through the complete workflow for all site entry methods
- Simulate scenarios where users have existing coordinate data but are uncertain about system choice
- Test help text effectiveness for coordinate system guidance across file upload and manual entry contexts
- Investigate professional workflows with prepared coordinate data or files from GIS specialists
- Test file upload interruption and resume scenarios, including browser navigation during upload process
- Evaluate upload spinner effectiveness and user understanding of processing time for different file sizes

## Evidence Framework

### ✅ Positive signals

- **Decision confidence**: Clear understanding of coordinate system choices and consequences across file upload and manual entry
- **Entry accuracy**: Users can successfully enter valid coordinates for circular and polygon sites
- **File upload success**: Clear upload progress and successful file processing for both KML and Shapefile formats
- **Validation support**: Error messages help users correct coordinate problems and file upload issues
- **Workflow completion**: Users successfully progress through entire coordinate entry or file upload sequences
- **Professional integration**: Workflow accommodates existing professional coordinate data and file formats

### ⚠️ Warning signs

- **System confusion**: Uncertainty about WGS84 vs OSGB36 choice or consequences across entry methods
- **Entry errors**: Frequent coordinate validation failures or format confusion in manual entry workflows
- **File upload problems**: Confusion about file formats, upload failures, or unclear progress indication
- **Validation frustration**: Error messages don't help users understand or fix problems across different workflows
- **Workflow abandonment**: Users get stuck or confused in coordinate entry or file upload sequences
- **Professional friction**: Interface doesn't accommodate professional data workflows or file formats

### 🤔 Questions to investigate

- How do users decide between file upload and manual entry based on their available data?
- What factors influence file type selection (KML vs Shapefile) for users with existing coordinate files?
- How do users with different geospatial knowledge approach coordinate system selection across entry methods?
- How do polygon coordinate entry patterns differ from circular site entry in terms of user confidence?
- What strategies do users employ when coordinate entry validation fails across different coordinate systems?
- How do users understand decimal place precision requirements for different coordinate systems and entry methods?
- What happens when users try to enter coordinates outside valid ranges in manual entry workflows?
- How effectively does the review screen build confidence in coordinate accuracy for different site types?
- How do file upload error recovery patterns compare to manual entry validation recovery?
- What upload progress expectations do users have for different file sizes and types?

### 💡 Ideas to explore

- Could file type selection guidance better explain when to use KML vs Shapefile?
- Are there opportunities to help users identify their file type before selection?
- Could coordinate system selection guidance be more accessible to non-technical users across entry methods?
- Are there opportunities to better validate coordinate accuracy during manual entry?
- How might polygon coordinate entry be made clearer for users unfamiliar with boundary definition?
- What additional context would help users verify their coordinate entries across different site types?
- Could file upload progress indication be enhanced to reduce user anxiety during processing?
- How might error messaging be improved to guide users between file upload and manual entry alternatives?

## Session Notes Template

```
SESSION: Site Details Coordinate Entry Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

WORKFLOW OBSERVATIONS:
+ Effective guidance and interaction patterns:
- Friction and confusion points:
? Unclear or uncertain behaviours:
! Improvement opportunities:

DELIVERED FEATURE FINDINGS:
Entry Method Selection: [Manual vs file upload choice, guidance clarity]
File Type Selection: [KML vs Shapefile understanding, decision confidence, help text effectiveness]
File Upload Process: [Upload progress, error handling, virus detection, file size validation]
File Upload Validation: [Error messaging clarity, recovery patterns, professional file format support]
Shape Selection: [Circle vs polygon understanding, choice confidence]
Coordinate System: [WGS84/OSGB36 selection confidence, guidance effectiveness across entry methods]
Centre Point Entry: [Circular site coordinate accuracy, format understanding, validation response]
Polygon Coordinate Entry: [Triangular site boundary definition, multi-point accuracy, validation response]
Width Entry: [Numeric validation, units comprehension, measurement concepts]
Review Screen: [Information verification, completion confidence, accuracy checking across site types]
Navigation: [Flow between screens, state preservation, progress indication]

VALIDATION FINDINGS:
Error Messages: [Clarity, helpfulness, positioning, recovery guidance across workflows]
Range Validation: [Latitude/longitude boundaries, OSGB36 positive values across entry methods]
Precision Requirements: [Decimal place understanding, entry accuracy for different coordinate systems]
File Validation: [Type checking, size limits, virus detection, empty file handling]
Recovery Patterns: [Error correction, focus management, validation retry across workflows]

FILE UPLOAD SPECIFIC FINDINGS:
Upload Progress: [Spinner effectiveness, time estimation, user anxiety management]
File Type Decision: [KML vs Shapefile choice factors, professional data format alignment]
Error Recovery: [Upload failure handling, alternative workflow guidance]
Professional Integration: [GIS file compatibility, specialist-generated file handling]

PERSONA INSIGHTS:
Sarah (Discovery-First): [Coordinate anxiety, file format confusion, guidance needs, completion likelihood]
Marcus (Infrastructure): [Professional data integration, specialist reliance patterns, file format preferences]
Elena (Multi-Project): [Client data workflows, efficiency expectations, file format consistency]
Dr. James (Research): [Technical validation needs, precision requirements, academic file format standards]

@WIP SCENARIOS IDENTIFIED:
Back Navigation: [Advanced back from coordinate entry preserving system selection]
Cancel Functionality: [Cancel from coordinate entry with data discard validation]
File Upload Interruption: [Browser navigation during upload, session recovery]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete site details workflow including location method selection (file upload/manual entry), file type selection (KML/Shapefile), file upload process with validation, circle/polygon choice, coordinate system selection (WGS84/OSGB36), centre point coordinate entry with validation, polygon coordinate entry for triangular sites, circle width entry, and site details review

**@wip scenarios:** Advanced back navigation from coordinate entry pages preserving coordinate system selection, cancel functionality from coordinate entry pages with data discard validation (specific to ML-35, ML-36)

**Related charters:** See [Review and Submission](./review-and-submission.md) for investigation of how site details information appears in check your answers summary and affects user submission confidence
