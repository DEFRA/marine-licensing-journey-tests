@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Back and Cancel from Site details: State management when clicking back or cancel

  Scenario: Cancelling out of the site details task when no information has previously been saved
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Cancel button is clicked
    Then the task list page is displayed
    And the "Site details" task status is "Incomplete"

  Scenario: Using the back link from the site location page
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Back link is clicked
    Then the task list page is displayed
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
    Then the task list page is displayed
    And the "Site details" task status is "Incomplete"

  Scenario: Cancelling out of the coordinate system page discards changes
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    When the Cancel button is clicked
    Then the task list page is displayed
    And the "Site details" task status is "Incomplete"

  Scenario: Partially completed site details are not saved when cancelling
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    And the WGS84 coordinate system has been selected
    When the Cancel button is clicked
    Then the task list page is displayed
    And the "Site details" task status is "Incomplete"
