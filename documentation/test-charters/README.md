# Test Charters: Finding What Threatens Real User Value

> **Our new approach**: Stop following test scripts. Start investigating real human impact.  
> **Start here →** [Critical Risk Investigation Guide](./critical-risk-investigation-guide.md)

---

## The People We're Protecting

Before you test anything, know who you're protecting:

- **Sarah** - First-time user with coordinate anxiety who might give up
- **Marcus** - Port authority with millions at stake who needs to trust us
- **Elena** - Consultant juggling multiple clients who can't afford mix-ups
- **Dr. James** - Researcher whose work depends on coordinate precision
- **Rachel** - MMO officer who prevents environmental disasters
- **David** - Blind business owner who needs independence (accessibility)
- **Margaret** - Professional with arthritis who can't use a mouse
- **Tom** - Contractor with dyslexia who struggles with complexity

## Available Investigations

### Core User Journey Investigations

These focus on where real value gets destroyed for real people:

| Investigation                                                                      | The Human Question                      | Start With This When...                 |
| ---------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------- |
| [**Critical Risk Investigation Guide**](./critical-risk-investigation-guide.md) 🔥 | What actually threatens user value?     | You want to find what really matters    |
| [**Novice Journey**](./novice-journey.md)                                          | Where does Sarah give up?               | You see high abandonment rates          |
| [**Expert Workflows**](./expert-workflows.md)                                      | Why doesn't Marcus trust us?            | Professionals complain about efficiency |
| [**Form Interactions**](./form-interactions.md)                                    | Where do mistakes multiply?             | Error rates are high                    |
| [**Site Details**](./site-details.md)                                              | Why are coordinates so scary?           | Users call for help with locations      |
| [**Manual Polygon Site Details**](./manual-polygon-site-details.md)                | When does complexity overwhelm?         | Multi-point entry causes problems       |
| [**Review and Submission**](./review-and-submission.md)                            | Do users trust what they're submitting? | Users submit incorrect data             |
| [**Back and Cancel Navigation**](./back-and-cancel-navigation.md)                  | Where does progress get lost?           | Users complain about losing work        |
| [**Accessibility**](./accessibility-investigation.md)                              | Who gets excluded?                      | You need to ensure dignity for all      |

### Previous Testing Sessions

Real investigations that found real problems:

| Session                                                                                     | What We Found                          | Why It Mattered             |
| ------------------------------------------------------------------------------------------- | -------------------------------------- | --------------------------- |
| [Back/Cancel Navigation](./session-output/back-and-cancel-navigation-session-2025-06-25.md) | Inconsistent patterns confuse users    | Sarah loses confidence      |
| [Manual Polygon Entry](./session-output/manual-polygon-site-details-session-2025-07-14.md)  | Validation bugs trap users             | All users get stuck         |
| [Novice Journey](./session-output/novice-journey-session-2025-06-26.md)                     | Coordinate entry is the breaking point | Sarah's abandonment trigger |

## How to Investigate (Not Test)

### 1. Pick a Real Person

Don't be "a tester". Be Sarah, Marcus, Elena, or David. Adopt their mindset, fears, and pressures.

### 2. Try Their Real Task

Not "test the multi-site feature" but "Elena needs to submit 5 applications before lunch without mixing up client data."

### 3. Feel Their Pressure

- Sarah's anxiety about getting it wrong
- Marcus's need for audit trails
- Elena's juggling multiple clients
- David's need for independence

### 4. Document Human Impact

Not "validation error on coordinate field" but "Sarah tried three times with coordinates from Google Maps, got confused by error messages, gave up, called MMO."

## What Makes a Good Investigation?

### ✅ Good Investigation

"When Elena manages applications for 5 different clients, she loses track of which sites belong to which client after about 12 sites total. The interface doesn't help her maintain this critical separation. Risk: Professional liability from mixed client data."

### ❌ Poor Test Report

"Multi-site functionality allows >50 sites. Performance degrades at N=47. Memory consumption exceeds threshold."

### ✅ Good Finding

"Tom (dyslexia + ADHD) cannot complete the form when session timeout is 20 minutes. He needs breaks to process information. Extending timeout to 60 minutes would prevent discrimination."

### ❌ Poor Bug Report

"WCAG 2.1 violation: 2.2.1 Timing Adjustable not implemented correctly."

## Questions That Matter

Before documenting any issue, ask:

1. **Who** is harmed by this?
2. **What** do they lose? (time, money, dignity, opportunity)
3. **How likely** is this scenario?
4. **Can they recover** without help?
5. **Will they trust us** again?

If you can't answer these questions, you haven't found a real risk.

## Creating New Investigations

When you identify a new risk area:

1. **Start with a real person's real problem**
2. **Write their nightmare scenario**
3. **Design investigations, not test cases**
4. **Focus on preventing harm, not finding bugs**

## Remember

> "The best testing protects real people from real harm."

Every investigation should make you think: "What would happen to Sarah/Marcus/Elena/David if this went wrong?"

---

_These investigations are living documents. When you learn something new about our users' reality, update them. The goal isn't comprehensive testing - it's protecting the people who depend on this service._
