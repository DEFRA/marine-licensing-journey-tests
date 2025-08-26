@issue=ML-228 @issue=ML-419
Feature: Multi-site: Provide multiple sites for an exemption notification

  @smoke
  Scenario: Complete site details for multiple sites
    Given a user is providing site details for multiple sites
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"
    