@issue=536842
Feature: The project name page allows the user to define a freetext name for their project
which is meaningful to them. This is the beginning of the process to create the exemption
notification, with the IAT aspect of the journey having been conducted in the Fivium space.

  Scenario: User supplies a valid project name and successfully saves their notification
    Given a user is on the project name page
    When the user provides a project name and clicks save and continue
    Then the new notification record is created
    And the user remains on the project name page