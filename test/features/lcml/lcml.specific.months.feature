@lcml
Feature: LCML: Activity limited to specific months for an activity on a site
  As an applicant
  I want to indicate whether the activity is limited to specific months of the year
  So that the MMO understands the seasonal constraints on the activity

  Scenario: Display the activity limited to specific months page
    Given an organisation user has uploaded a coordinates file and is on the review site details page
    When the user selects the "Activity limited to specific months" task for "Site 1 - Activity 1"
    Then the activity limited to specific months page is displayed
    And the specific months page caption shows the project name and "Site 1 - Activity 1"
    And neither specific months radio is selected and the details textbox is hidden

  Scenario: Selecting Yes reveals the details textbox
    Given the user is on the specific months page for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects the "Yes" specific months option
    Then the specific months details textbox is visible

  Scenario: Selecting No after Yes hides the details textbox
    Given the user is on the specific months page for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects the "Yes" specific months option
    And the user selects the "No" specific months option
    Then the specific months details textbox is hidden

  Scenario: Save Yes with details returns to review showing only the details text
    Given the user is on the specific months page for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects "Yes" and enters "Bad weather only allowed in summer" as specific months details and saves
    Then the user is returned to the review site details page
    And the "Activity limited to specific months" row for "Site 1 - Activity 1" shows "Bad weather only allowed in summer"
    And the action for the "Activity limited to specific months" row for "Site 1 - Activity 1" is "Change"

  Scenario: Save No returns to review showing No
    Given the user is on the specific months page for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects "No" and saves the specific months page
    Then the user is returned to the review site details page
    And the "Activity limited to specific months" row for "Site 1 - Activity 1" shows "No"
    And the action for the "Activity limited to specific months" row for "Site 1 - Activity 1" is "Change"

  Scenario: Change a previously saved Yes specific months
    Given an organisation user has saved "Yes" with specific months details "Original months text" for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects the "Change" link for the "Activity limited to specific months" row for "Site 1 - Activity 1"
    Then the activity limited to specific months page is displayed
    And the "Yes" specific months radio is selected
    And the specific months details textbox contains "Original months text"
