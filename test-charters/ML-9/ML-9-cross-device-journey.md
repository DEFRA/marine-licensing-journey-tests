# ML-9 Scenario Charter: Cross-Device Application Journey

## Charter Definition

**CHARTER:** Investigate task list functionality through realistic cross-device usage patterns to discover continuity gaps and mobile-to-desktop workflow friction

**Duration:** 105 minutes  
**Priority:** Medium  
**Charter Type:** Scenario-Enhanced Investigation

## Scenario Context

### **THEME**

Explore how users move between devices during exemption application completion, testing system behaviour under authentic device switching and network variation scenarios

### **SETUP**

- **Mixed Personas:** Zofia (mobile-first approach) transitioning to Amy (desktop completion)
- **User Context:** Started application on mobile during commute, continuing on desktop at work/home
- **Technology Context:** Mobile phone (iOS/Android), desktop computer, varying network conditions
- **Environmental Context:** Public transport, home, office environments with different connectivity
- **Workflow Context:** Real-world interruptions and device availability patterns

### **REALISTIC PRESSURES**

- **Device availability** - Limited time on mobile, better tools on desktop
- **Network variation** - Mobile data limits, public Wi-Fi, office connections
- **Time fragmentation** - Short mobile sessions, longer desktop completion periods
- **Context switching** - Different locations, mental models, and interaction patterns
- **Urgency management** - Balancing immediate progress with optimal completion conditions

## Scenario Activities

### **Guided Realistic Actions**

#### **Initial Mobile Discovery (Commute Context)**

- Access marine licensing service on mobile during travel
- Quick exploration of task list and exemption requirements
- Attempt to understand progress and completion requirements on small screen
- Save/bookmark application for later completion
- Test mobile navigation and task list status comprehension

#### **Mobile-to-Desktop Transition**

- Resume application on desktop computer several hours later
- Locate where they left off in the application process
- Understand task completion status across device change
- Navigate between completed and incomplete tasks
- Verify information entered on mobile appears correctly on desktop

#### **Cross-Device Data Consistency**

- Check that task list progress is preserved across devices
- Verify that partial form completion is maintained
- Test that user decisions and preferences carry over
- Validate that session state restoration works effectively
- Ensure task status updates reflect accurately on both platforms

#### **Workflow Completion Patterns**

- Use desktop for complex tasks requiring better input capabilities
- Return to mobile for quick status checks and simple updates
- Handle unexpected device unavailability (battery, network issues)
- Complete application using combination of mobile and desktop interactions
- Test final submission from different device than initial start

### **Realistic Variations and Turbulence**

#### **Network and Performance Variations**

- Start on slow mobile connection (3G, poor Wi-Fi)
- Continue on fast desktop connection
- Handle network interruptions during device transitions
- Test behaviour with mobile data limits and restrictions
- Simulate connection timeouts and recovery patterns

#### **Time and Context Fragmentation**

- Begin application during short mobile session (15-20 minutes)
- Long gap between mobile and desktop sessions (hours/days)
- Multiple short mobile sessions for status checking
- Interrupted desktop sessions requiring mobile reference
- Weekend vs weekday access patterns

#### **Device and Browser Variations**

- Different browsers on mobile vs desktop (Safari mobile → Chrome desktop)
- Various screen sizes and input methods
- Touch vs mouse/keyboard interaction model switches
- Different browser settings and cached data
- Cross-platform form behaviour and validation

## Scenario Oracles

### **Cross-Device Continuity Quality Indicators**

#### **Positive Signals:**

- **Seamless progression** - Task list accurately reflects progress regardless of device
- **Context preservation** - Users can easily understand where they left off
- **Data consistency** - Information entered on one device appears correctly on another
- **Status accuracy** - Task completion status updates appropriately across platforms
- **Session reliability** - Application state maintained through device transitions

#### **Warning Signs:**

- **Progress confusion** - Task list status unclear or inconsistent across devices
- **Data loss** - Information entered on one device missing on another
- **Navigation disruption** - Different interaction patterns cause workflow confusion
- **Performance penalties** - Mobile usage creates poor desktop experience or vice versa
- **Context switching friction** - Difficult to resume work after device change

### **Mobile-Desktop Experience Quality**

#### **Mobile Experience:**

