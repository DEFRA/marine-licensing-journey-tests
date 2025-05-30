# Marine Licensing User Personas

This directory contains user personas developed from research with actual marine licensing users. These personas help ground our test scenarios, feature development, and user journeys in the real needs and challenges of the people who will use the service.

## 👥 Persona Overview

| Persona    | Role                        | Key Needs                                               | Persona File                                            |
| ---------- | --------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| **Fatima** | Case Officer (MMO Staff)    | View-only access to support enquiries                   | [Fatima - Case Officer](./fatima-case-officer.md)       |
| **Simon**  | Marine Officer (MMO Staff)  | Check compliance, assess risk, take enforcement actions | [Simon - Marine Officer](./simon-marine-officer.md)     |
| **Amy**    | Veteran Applicant           | Complete applications efficiently, ensure compliance    | [Amy - Veteran Applicant](./amy-veteran-applicant.md)   |
| **Zofia**  | Novice Individual Applicant | Understand requirements, complete unfamiliar process    | [Zofia - Novice Applicant](./zofia-novice-applicant.md) |

## 🔍 Using Personas in Testing

Our personas inform our testing approach in several ways:

### 1. **User Journey Testing**

Each persona represents a unique path through the system with different priorities:

- **Fatima** → Case management and support workflows
- **Simon** → Enforcement and compliance verification
- **Amy** → Efficient repeat application process
- **Zofia** → First-time user onboarding and guidance

### 2. **Accessibility Considerations**

- **Zofia** highlights digital inclusion needs and assisted digital pathways
- **Amy** shows professional user efficiency requirements
- **Fatima** represents internal system integration needs
- **Simon** demonstrates mobile and field access patterns

### 3. **Test Charter Selection**

Specific [test charters](../test-charters/README.md) are designed around persona journeys:

- [Novice Journey](../test-charters/novice-journey.md) focuses on **Zofia's** experience
- [Expert Workflows](../test-charters/expert-workflows.md) explores **Amy's** needs
- Internal staff charters will be developed for **Fatima** and **Simon**

## 🔄 Persona Development

These personas are living documents based on ongoing user research. As we learn more about our users, we will:

1. Update persona details and needs
2. Add new personas if significant user groups are identified
3. Refine testing strategies based on new insights
4. Develop more targeted test charters

## 📚 Related Documentation

- [Test Strategy](../test-strategy/README.md) - How personas inform our testing approach
- [Test Charters](../test-charters/README.md) - Investigative testing plans based on personas
- [User Stories](../user-stories/README.md) - Requirements informed by persona needs

---

_Our personas represent real people with real needs. By keeping them at the center of our testing approach, we ensure the marine licensing service works for everyone who needs to use it._
