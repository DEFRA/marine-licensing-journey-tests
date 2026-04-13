@issue=ML-723
Feature: The user can make changes to their circular site details from the review site details page
AS an applicant
I WANT to be able to change answers from the "Review site details" page for a circular site
SO THAT I can ensure that my sites are correct

NOTE: This feature file focuses only on circular site-specific changes.

  Scenario: The user can change from circular site to polygon site
    Given a user has reached the review site details page with a circular site
    When the user changes from circular to polygon site
    Then the site is converted to a polygon site on the review site details page

  Scenario: The user can change the coordinate system for a circular site
    Given a user has reached the review site details page with a circular site
    When the user changes the coordinate system for the circular site
    Then the coordinate system is updated on the review site details page for the circular site

  Scenario: The user can change the centre point coordinates for a circular site
    Given a user has reached the review site details page with a circular site
    When the user changes the centre point coordinates
    Then the centre point coordinates are updated on the review site details page

  Scenario: The user can change the circle width for a circular site
    Given a user has reached the review site details page with a circular site
    When the user changes the circle width
    Then the circle width is updated on the review site details page
