@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35
Feature: Back and Cancel from Site details: State management when clicking back or cancel

  Scenario: Cancelling out of the site details task when no information has previously been saved
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"

  Scenario: Using the back link from the site location page
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Back link is clicked
    And the "Site details" task status is "Incomplete"

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

  Scenario: Cancelling out of the coordinate entry method page discards changes
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"

  Scenario: Cancelling out of the coordinate system page discards changes
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"

  Scenario: Partially completed site details are not saved when cancelling
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    And the WGS84 coordinate system has been selected
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"

  @wip
  Scenario: Cancelling from coordinate entry page discards all site details
    Given a user is providing site details
    And the "Enter the coordinates at the centre point of the site" page has been reached with WGS84 selected
    And partial coordinates have been entered
      | latitude  | longitude |
      | 55.019889 |           |
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"
    And all site details data is discarded

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

  @wip
  Scenario: Cancelling from coordinate entry after entering valid coordinates discards data
    Given a user is providing site details
    And the "Enter the coordinates at the centre point of the site" page has been reached with WGS84 selected
    And valid coordinates have been entered
      | latitude  | longitude |
      | 55.019889 | -1.399500 |
    When the Cancel button is clicked
    And the "Site details" task status is "Incomplete"
    And the entered coordinate data is discarded
