@issue:ML-12
Feature: Public Register Consent
  As an applicant
  I want to state whether I consent for my marine project to be shared on the public register
  So that my notification will only be shared if I consent

  Scenario: Allowing information to be added to the public register
    Given the Public register page is displayed
    When choosing not to withhold information from the public register
    Then the Public register task status is "Completed"
    And the public register information is saved

  Scenario: Withholding information from the public register
    Given the Public register page is displayed
    When choosing to withhold information from the public register
    Then the Public register task status is "Completed"
    And the public register information is saved

  Scenario: Public register task is not pre-populated if no information has been previously saved
    Given a notification has been created with a valid project name
    When the "Public register" task is selected
    Then no information is pre-populated

  Scenario: Project name appears on the Public register page
    Given a notification has been created with a valid project name
    When the "Public register" task is selected
    Then the project name is displayed on the Public register page

  Scenario: Public register task is pre-populated if information has been previously saved
    Given the Public register task has been completed with consent
    When the "Public register" task is selected
    Then the page is pre-populated with the previously entered information

  Scenario: Do not need to provide a reason when allowing information to be added to the public register
    Given the Public register page is displayed
    When choosing to allow information to be added to the public register
    Then the option to provide a reason for withholding information is not available

  Scenario: Validate mandatory reason text when selecting Yes
    Given the Public register page is displayed
    When the Save and continue button is selected after choosing Yes without providing a reason
    Then the reason error message "Details of why the information should be withheld cannot be blank" is displayed

  Scenario: Validate mandatory radio button selection
    Given the Public register page is displayed
    When the Save and continue button is clicked without choosing a radio option
    Then the consent error message "Select whether you believe your information should be withheld from the public register" is displayed

  Scenario: Validate maximum length of reason text
    Given the Public register page is displayed
    When the Save and continue button is selected with a reason exceeding 1000 characters
    Then the reason error message "Details of why the information should be witheld must be 1000 characters or less" is displayed

  Scenario: Cancelling out of the public register task when no information has previously been saved
    Given the Public register page is displayed
    When completing the public register task but cancelling out
    Then the task list page is displayed
    And the Public register task status is "Incomplete"
    And any changes made on the public register page before cancelling are not saved

  Scenario: Using the back link from the public register task when no information has previously been saved
    Given the Public register page is displayed
    When completing the public register task but selecting to go back
    Then the task list page is displayed
    And the Public register task status is "Incomplete"
    And any changes made on the public register page before going back are not saved

  Scenario: Cancelling out of the public register task when information has previously been saved
    Given the Public register task has been completed with consent
    When changing the public register information to withhold but cancelling out
    Then the Public register task status is "Completed"
    And the previously saved changes are pre-populated

  Scenario: Using the back link from the public register task when information has previously been saved
    Given the Public register task has been completed with consent
    When changing the public register information to withhold but selecting to go back
    Then the Public register task status is "Completed"
    And the previously saved changes are pre-populated
