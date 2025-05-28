@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Choose File Upload or Manual Coordinate Entry
  As an applicant
  I want to choose whether to upload a file with my coordinates or enter them manually
  So that I can provide my project location details in the most convenient way

  Scenario: Selecting a circular site using WGS84 (World Geodetic System 1984)
    Given the user wants to apply for an exemption for a circular site using WGS84 coordinates
    When the site details task is completed
    Then the What coordinate system page is displayed

  Scenario: Selecting a circular site using OSGB36 (National Grid)
    Given the user wants to apply for an exemption for a circular site using OSGB36 coordinates
    When the site details task is completed
    Then the What coordinate system page is displayed
