@lcml
Feature: LCML: Maximum duration of the activity for an activity on a site
  As an applicant
  I want to provide a maximum duration for each activity at each site
  So that the MMO knows how long each activity will last

  Scenario: Display the maximum duration of the activity page
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user selects the "Maximum duration of activity" task for "Site 1 - Activity 1"
    Then the maximum duration of the activity page is displayed
    And the duration page caption shows the project name and "Site 1 - Activity 1"
    And the years and months textboxes are empty

  Scenario: Save valid years and months returns to review with formatted value
    Given the user is on the duration page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user enters "3" years and "6" months and saves
    Then the user is returned to the review site details page
    And the "Maximum duration of activity" row for "Site 1 - Activity 1" shows "3 years, 6 months"
    And the action for the "Maximum duration of activity" row for "Site 1 - Activity 1" is "Change"

  Scenario: Save with zero months only displays the years value
    Given the user is on the duration page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user enters "5" years and "0" months and saves
    Then the "Maximum duration of activity" row for "Site 1 - Activity 1" shows "5 years"

  Scenario: Save with zero years only displays the months value
    Given the user is on the duration page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user enters "0" years and "9" months and saves
    Then the "Maximum duration of activity" row for "Site 1 - Activity 1" shows "9 months"

  Scenario: Change a previously saved maximum duration
    Given an organisation user has saved "2" years and "8" months as the duration for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects the "Change" link for the "Maximum duration of activity" row for "Site 1 - Activity 1"
    Then the maximum duration of the activity page is displayed
    And the years textbox contains "2" and the months textbox contains "8"
