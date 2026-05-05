@lcml
Feature: LCML: Activity description for an activity on a site
  As an applicant
  I want to provide an activity description for each activity at each site
  So that the MMO knows what is being done at each site

  Scenario: Display the activity description page
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user selects the "Activity description" task for "Site 1 - Activity 1"
    Then the "Activity description" page is displayed
    And the page caption shows the project name and "Site 1 - Activity 1"
    And the activity description textbox is empty

  Scenario: Validation error when activity description exceeds 1000 characters
    Given the user is on the activity description page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user enters an activity description with 1001 characters and saves
    Then the activity description error "Activity description must be 1000 characters or less" is displayed

  Scenario: Save activity description returns to review site details with the entered text
    Given the user is on the activity description page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user enters a random activity description and saves
    Then the user is returned to the review site details page
    And the "Activity description" row for "Site 1 - Activity 1" shows the entered activity description
    And the action for the "Activity description" row for "Site 1 - Activity 1" is "Change"

  Scenario: Change a previously saved activity description
    Given an organisation user has saved a random activity description for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects the "Change" link for the "Activity description" row for "Site 1 - Activity 1"
    Then the "Activity description" page is displayed
    And the activity description textbox contains the previously entered description
