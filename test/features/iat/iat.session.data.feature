@iat @iatsession @issue=ML-1306
Feature: IAT: save journey answers to the IAT session
  As a user
  I want my IAT answers saved accurately against my session
  So that I do not get incorrect advice and the correct context can be carried on

  Scenario: The selected activity type id is saved to the IAT session
    Given the user selects "Construction" on the IAT activity type page
    When the user returns to that IAT page
    Then the saved IAT answer has id "CON"

  Scenario: The selected activity subtype id is saved to the IAT session
    Given the user selects "Build or make something new" on the IAT construction subtype page
    When the user returns to that IAT page
    Then the saved IAT answer has id "new"
