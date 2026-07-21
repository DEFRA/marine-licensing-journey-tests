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

  @issue=ML-1377
  Scenario: View details shows the marine plan policies summary card
    Given an organisation user has submitted a marine licence application with marine plan policies
    When the user opens View details for the submitted marine licence
    Then the marine plan policies card is displayed beneath the site and activity cards
    And the marine plan policies card lists the policies sorted by code with their wording and my response
    And the marine plan policies card has no Change links

  @issue=ML-1377
  Scenario: Public View details shows the marine plan policies summary card
    Given an organisation user has submitted a marine licence application with marine plan policies
    When the user opens the public View details link for the submitted marine licence
    Then the marine plan policies card is displayed beneath the site and activity cards
    And the marine plan policies card has no Change links

  @real-defra-id @d365 @issue=ML-1407 @issue=ML-1375
  Scenario: A submitted marine licence case is shown in the D365 workbasket and case summary
    Given an organisation user has submitted a marine licence application with a site in a marine plan area
    When the internal user finds the submitted case in the Marine licence cases workbasket
    Then the Marine licence cases workbasket shows the submitted case with the following details
      | Reference       | the submitted reference |
      | Project name    | the project name        |
      | Assigned to     | blank                   |
      | Status          | Submitted               |
      | Case age (days) | a number                |
    And the case summary tab shows the following details
      | Reference        | the submitted reference |
      | Application type | Marine License          |
      | Submitted        | a date                  |
      | Fee band         | 2A                      |
      | Organisation     | Windfarm Co             |
    And the case summary shows the marine plan areas and coastal operations areas as read-only
