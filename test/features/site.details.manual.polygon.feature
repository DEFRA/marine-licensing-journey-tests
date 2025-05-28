@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Site details: The user marks the boundary of a site manually using WGS84 or OSGB36 coordinates

  Scenario: Marking out the boundary of a site using WGS84 (World Geodetic System 1984) coordinates
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Which coordinate system do you want to use page is displayed

  Scenario: Marking out the boundary of a site using OSGB36 (National Grid) coordinates
    Given the user wants to apply for an exemption for a polygonal site using OSGB36 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the Which coordinate system do you want to use page is displayed
