# ML-12 Data Protection Charter: Privacy & Data Handling

## Charter Definition

**EXPLORE:** Public register consent data handling, privacy implications, and data protection  
**WITH:** Different consent scenarios, data persistence testing, privacy considerations  
**TO DISCOVER:** Whether consent data is handled appropriately and privacy is protected

**Duration:** 60 minutes  
**Priority:** Medium  
**User Personas:** All personas with focus on data protection concerns

## Background Context

**User Story:** ML-12 - Provide or Withhold Public Register Content  
**Data Protection Focus:** How consent decisions and withheld information are stored, processed, and protected

**Key Data Protection Considerations:**

- Consent information storage and handling
- Withheld information privacy protection
- Data retention and deletion policies
- GDPR compliance for consent management

## Investigation Areas

### **Consent Data Handling**

- How is the consent decision (Yes/No) stored in the system?
- Where is the withheld information reason text stored?
- What access controls exist for this sensitive data?
- How is the data transmitted and encrypted?

### **Data Persistence & Retrieval**

- Can users change their consent decision after initial submission?
- How long is consent data retained in the system?
- Who has access to view withheld information reasons?
- How is data backup and recovery handled for this sensitive information?

### **Privacy Protection**

- If users choose to withhold information, is it actually protected from public view?
- How are withheld applications differentiated in public registers?
- What information is still visible even when consent is withheld?
- Are there any data leakage risks through system interfaces?

### **Compliance & Governance**

- Does the consent process meet GDPR requirements?
- How are data subject rights (access, rectification, erasure) supported?
- What audit trails exist for consent decisions?
- How are data protection impact assessments reflected in the system?

## Data Flow Investigation

### **Consent Decision Storage**

1. Submit consent choice (Yes/No) with reasons
2. Verify data is saved correctly in system
3. Test data retrieval on subsequent visits
4. Check data persistence across different user sessions
5. Investigate where and how this data is stored

### **Information Sharing Scenarios**

1. Test "No" (consent to share) - what information becomes public?
2. Test "Yes" (withhold) - what information remains private?
3. Verify public register behaviour with different consent choices
4. Check back-office system access to withheld information
5. Test any public API or search functionality

### **Data Modification & Deletion**

1. Can users change their consent decision?
2. Test updating reason text for withholding
3. Investigate data versioning or history tracking
4. Test account deletion scenarios
5. Check data retention policy implementation

## Privacy Risk Assessment

### **Information Leakage Risks**

- Are there any ways withheld information could become public accidentally?
- How are system errors or bugs handled when they involve withheld data?
- What happens if public register systems are compromised?
- Are there any timing attacks or indirect disclosure risks?

### **Access Control Testing**

- Who can access withheld information within MMO systems?
- How are staff permissions managed for sensitive consent data?
- Are there appropriate logging and audit controls?
- How is unauthorised access prevented and detected?

### **Cross-System Data Sharing**

- How does consent information integrate with other government systems?
- What data sharing agreements exist for marine licensing information?
- How are consent preferences honoured across different systems?
- Are there any automated data sharing processes that need consent checking?

## GDPR Compliance Scenarios

### **Data Subject Rights**

- **Right to Access:** Can users view their stored consent data?
- **Right to Rectification:** Can users correct consent information?
- **Right to Erasure:** Can users request deletion of consent data?
- **Right to Data Portability:** Can users export their consent preferences?

### **Consent Management**

- Is consent freely given, specific, informed, and unambiguous?
- Can consent be withdrawn as easily as it was given?
- How are consent changes communicated to relevant systems?
- Is there clear evidence of consent for audit purposes?

### **Data Processing Transparency**

- Do users understand how their consent choice affects data processing?
- Is the public register data processing explained clearly?
- Are users informed about who will access withheld information?
- How are processing purposes communicated and limited?

## Technical Data Protection

### **Data Encryption & Security**

- How is consent data encrypted in transit and at rest?
- What security controls protect the database containing consent information?
- How are backups secured and encrypted?
- Are there any plain-text storage or transmission risks?

### **System Integration Security**

- How do external systems access marine licensing data?
- What authentication and authorisation controls exist?
- How is consent status checked before data sharing?
- Are there any API security vulnerabilities?

### **Audit & Monitoring**

- What logging exists for consent data access?
- How are suspicious access patterns detected?
- What monitoring exists for public register data sharing?
- How are data protection violations detected and handled?

## User Understanding & Informed Consent

### **Transparency Testing**

- Do users understand what "public register" means?
- Is it clear what information will be shared if they consent?
- Do they understand who will have access to withheld information?
- How well do they understand the implications of their choice?

### **Decision Quality**

- Are users making genuinely informed consent decisions?
- Do they have enough information about data processing?
- How does the interface support meaningful choice?
- Are there any pressure points that could invalidate consent?

### **Consent Withdrawal**

- Can users easily find information about changing their consent?
- Is the withdrawal process as easy as the original consent?
- How quickly are consent changes reflected in data processing?
- Are users notified when consent withdrawal is processed?

## Edge Cases & Risk Scenarios

### **System Failure Scenarios**

- What happens if consent data is corrupted or lost?
- How does the system behave if consent status is unclear?
- What safeguards exist for consent data during system maintenance?
- How are consent preferences restored after system failures?

### **Legal & Regulatory Changes**

- How would changes to public register requirements affect stored consent?
- What happens if GDPR requirements change?
- How flexible is the consent system for regulatory compliance?
- Are there any legacy consent decisions that need special handling?

### **Cross-Border Data Handling**

- How is consent managed for international data transfers?
- What happens if users are located outside the UK?
- How are different jurisdictional requirements handled?
- Are there any data sovereignty considerations?

## Success Indicators

### **Good Data Protection**

- Consent choices are clearly understood and honoured
- Withheld information remains appropriately private
- Data handling is transparent and compliant with GDPR
- Users have meaningful control over their data
- Security controls appropriately protect consent information

### **Areas for Investigation**

- Unclear or misleading consent processes
- Inappropriate access to withheld information
- Technical vulnerabilities in data protection
- Non-compliance with data protection regulations
- Poor user understanding of data processing implications

## Documentation Focus

Record:

- **Data flow observations** - How consent data moves through systems
- **Privacy protection assessment** - Effectiveness of withholding mechanisms
- **GDPR compliance gaps** - Any regulatory compliance issues
- **Security considerations** - Technical data protection measures
- **User understanding insights** - Quality of informed consent

## Follow-up Actions

- Report any data protection vulnerabilities found
- Document GDPR compliance gaps for legal review
- Identify improvements needed for consent transparency
- Note any security recommendations for consent data
- Provide feedback on user understanding and decision quality

---

**Related User Story:** [ML-12.provide.or.withhold.public.register.content.mdc](../../.cursor/user-stories/ML-12.provide.or.withhold.public.register.content.mdc)  
**Previous Charter:** [ML-12 Validation Testing](./ML-12-validation.md)  
**Charter Series Complete** - All ML-12 charters finished
