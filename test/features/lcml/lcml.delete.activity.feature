@lcml @issue=ML-1235
Feature: LCML: Delete an activity from a site
  As an applicant
  I want to delete activities I have added to a site
  So that I can remove activities I no longer need to include

  Scenario: The first activity card has no Delete activity link, additional cards do
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user clicks the "Add another activity for site 1" button
    Then the "Site 1 - Activity 1" activity card does not have a "Delete activity" link
    And the "Site 1 - Activity 2" activity card has a "Delete activity" link

  Scenario: Clicking Delete activity opens the confirmation page with the activity reference
    Given an organisation user has uploaded a valid "KML" file and added another activity for site 1
    When the user clicks "Delete activity" on the "Site 1 - Activity 2" card
    Then the delete activity confirmation page is displayed
    And the confirmation page shows the activity reference "Site 1 - Activity 2"

  Scenario: Confirming deletion removes the activity and re-numbers the remaining activities
    Given an organisation user has uploaded a valid "KML" file and added 2 more activities for site 1
    When the user clicks "Delete activity" on the "Site 1 - Activity 2" card
    And the user confirms deletion of the activity
    Then the review site details page is displayed
    And the "Site 1 - Activity 1" activity card is visible
    And the "Site 1 - Activity 2" activity card is visible
    And the "Site 1 - Activity 3" activity card is not displayed

  Scenario Outline: Choosing <action> on the delete activity confirmation page returns to the review without deleting
    Given an organisation user has uploaded a valid "KML" file and added another activity for site 1
    When the user clicks "Delete activity" on the "Site 1 - Activity 2" card
    And the user clicks "<action>" on the delete activity confirmation page
    Then the review site details page is displayed
    And the "Site 1 - Activity 1" activity card is visible
    And the "Site 1 - Activity 2" activity card is visible

    Examples:
      | action |
      | Cancel |
      | Back   |
