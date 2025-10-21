@issue=ML-75 @issue=ML-76 @issue=ML-119 @issue=ML-120 @issue=ML-232 @issue=ML-364 @issue=ML-388
Feature: Multi-site: Provide kml files with multiple sites for an exemption notification
  These tests use a mix of circle and polygon sites with OSGB36 and WGS84 coordinate systems.

  @kml @smoke
  Scenario: Complete a multi-site kml file upload with different activity dates and different descriptions
    Given a user is uploading a kml file with multiple sites with different activity dates and different descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  @kml @smoke
  Scenario: Complete a multi-site kml file upload with same activity dates and descriptions
    Given a user is uploading a kml file with multiple sites with same activity dates and descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  @kml
  Scenario: Complete a multi-site kml file upload with different activity dates and same descriptions
    Given a user is uploading a kml file with multiple sites with different activity dates and same descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  @kml
  Scenario: Complete a multi-site kml file upload with same activity dates and different descriptions
    Given a user is uploading a kml file with multiple sites with same activity dates and different descriptions
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"
