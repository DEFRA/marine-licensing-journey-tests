@lcml
Feature: LCML: Completion date for an activity on a site
  As an applicant
  I want to indicate whether any part of the activity must be completed by a certain date
  So that the MMO understands timing constraints on the activity

  Scenario: Display the completion date page
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user selects the "Completion date" task for "Site 1 - Activity 1"
    Then the completion date page is displayed
    And the completion date page caption shows the project name and "Site 1 - Activity 1"
    And neither completion date radio is selected and the reason textbox is hidden

  Scenario: Selecting Yes reveals the reason textbox
    Given the user is on the completion date page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects the "Yes" completion date option
    Then the completion date reason textbox is visible

  Scenario: Selecting No after Yes hides the reason textbox
    Given the user is on the completion date page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects the "Yes" completion date option
    And the user selects the "No" completion date option
    Then the completion date reason textbox is hidden

  Scenario: Validation error when reason exceeds 1000 characters
    Given the user is on the completion date page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects "Yes" and enters a reason with 1001 characters and saves
    Then the completion date reason error "Reasons for the completion date must be 1000 characters or less" is displayed

  Scenario: Save Yes with a reason returns to review showing only the reason text
    Given the user is on the completion date page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects "Yes" and enters "We need it ready before winter" as the reason and saves
    Then the user is returned to the review site details page
    And the "Completion date" row for "Site 1 - Activity 1" shows "We need it ready before winter"
    And the action for the "Completion date" row for "Site 1 - Activity 1" is "Change"

  Scenario: Save No returns to review showing the not-needed message
    Given the user is on the completion date page for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects "No" and saves the completion date
    Then the user is returned to the review site details page
    And the "Completion date" row for "Site 1 - Activity 1" shows "Not needed to be completed by a certain date"
    And the action for the "Completion date" row for "Site 1 - Activity 1" is "Change"

  Scenario: Change a previously saved Yes completion date
    Given an organisation user has saved "Yes" with reason "Original reason text" for the completion date for "Site 1 - Activity 1" after uploading a "KML" file
    When the user selects the "Change" link for the "Completion date" row for "Site 1 - Activity 1"
    Then the completion date page is displayed
    And the "Yes" completion date radio is selected
    And the completion date reason textbox contains "Original reason text"
