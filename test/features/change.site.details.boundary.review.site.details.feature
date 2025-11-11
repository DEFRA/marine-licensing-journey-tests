@issue=ML-697
Feature: The user can make changes to their boundary site details from the review site details page
AS an applicant
I WANT to be able to change answers from the "Review site details" page for a boundary site
SO THAT I can ensure that my sites are correct

NOTE: This feature file focuses only on boundary site-specific changes.

  Scenario: The user can change from boundary site to circular site
    Given a user has reached the review site details page with a boundary site using WGS84 coordinates
    When the user changes from boundary to circular site
    Then the site is converted to a circular site on the review site details page

  Scenario: The user can change the coordinate system for a boundary site
    Given a user has reached the review site details page with a boundary site using WGS84 coordinates
    When the user changes the coordinate system for the boundary site to OSGB36
    Then the coordinate system is updated on the review site details page for the boundary site

  Scenario: The user can change the boundary coordinates
    Given a user has reached the review site details page with a boundary site using WGS84 coordinates
    When the user changes the boundary coordinates
    Then the boundary coordinates are updated on the review site details page
