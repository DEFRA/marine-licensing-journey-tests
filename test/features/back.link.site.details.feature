@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35
Feature: Back link navigation in Site details: State preservation during back navigation

  Scenario: Using the back link from the site location page
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Back link is clicked
    And the Back link is clicked
    Then the "Site details" task status is "Incomplete"

  Scenario: Using the back link from the coordinate entry method page preserves selections
    Given a user is providing site details
    And the "How do you want to enter the coordinates?" page has been reached
    When the Back link is clicked
    Then the manual coordinate entry method is selected

  Scenario: Using the back link from the coordinate system page preserves selections
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    When the Back link is clicked
    Then the circular site option is selected

  @wip
  Scenario: Using back link from coordinate entry page preserves coordinate system selection
    Given a user is providing site details
    And the "Enter the coordinates at the centre point of the site" page has been reached with WGS84 selected
    When the Back link is clicked
    Then the "Which coordinate system do you want to use?" page is displayed
    And the WGS84 coordinate system option is pre-selected

  @wip
  Scenario: Using back link from OSGB36 coordinate entry preserves coordinate system selection
    Given a user is providing site details
    And the "Enter the coordinates at the centre point of the site" page has been reached with OSGB36 selected
    When the Back link is clicked
    Then the "Which coordinate system do you want to use?" page is displayed
    And the OSGB36 coordinate system option is pre-selected 