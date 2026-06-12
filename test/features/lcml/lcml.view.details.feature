@lcml @issue=ML-1266
Feature: LCML: View details page shows sites and activities
  As an applicant or internal user
  I want the submitted marine licence "View details" page to show my sites and activities
  So that I can review what was submitted in a read-only summary

  Scenario: View details shows the submitted sites and activities
    Given an organisation user has submitted a marine licence application with a random site type
    When the user opens View details for the submitted marine licence
    Then the View details page shows the site location and site card for that site type
    And the View details page shows an activity details card

  Scenario: Public View details shows the submitted sites
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the user opens the public View details link for the submitted marine licence
    Then the View details page shows the "File upload" site location method
    And the View details page shows an uploaded site card with a name and a map

  @real-defra-id @d365
  Scenario: Internal (D365) View details shows the submitted sites and activities
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the marine licence case is opened from its D365 Application URL
    Then the internal View details page shows the submitted sites and activities
