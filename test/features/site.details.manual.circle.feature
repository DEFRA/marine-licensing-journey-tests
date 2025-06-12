@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35 @issue=ML-36 @issue=ML-37
Feature: Site details: The user enters the details of a circular site manually using WGS84 or OSGB36 coordinates
  These scenarios test the user journey for manually entering circular site coordinates, covering:
  
  - ML-16: Choosing to manually enter the site details
  - ML-17: Selecting circular site entry method (single coordinate point + width)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-35: Entering a single set of coordinates representing the centre point of the site
  - ML-36: Entering the width of the circular site in metres
  - ML-37: Reviewing the circular site details before saving

  Scenario: Successfully completing circular site details using WGS84 coordinates
    Given the user wants to apply for an exemption for a circular site using WGS84 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

  Scenario: Successfully completing circular site details using OSGB36 coordinates
    Given the user wants to apply for an exemption for a circular site using OSGB36 coordinates
    And reaches the site details task
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"
