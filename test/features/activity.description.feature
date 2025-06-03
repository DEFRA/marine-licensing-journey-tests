@issue=ML-11
Feature: Activity description: The user can provide a description of their planned activity
  As an applicant
  I want to provide a description of the activity that I will be undertaking
  So that I can ensure that MMO understands the activity that will be covered by the exemption

  Scenario: Save a valid activity description
    Given a notification has been created with a valid project name
    When entering and saving a valid activity description
    Then the "Activity description" task status is "Completed"

  Scenario: Update previously saved activity description
    Given the activity description task has been completed with valid information
    When updating the activity description with "New activity description"
    Then the "Activity description" task status is "Completed"

  @wip
  Scenario: Validate mandatory activity description field
    Given a notification has been created with a valid project name
    When the "activity description" task is selected and saved without entering text
    Then the activity description error "Enter the activity description" is displayed

  @wip
  Scenario: Validate maximum length of activity description
    Given a notification has been created with a valid project name
    When the "activity description" task is selected and text over 4000 characters is entered
    Then the activity description error "Activity description must be 4000 characters or less" is displayed

  @wip
  Scenario: Cancel preserves previously saved data
    Given the activity description task has been completed with valid information
    When changing the activity description but cancelling out
    Then the task list page is displayed
    And the "activity description" task status is "Completed"
