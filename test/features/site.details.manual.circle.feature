@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35
Feature: Site details: The user enters the details of a circular site manually using WGS84 or OSGB36 coordinates

  Scenario: Successfully completing circular site details using WGS84 coordinates
    Given the user wants to apply for an exemption for a circular site using WGS84 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Enter the coordinates at the centre point of the site page is displayed

  Scenario: Successfully completing circular site details using OSGB36 coordinates
    Given the user wants to apply for an exemption for a circular site using OSGB36 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Enter the coordinates at the centre point of the site page is displayed
