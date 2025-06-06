@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35 @run-only
Feature: Site details: The user enters the details of a circular site manually using WGS84 or OSGB36 coordinates

  These scenarios test the complete user journey for manually entering circular site coordinates, covering:
  
  - ML-16: Choosing between WGS84 (World Geodetic System 1984) and OSGB36 (National Grid) coordinate systems  
  - ML-17: Selecting circular site entry method (single coordinate point + width vs multiple boundary coordinates)
  - ML-18: Entering centre point coordinates with validation for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-35: Entering site width/radius to complete the circular site definition
  
  The tests verify coordinate validation, data persistence, and navigation through the site details workflow
  for marine licensing exemption applications requiring precise location information.

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
