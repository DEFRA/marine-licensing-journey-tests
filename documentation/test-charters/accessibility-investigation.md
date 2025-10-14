# Accessibility Investigation: Who Gets Left Behind?

## Real People Who Need This Service

### Meet David (Not in our official personas, but real)

David runs a small marine research company. He's blind and uses a screen reader. When he can't complete the exemption application independently, he has to:

- Pay someone to help him (£200 per application)
- Share confidential business information with that person
- Lose his professional independence

**The real cost**: Not just inconvenience, but dignity and business confidentiality.

### Meet Margaret (Also real)

Margaret has arthritis and can't use a mouse. She manages coastal defense projects. When keyboard navigation fails:

- She has to ask younger colleagues for help
- Her professional authority is undermined
- She considers early retirement

**The real cost**: Professional credibility and career longevity.

### Meet Tom (Real person, real problem)

Tom has dyslexia and ADHD. He's an experienced marine contractor but struggles with complex forms. When the system overwhelms him:

- He makes expensive mistakes
- He loses contracts due to delays
- He avoids digital services entirely

**The real cost**: Business opportunities and financial security.

## Investigation Challenges (Not Compliance Tests)

### Can David Complete an Application Alone?

**Try this with a screen reader** (NVDA is free):

1. Close your eyes or turn off your monitor
2. Try to create a project and add a site
3. Notice when you get lost or stuck

**What actually happens to David**:

- Can he understand where he is in the multi-site flow?
- When errors occur, can he find and fix them?
- Can he verify his coordinates are correct before submitting?

### Can Margaret Work Without a Mouse?

**Try this with keyboard only**:

1. Unplug your mouse or disable your trackpad
2. Try to add 5 sites using only Tab, Enter, and arrow keys
3. Try to delete a site and add another

**What actually happens to Margaret**:

- Can she reach the "Add another site" button?
- Can she navigate the coordinate entry fields efficiently?
- If she makes a mistake, can she go back and fix it?

### Can Tom Manage Complexity?

**Try this with cognitive load**:

1. Set a 3-minute timer for each page
2. Have someone interrupt you every 30 seconds
3. Try to complete a multi-site application

**What actually happens to Tom**:

- When does the cognitive load become overwhelming?
- Are instructions clear without jargon?
- Can he recover from mistakes without starting over?

## The Legal Bit (Because It Matters)

Yes, we must meet WCAG 2.1 AA standards. But think about it differently:

| Standard                         | Real Person Impact                          |
| -------------------------------- | ------------------------------------------- |
| **1.3.1 Info and Relationships** | David can't understand form structure       |
| **2.1.1 Keyboard**               | Margaret can't use the service at all       |
| **2.2.1 Timing Adjustable**      | Tom loses everything when session times out |
| **3.3.2 Labels or Instructions** | All users make unnecessary mistakes         |

## Investigation Questions

Don't ask: "Is this WCAG compliant?"

Ask:

- Would David need to pay someone to help him?
- Would Margaret have to reveal her disability to colleagues?
- Would Tom give up and use the paper form instead?
- Are we forcing people to disclose disabilities to get help?
- Are we making disabled users work twice as hard?

## Simple Tests That Reveal Exclusion

### The Dignity Test

Can a disabled user complete this independently without revealing their disability to anyone?

### The Equivalence Test

Does a disabled user have to work significantly harder than others to achieve the same goal?

### The Recovery Test

When things go wrong (and they will), can a disabled user recover independently?

### The Confidence Test

After using the service, would a disabled user feel confident using it again?

## What to Document

Don't write: "Missing ARIA labels on form fields"

Write: "David cannot identify which coordinate field has an error. He has to call MMO for help, revealing his blindness and sharing his business data with support staff."

## The Business Case (If You Need One)

- **15% of working-age adults have a disability**
- **£249 billion annual spending power of disabled people**
- **Legal liability under Equality Act 2010**
- **Reputational damage from discrimination**

But really, it's about David keeping his dignity, Margaret keeping her job, and Tom keeping his business.

## Your Investigation

1. **Find one real barrier** that would force someone to ask for help
2. **Understand the human cost** of that barrier
3. **Document the exclusion**, not the technical failure

Remember: Every accessibility barrier is someone being told "this service isn't for you."

---

_Challenge: Can you find one barrier today that would genuinely exclude someone? That matters more than 100 minor WCAG violations that don't._
