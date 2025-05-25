# Investigative Testing - Human-Centred Discovery

> **🎯 Simple Approach**  
> **60-90 minute sessions** where **domain experts explore** realistic user scenarios to discover insights automation cannot find.

## 📚 Investigative Testing Resources

Choose the guidance that matches your needs:

- **[Test Charters](../test-charters/README.md)** - Ready-to-execute investigation plans with specific scenarios for different user stories
- **[Advanced Techniques](./investigative-testing-advanced.md)** - Systematic heuristics and integration with HTSM for experienced practitioners
- **[Session Templates](./investigative-testing-templates.md)** - Ready-to-use documentation and planning templates for facilitating sessions
- **[Attribution & Foundations](./investigative-testing-attribution.md)** - Acknowledgments to testing thought leaders and theoretical foundations

## 🎭 What is Investigative Testing?

**Investigative testing** = **Domain experts** + **Realistic scenarios** + **Focused exploration** = **Insights automation misses**

### **Why This Works**

- ✅ **Leverage existing knowledge** - MMO staff understand user needs and regulatory requirements
- ✅ **Accessible techniques** - 60-minute sessions anyone can run
- ✅ **Practical outcomes** - Findings that improve automation or user guidance
- ✅ **Risk-focused** - Concentrate effort where human insight matters most

### **When to Use Investigative Testing**

- 🔍 **New features** - Explore user experience before release
- ⚠️ **High-risk areas** - Critical workflows that need human validation
- 🐛 **After incidents** - Understand what automation missed
- 📊 **User feedback** - Investigate reported problems systematically

## 🏗️ Simple Investigation Framework

### **Quick 60-90 Minute Session Structure**

```
📋 Setup (10 minutes)
├── Pick area to explore
├── Choose realistic user context
└── Decide what questions to answer

🔍 Exploration (45-70 minutes)
├── Follow realistic user workflows
├── Try variations and edge cases
├── Note anything odd, slow, or confusing
└── Test scenarios automation might miss

📝 Wrap-up (5-10 minutes)
├── Document key findings
├── Identify follow-up actions
└── Share insights with team
```

### **Simple Investigation Template**

```
EXPLORE: [Area you want to investigate]
AS: [Type of user - MMO staff, applicant, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights you hope to find]
```

**Example:**

```
EXPLORE: Exemption project name entry
AS: First-time applicant with limited marine licensing knowledge
BECAUSE: We've had support queries about project naming confusion
LOOKING FOR: Guidance gaps, terminology issues, validation problems
```

## 🎬 Ready-to-Use Investigation Scenarios

### **🆕 New User Experience**

**Quick Version**: Try completing exemption notification as someone who's never done this before

- Start without reading all guidance (realistic behaviour)
- Deliberately misinterpret marine licensing terminology
- Use help features when genuinely confused
- **Look for**: Confusing error messages, missing guidance, accessibility barriers

### **⚡ Expert Efficiency**

**Quick Version**: Complete notification as experienced maritime consultant

- Attempt to reuse information from previous applications
- Use keyboard navigation exclusively for speed
- Work with multiple browser tabs
- **Look for**: Unnecessary steps, data reuse opportunities, workflow friction

### **📱 Real-World Conditions**

**Quick Version**: Use the service under realistic pressure and constraints

- Simulate interruptions (phone calls, urgent emails)
- Switch between mobile and desktop mid-task
- Test with poor internet connectivity
- **Look for**: Progress preservation, error recovery, device compatibility

> **📚 Detailed Scenarios**: See [Investigation Examples](./investigative-testing-examples.md) for comprehensive scenario scripts

## 📝 Simple Documentation

### **Session Notes Template**

```
SESSION: [What you investigated]
WHO: [Your name and role]
WHEN: [Date and duration]

FINDINGS:
+ Things that worked well
- Problems discovered
? Questions raised
! Ideas for improvement

NEXT ACTIONS:
□ Issues to report
□ Automation gaps identified
□ Further investigation needed
```

### **Evidence to Collect**

- **Screenshots** of confusing or broken behaviour
- **Timing observations** for slow or frustrating steps
- **Error messages** that don't make sense to users
- **Accessibility issues** discovered during testing

## 🎪 Integration with Team Workflow

### **Automation + Investigation Working Together**

```
BDD Automated Tests          Investigation Sessions       Combined Result
├── Happy path coverage  +   ├── Edge case discovery  =  ├── Comprehensive validation
├── Regression protection    ├── UX problem finding      ├── Real-world readiness
└── Known error scenarios    └── Accessibility testing   └── User satisfaction
```

### **Planning Investigation Sessions**

- **Work planning** - Include investigation time for new features
- **Release preparation** - Risk-focused sessions before major releases
- **User feedback response** - Investigate reported problems systematically
- **Regular rhythm** - Monthly investigation of different application areas

## 📊 Simple Success Measures

### **🏆 Investigation is Working When:**

- **Domain experts regularly contribute** investigation insights
- **Findings lead to improvements** in automation or user guidance
- **User experience problems are caught** before release
- **Team confidence increases** based on thorough exploration

### **📈 Track These Simple Metrics**

- **Sessions per month** - Are we investigating regularly?
- **Findings per session** - Are sessions discovering useful insights?
- **Actions taken** - Do findings lead to improvements?
- **User satisfaction** - Are investigation insights improving real experience?

---

_**Remember**: The goal isn't perfect testing - it's practical insight that makes the marine licensing service better for real users._

**🎯 Success**: Domain experts regularly discover valuable insights that improve both automation and user experience.
