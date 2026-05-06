@lcml
Feature: LCML: Proposed working hours for an activity on a site
  As an applicant
  I want to provide the proposed working hours for each activity at each site
  So that the MMO knows when the activity will take place

  Scenario: Display the proposed working hours page
    Given an organisation user has uploaded a coordinates file and is on the review site details page
    When the user selects the "Proposed working hours" task for "Site 1 - Activity 1"
    Then the proposed working hours page is displayed
    And the working hours page caption shows the project name and "Site 1 - Activity 1"
    And the proposed working hours textbox is empty

  Scenario: Save proposed working hours returns to review site details with the entered text
    Given the user is on the proposed working hours page for "Site 1 - Activity 1" after uploading a coordinates file
    When the user enters random proposed working hours and saves
    Then the user is returned to the review site details page
    And the "Proposed working hours" row for "Site 1 - Activity 1" shows the entered proposed working hours
    And the action for the "Proposed working hours" row for "Site 1 - Activity 1" is "Change"

  Scenario: Change a previously saved proposed working hours
    Given an organisation user has saved random proposed working hours for "Site 1 - Activity 1" after uploading a coordinates file
    When the user selects the "Change" link for the "Proposed working hours" row for "Site 1 - Activity 1"
    Then the proposed working hours page is displayed
    And the proposed working hours textbox contains the previously entered value
