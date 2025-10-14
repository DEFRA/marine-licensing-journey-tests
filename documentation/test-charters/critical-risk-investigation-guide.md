# Critical Risk Investigation Guide: What Actually Threatens User Value?

## Stop Testing Everything. Start Finding What Matters.

This guide challenges you to think beyond test cases and find the risks that would actually harm real people trying to use this service. No prescriptive steps. No technical attacks. Just genuine investigation of what could go wrong for the people who matter.

## The People Who Matter (And What They Fear)

### Sarah - Property Owner

_"The coordinates threw me off a bit... I'd probably ring someone if got stuck"_

- **Her nightmare**: Submitting wrong coordinates and getting fined for working in the wrong area
- **Her value at risk**: Time, money, and legal compliance for her one-off project

### Marcus - Port Authority Professional

_"Best thing MMO ever did was introduce the self service tool"_

- **His nightmare**: System fails during critical port development, delays costing millions
- **His value at risk**: Professional reputation and operational continuity

### Elena - Environmental Consultant

_"One of the pain points is repeating info"_

- **Her nightmare**: Mixing up client data, submitting wrong information for wrong client
- **Her value at risk**: Professional liability and client relationships

### Dr. James - Research Scientist

_"I would have a summary doc to copy from"_

- **His nightmare**: Losing months of research because coordinates were slightly wrong
- **His value at risk**: Research validity and funding continuation

### Rachel - MMO Enforcement Officer

_"All exemptions and license cases are mixed up"_

- **Her nightmare**: Invalid exemption slips through, environmental damage occurs
- **Her value at risk**: Regulatory compliance and public trust

## Investigation Challenges (Not Test Cases)

### 1. The Multi-Site Confusion Challenge

**Question to investigate**: When Elena manages 5 projects with 20 sites each, what breaks first - the system or Elena?

**Think about**:

- Not memory leaks, but Elena's mental model breaking down
- Not state corruption, but client data getting mixed up
- Not performance metrics, but Elena giving up and calling MMO

**Find out**:

- At what point does she lose track of which site belongs to which client?
- When does "Add another site" become "I can't remember what I've already added"?
- How does she verify she hasn't mixed up client data?

### 2. The Coordinate Anxiety Challenge

**Question to investigate**: How many Sarahs give up before completing their first application?

**Think about**:

- She doesn't know WGS84 from OSGB36 (and shouldn't have to)
- She's copying coordinates from Google Maps on her phone
- She's already anxious about getting it wrong

**Find out**:

- What happens when she enters coordinates in the wrong format?
- Does the system help her or make her more confused?
- At what point does she give up and call for help?

### 3. The Professional Trust Challenge

**Question to investigate**: Would Marcus trust this system with a £10 million port development?

**Think about**:

- He needs audit trails for everything
- One mistake could delay the project by months
- He's comparing this to the paper process he trusts

**Find out**:

- Can he prove what he submitted if questioned later?
- What happens if the system fails halfway through submission?
- How does he know his data hasn't been corrupted?

### 4. The Research Precision Challenge

**Question to investigate**: Can Dr. James submit coordinates precise enough for scientific validity?

**Think about**:

- His coordinates come from expensive GPS equipment
- He needs exact precision, not "close enough"
- His research depends on returning to exact locations

**Find out**:

- Does the system preserve the precision he enters?
- What validation might reject valid scientific coordinates?
- Can he verify the system hasn't altered his data?

### 5. The Regulatory Compliance Challenge

**Question to investigate**: What invalid exemptions could slip through that would damage MMO's reputation?

**Think about**:

- Activities that shouldn't qualify but might get through
- Locations outside UK jurisdiction
- Cumulative impacts that exceed thresholds

**Find out**:

- Not by testing every edge case, but by thinking like someone trying to game the system
- What would a developer trying to avoid full licensing attempt?
- What mistakes would Rachel catch that the system doesn't?

## How to Investigate (Your Way, Not Ours)

### Start with empathy, not test cases

1. **Become the user** - Actually try to complete their task with their mindset
2. **Feel their pressure** - Time constraints, anxiety, professional stakes
3. **Use their tools** - Mobile phone, slow connection, interruptions

### Look for value destruction, not bugs

- **Time wasters** - Where do users spend unnecessary time?
- **Confusion creators** - What makes users doubt themselves?
- **Trust breakers** - What would make them abandon the digital service?
- **Career threateners** - What could damage their professional standing?

### Document what matters

Don't write:

> "System accepts invalid coordinates outside UK boundary"

Write:

> "Sarah could accidentally request permission for coordinates in French waters, potentially facing international legal issues she doesn't understand"

## The Real Critical Risks (Investigate These First)

### Risk 1: The Overwhelm Point

**Every user has a breaking point where complexity overwhelms them.**

- For Sarah, it might be coordinate systems
- For Elena, it might be managing 50+ sites
- For Marcus, it might be losing work after 30 minutes

Find each user's overwhelm point. That's where value destruction happens.

### Risk 2: The Mistake Multiplier

**Multi-site features multiply the impact of every mistake.**

- One wrong coordinate becomes 20 wrong coordinates
- One misunderstanding about dates affects all sites
- One client's data contaminating another's application

Find how mistakes cascade. Small errors shouldn't become disasters.

### Risk 3: The Trust Moment

**Every user has a moment where they either trust the system or don't.**

- Sarah: "Are these the right coordinates?"
- Marcus: "Is my data safe?"
- Elena: "Have I mixed up my clients?"
- James: "Is my precision preserved?"

Find what builds or breaks trust at these critical moments.

### Risk 4: The Abandonment Trigger

**Something makes users give up and call MMO instead.**

- Cumulative friction across the journey
- One insurmountable barrier
- Loss of confidence in their inputs

Find what triggers abandonment. Every abandonment is a service failure.

## Your Investigation, Your Insights

This guide doesn't tell you how to test. It challenges you to think about:

- **Who loses** when things go wrong
- **What they lose** (time, money, reputation, research, compliance)
- **Why it matters** to them and to MMO

Don't test the system. Investigate the risks to real people doing real work.

## Questions to Guide Your Investigation

Instead of "Does this feature work?", ask:

- Who depends on this working correctly?
- What happens to them if it fails?
- How would they know it failed?
- What would they do next?
- Could they recover?
- Would they trust us again?

## Remember

**You're not finding bugs. You're protecting value.**

The best test result isn't "10 bugs found" but "Elena can manage 50 sites across 5 clients without mixing up data or losing her mind."

---

_Challenge yourself: Can you find one risk today that would genuinely harm someone who matters? That's worth more than 100 edge cases that don't._
