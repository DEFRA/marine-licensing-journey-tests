@issue=ML-228
Feature: Multi-site: Provide multiple sites for an exemption notification

  @smoke @run-only
  Scenario: Navigate to site name page when multiple sites selected
    Given a user is providing site details for multiple sites
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"
