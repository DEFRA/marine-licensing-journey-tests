Feature: LCML: Application status updates from Dynamics 365
  As an applicant
  I want my application to reflect the case management actions taken in Dynamics 365
  So that I always see its current status and what to do next

  @lcml @issue=ML-1456
  Scenario: A completed transfer shows the transferred status, page and links
    Given an organisation user has submitted a marine licence application
    When a transfer completed message is sent for the application
    Then the application status is "Transferred" on the dashboard
    And opening View details shows the "Your application has been transferred" page with the project name and reference
    And the transferred page links to MCMS and to the submitted application details
    And the submitted application details show the "Transferred" status and a date of transfer

  @real-defra-id @issue=ML-1456
  Scenario: A transfer completed via the API gateway shows the transferred status and page
    Given an organisation user has submitted a marine licence application with a site in a marine plan area
    When a transfer completed message is sent for the application
    Then the application status is "Transferred" on the dashboard
    And opening View details shows the "Your application has been transferred" page with the project name and reference
    And the transferred page links to MCMS and to the submitted application details
    And the submitted application details show the "Transferred" status and a date of transfer

  @lcml @issue=ML-1479
  Scenario: A rejected application shows the unable-to-progress status, page, reasons and links
    Given an organisation user has submitted a marine licence application
    When a rejected message is sent for the application
    Then the application status is "Unable to progress" on the dashboard
    And opening View details shows the "We are unable to progress your application" page with the project name and reference
    And the rejected page shows the reasons, free text and links, and the "Unable to progress" application details

  @real-defra-id @issue=ML-1479
  Scenario: A rejected application via the API gateway shows the unable-to-progress status, page and links
    Given an organisation user has submitted a marine licence application with a site in a marine plan area
    When a rejected message is sent for the application
    Then the application status is "Unable to progress" on the dashboard
    And opening View details shows the "We are unable to progress your application" page with the project name and reference
    And the rejected page shows the reasons, free text and links, and the "Unable to progress" application details
