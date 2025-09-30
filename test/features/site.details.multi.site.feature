@issue=ML-114 @issue=ML-228 @issue=ML-419 @issue=ML-420 @issue=ML-421 @issue=ML-361 @issue=ML-608
Feature: Multi-site: Provide multiple sites for an exemption notification

  These tests use a mix of circle and polygon sites with OSGB36 and WGS84 coordinate systems.

  @smoke
  Scenario: Complete mixed site details with separate activity dates and descriptions
    Given a user is providing mixed site details for multiple sites with separate activity dates and descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  Scenario: Complete mixed site details with same activity dates and descriptions
    Given a user is providing mixed site details for multiple sites with same activity dates and descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  Scenario: Complete mixed site details with same activity dates and different descriptions
    Given a user is providing mixed site details for multiple sites with same activity dates and different descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  Scenario: Complete mixed site details with different activity dates and same descriptions
    Given a user is providing mixed site details for multiple sites with different activity dates and same descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"
