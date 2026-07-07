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

  @real-defra-id @d365 @issue=ML-1407
  Scenario: A submitted marine licence case is shown in the D365 workbasket
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the internal user finds the submitted case in the Marine licence cases workbasket
    Then the Marine licence cases workbasket displays the following columns
      | Reference       |
      | Project name    |
      | Assigned to     |
      | Status          |
      | Case age (days) |
    And the workbasket row shows the submitted case reference, project name and status "Submitted"

  @real-defra-id @d365 @issue=ML-1407
  Scenario: The D365 Case summary tab displays the submitted marine licence case details
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the internal user opens the submitted case summary in D365
    Then the case summary displays the marine licence case details
