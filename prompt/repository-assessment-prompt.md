# Repository Assessment Prompt: Marine Licensing Journey Tests

## Context

You are analyzing a BDD test automation repository for a Marine Licensing service. A new QA team has inherited this codebase with no handover and needs to understand:

1. **Business Logic Grouping**: How are features grouped based on the business logic they test?
2. **Scenario Overlap**: Which Scenarios cover subsets of User Journeys covered by other Scenarios?

## Repository Overview

**System Under Test:**

- Marine Licensing Frontend (Hapi.js with GOV.UK Design System)
- Marine Licensing Backend (Hapi.js REST API with MongoDB)
- External integrations: DEFRA ID (OIDC), Microsoft Dynamics 365, LocalStack (AWS services)

**User Journeys Covered:**

- Exemption notification submission (core workflow)
- Multi-site workflows (circular and polygon sites)
- File uploads (KML, Shapefiles)
- Coordinate system handling (WGS84, OSGB36)
- Public register interactions
- D365 case verification
- Authentication flows (DEFRA ID)

## Assessment Tasks

### 1. Business Logic Grouping

**Group features based on the business logic they test:**

a) **Analyze User Journeys**

- Read and analyze user stories in `documentation/user-stories/` to understand the User Journeys
- Map each User Journey to its business purpose and scope
- Identify the complete flow of each User Journey from start to finish

b) **Group Features by Business Logic**

- Analyze feature files (`test/features/*.feature`) to identify what business logic each feature tests
- Group features that test the same or related business logic
- Document the business domain/capability each group represents
- Identify features that span multiple business domains

c) **Map Scenarios to User Journeys**

- For each scenario, identify which User Journey(s) it covers
- Document the portion of each User Journey covered by each scenario
- Identify scenarios that cover complete User Journeys vs. partial User Journeys

### 2. Scenario Overlap Analysis

**Identify overlap between Scenarios:**

a) **Identify Subset Relationships**

- Compare scenarios to identify when one scenario covers a subset of another scenario's User Journey
- Flag scenarios where:
  - Scenario A covers steps 1-5 of a User Journey
  - Scenario B covers steps 1-8 of the same User Journey
  - In this case, Scenario A is a subset of Scenario B
- Document the relationship type (subset, overlap, duplicate, etc.)

b) **Document Overlap Patterns**

- Identify common patterns of overlap:
  - Scenarios that test the same User Journey with different data
  - Scenarios that test partial flows vs. complete flows
  - Scenarios that test different entry points to the same User Journey
- Document the extent of overlap (e.g., "Scenario X covers 60% of Scenario Y's User Journey")

c) **Flag Redundancies**

- Identify scenarios that may be redundant due to overlap
- Flag scenarios where one scenario fully encompasses another
- Note scenarios that test the same business logic with minor variations

d) **Visualize Overlaps with Mermaid Diagram**

- Generate a Mermaid flowchart diagram that visualizes the main User Journey flow
- Show the complete journey from Project Setup through to D365 Integration
- Include all three Site Details pathways (File Upload, Manual Circle, Manual Polygon)
- Use dashed lines to indicate validation scenarios that overlap with main journey steps
- Use different styling/colors to distinguish:
  - Main journey steps (solid lines, primary color)
  - Validation scenarios that are subsets (dashed lines, secondary color)
- Include user story references (e.g., ML-1, ML-9) in the diagram nodes
- Place the diagram immediately after the "Scenario Overlap Analysis" section heading in the output

## Assessment Methodology

**To perform this assessment:**

1. **Read and analyze user stories:**
   - Read all user stories in `documentation/user-stories/` to understand User Journeys
   - Map User Journeys to their business purpose and complete flow
   - Document the scope and boundaries of each User Journey

2. **Read and analyze feature files:**
   - Feature files (`test/features/*.feature`) - analyze what business logic each scenario tests
   - Step definitions (`test/steps/*.js`) - understand what each step validates
   - Map each scenario to the User Journey(s) it covers

3. **Compare scenarios for overlap:**
   - Compare scenarios within the same feature file
   - Compare scenarios across different feature files
   - Identify when one scenario's User Journey is a subset of another's
   - Document the relationship and extent of overlap

# Instructions

## Expected Output Format

Provide your analysis in the following structure:

# Marine Licensing Journey Tests - Repository Analysis

## 1. Business Logic Grouping

### User Journeys Overview

[Summary of User Journeys identified from user-stories documentation, with their business purpose and scope]

### Feature Groups by Business Logic

[Features grouped by the business logic they test, with explanation of each group's business domain]

### Scenario-to-User-Journey Mapping

[Table or list mapping each scenario to the User Journey(s) it covers, showing the portion of each journey covered]

## 2. Scenario Overlap Analysis

[Insert Mermaid flowchart diagram here visualizing the main User Journey and scenario overlaps]

### Subset Relationships

[Scenarios flagged where one covers a subset of another's User Journey, with details on the relationship]

### Overlap Patterns

[Common patterns of overlap identified, with examples from the codebase]

### Redundancy Flags

[Scenarios flagged as potentially redundant due to overlap, with justification]

## Key Questions to Answer

1. **What User Journeys are documented in the user-stories?**
   - What is the complete flow of each User Journey?
   - What is the business purpose and scope of each User Journey?

2. **How are features grouped by business logic?**
   - Which features test the same business logic?
   - What business domains/capabilities do the feature groups represent?

3. **Which scenarios cover which User Journeys?**
   - Does each scenario cover a complete User Journey or a partial one?
   - Which scenarios cover multiple User Journeys?

4. **What overlap exists between scenarios?**
   - Which scenarios cover subsets of other scenarios' User Journeys?
   - What is the extent of overlap between scenarios?
   - Are there redundant scenarios that should be flagged?

## Analysis Criteria

The analysis should:

- ✅ Include only observable facts from the codebase and user-stories documentation
- ✅ List examples from actual feature files and user stories
- ✅ Group features based on the business logic they test
- ✅ Clearly flag scenarios where one covers a subset of another's User Journey
- ✅ Reference specific user stories when mapping scenarios to User Journeys
- ✅ Avoid subjective assessments, ratings, or recommendations
