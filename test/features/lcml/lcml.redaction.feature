@real-defra-id @issue=ML-1507
Feature: LCML: Redacting an application for the public register
  As a caseworker
  I want to be able to select which aspects of an application I want to redact
  So that the application can be published to the public register without any
  commercial or national security concerns

  Scenario: A redaction is saved against the field without changing what the applicant sees
    Given a submitted marine licence and a signed in caseworker
    When the caseworker opens the application for redaction
    And the caseworker redacts "Proposed works summary"
    Then "Proposed works summary" shows the redaction marker in white on black
    And only the change and remove options are offered for "Proposed works summary"
    And the applicant still sees their own text for "Proposed works summary"

  Scenario: Replacing a document uploads a new version and keeps the original
    Given a submitted marine licence and a signed in caseworker
    When the caseworker opens the application for redaction
    And the caseworker replaces the construction drawing with "replacement-drawing.pdf"
    Then the construction drawing is shown as "replacement-drawing.pdf"
    And removing the redaction restores the original construction drawing

  Scenario: The redaction page is only reachable after signing in with EntraID
    Given a submitted marine licence and a signed in caseworker
    When someone who has not signed in opens the redaction page
    Then they are sent to the Microsoft sign in page
