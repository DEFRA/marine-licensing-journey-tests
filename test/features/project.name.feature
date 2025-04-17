@issue=536842
Feature: The project name page allows the user to define a freetext name for their project
which is meaningful to them. This is the beginning of the process to create the exemption
notification, with the IAT aspect of the journey having been conducted in the Fivium space.

  Scenario: User supplies a valid project name and successfully saves their notification
    Given the project name page is displayed
    When entering and saving the project name
    Then a new notification record is created
    And the project name page remains displayed