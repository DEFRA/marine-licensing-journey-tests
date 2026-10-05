Feature: LCML: Redacting an application for the public register
  As a caseworker
  I want to be able to select which aspects of an application I want to redact
  So that the application can be published to the public register without any
  commercial or national security concerns

  @real-defra-id @issue=ML-1507 @issue=ML-1513
  Scenario: A redaction is saved against the field and published only in the preview
    Given a submitted marine licence and a signed in caseworker
    When the caseworker opens the application for redaction
    And the caseworker redacts "Application name"
    Then "Application name" shows the redaction marker in white on black
    And only the change and remove options are offered for "Application name"
    And the applicant still sees their own text for "Application name"
    And the preview shows the application name only as the redaction marker in white on black

  @real-defra-id @issue=ML-1507 @issue=ML-1513
  Scenario: Replacing a document uploads a new version and keeps the original
    Given a submitted marine licence and a signed in caseworker
    When the caseworker opens the application for redaction
    And the caseworker replaces the construction drawing with "replacement-drawing.pdf"
    Then the construction drawing is shown as "replacement-drawing.pdf"
    And the preview shows the construction drawing as "replacement-drawing.pdf" with nothing to mark it as replaced
    And the rest of the preview reads as the applicant's View details, with no links to other pages in the service
    And removing the redaction restores the original construction drawing

  @real-defra-id @issue=ML-1507 @issue=ML-1513
  Scenario: The redaction and preview pages are only reachable after signing in with EntraID
    Given a submitted marine licence and a signed in caseworker
    When someone who has not signed in opens the redaction page and the redaction preview page
    Then both pages send them to the Microsoft sign in page

  @real-defra-id @issue=ML-1513
  Scenario: A withheld location of a site uploaded from a file, and a withheld document, are shown as redacted in the preview
    Given a submitted marine licence and a signed in caseworker
    When the caseworker opens the application for redaction
    And the caseworker withholds the location of site 1
    And the caseworker withholds the Water Framework Directive assessment
    And the caseworker selects the preview with redactions
    Then the site 1 location is shown as redacted in the preview
    And the Water Framework Directive assessment is shown as redacted in the preview
