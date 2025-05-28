@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Site details: The user enters the details of a circular site manually using WGS84 or OSGB36 coordinates

  Scenario: Selecting a circular site using WGS84 (World Geodetic System 1984)
    Given the user wants to apply for an exemption for a circular site using WGS84 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Which coordinate system do you want to use page is displayed

  Scenario: Selecting a circular site using OSGB36 (National Grid)
    Given the user wants to apply for an exemption for a circular site using OSGB36 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Which coordinate system do you want to use page is displayed
