@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Back and Cancel from Site details: State management when clicking back or cancel

  @wip
  Scenario: Cancelling out of the site details task when no information has previously been saved
    Given the "How do you want to provide the site location?" page is displayed
    When the Cancel button is clicked
    Then the task list is displayed with "Site details" status as "Incomplete" and no changes saved

  @wip
  Scenario: Using the back link from the site location page
    Given the "How do you want to provide the site location?" page is displayed
    When the Back link is clicked
    Then the task list is displayed with "Site details" status as "Incomplete" and no changes saved

  @wip
  Scenario: Using the back link from the coordinate entry method page preserves selections
    Given the "How do you want to enter the coordinates?" page is displayed with "Enter the coordinates of the site manually" previously selected
    When the Back link is clicked
    Then the "How do you want to provide the site location?" page is displayed with previous selection preserved

  @wip
  Scenario: Using the back link from the coordinate system page preserves selections
    Given the "Which coordinate system do you want to use?" page is displayed with "Enter multiple sets of coordinates to mark the boundary of the site" previously selected
    When the Back link is clicked
    Then the "How do you want to enter the coordinates?" page is displayed with previous selection preserved

  @wip
  Scenario: Cancelling out of the coordinate entry method page discards changes
    Given the "How do you want to enter the coordinates?" page is displayed with a selection made
    When the Cancel button is clicked
    Then the task list is displayed with "Site details" status as "Incomplete" and no changes saved

  @wip
  Scenario: Cancelling out of the coordinate system page discards changes
    Given the "Which coordinate system do you want to use?" page is displayed with a selection made
    When the Cancel button is clicked
    Then the task list is displayed with "Site details" status as "Incomplete" and no changes saved

  @wip
  Scenario: Partially completed site details are not saved when cancelling
    Given the user has navigated through multiple site details pages with selections made
    When the Cancel button is clicked
    Then the task list is displayed with "Site details" status as "Incomplete" and all selections discarded