- **Quick status access** - Easy to check application progress on mobile
- **Essential functionality** - Core tasks possible on mobile when needed
- **Responsive design** - Interface adapts appropriately to mobile constraints
- **Touch interaction** - Mobile-specific interactions work intuitively
- **Performance efficiency** - Mobile experience optimised for data and battery usage

#### **Desktop Experience:**

- **Enhanced capability** - Complex tasks easier on desktop with better input methods
- **Full feature access** - All functionality available when using desktop
- **Keyboard efficiency** - Desktop interactions support keyboard navigation
- **Multi-tasking support** - Can handle reference materials and multi-tab workflows
- **Professional presentation** - Interface suitable for business/professional contexts

## Evidence Collection Framework

### **Discovery Documentation**

#### **Cross-Device Journey Evidence:**

- **Transition smoothness** - How well does application support device switching?
- **Progress preservation** - What information is maintained vs lost during transitions?
- **Context restoration** - How easily can users resume work after device change?
- **Performance impact** - How do different devices affect application responsiveness?

#### **User Experience Consistency Evidence:**

- **Interface adaptation** - How well does design work across different screen sizes?
- **Interaction patterns** - Are touch and mouse/keyboard interactions both supported?
- **Information architecture** - Does task list structure work on both mobile and desktop?
- **Visual hierarchy** - Are priorities and status clear on different screen sizes?

#### **Technical Integration Evidence:**

- **Data synchronisation** - How reliably is information synced between devices?
- **Session management** - How well does system handle cross-device session state?
- **Performance optimisation** - Are mobile and desktop experiences appropriately optimised?
- **Network resilience** - How does system handle varying connection quality?

### **Problem Classification**

#### **Critical Issues (Immediate Attention)**

- Data loss or corruption during device transitions
- Complete inability to resume application on different device
- Task list status becoming permanently inconsistent
- Application breaks or becomes unusable after device switching

#### **Significant Issues (High Priority)**

- Progress confusion that significantly impacts user ability to complete application
- Major performance issues on mobile that force users to desktop prematurely
- Navigation patterns that work poorly across device types
- Form data not preserving correctly between devices

#### **Improvement Opportunities (Medium Priority)**

- Interface optimisations that would improve mobile experience
- Desktop features that would better support mobile-initiated workflows
- Performance improvements for cross-device transitions
- Better progress communication across different screen sizes

## Follow-up Investigation Areas

### **Immediate Follow-ups**

- **Traditional technical charter** - Detailed validation of data synchronisation and session management
- **Mobile-specific charter** - Deep investigation of mobile-only usage patterns
- **Desktop optimisation charter** - Focus on desktop-specific efficiency and capabilities

### **Suggested Scenarios**

- **Network resilience scenario** - Extended testing of connection interruption recovery
- **Accessibility cross-device** - How do assistive technologies work across device transitions?
- **Professional mobile scenario** - Mobile usage in business contexts and client interactions

### **Automation Implications**

- Which cross-device workflows should automation validate?
- How can automated tests simulate realistic device switching?
- What performance benchmarks are needed for mobile vs desktop experience?

## Session Structure

### **Setup Phase (15 minutes)**

- Configure mobile device and desktop computer for testing
- Set up network conditions simulation (mobile data, Wi-Fi, variations)
- Prepare realistic exemption application data
- Review cross-device usage patterns and user expectations

### **Investigation Phase (75 minutes)**

- **Mobile session (25 minutes)** - Authentic mobile usage with time/environment constraints
- **Transition period (5 minutes)** - Simulate realistic gap between device usage
- **Desktop session (30 minutes)** - Resume and continue application on desktop
- **Cross-device validation (15 minutes)** - Test data consistency and status accuracy

### **Debrief Phase (15 minutes)**

- Assess cross-device journey realism and workflow effectiveness
- Document key evidence using continuity framework categories
- Identify critical issues with device transition support
- Plan follow-up investigations and technical validation needs

---

**Related Resources:**

- **[ML-9 User Story](../../.cursor/user-stories/ML-9.view.task.list.mdc)** - Requirements and acceptance criteria
- **[Domain Context](../../test-strategy/domain-context/README.md)** - Real user device usage patterns
- **[Accessibility Testing](../../test-strategy/accessibility/README.md)** - Mobile-specific accessibility considerations
- **[Traditional ML-9 Charters](./ML-9-navigation.md)** - Complementary technical investigations

_This scenario charter reveals how task list functionality serves users who realistically move between mobile and desktop devices during their exemption application journey._
