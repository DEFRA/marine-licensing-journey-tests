@issue=ML-12
Feature: Public register: The user can consent or withhold from sharing information on the public register
  As an applicant
  I want to state whether I consent for my marine project to be shared on the public register
  So that my notification will only be shared if I consent

  @smoke
  Scenario: Allowing information to be added to the public register
    Given the Public register page is displayed
    When choosing not to withhold information from the public register
    Then the "Public register" task status is "Completed"
    And the public register information is saved

  @smoke
  Scenario: Withholding information from the public register
    Given the Public register page is displayed
    When choosing to withhold information from the public register
    Then the "Public register" task status is "Completed"
    And the public register information is saved

  Scenario: Changing previously saved information from consent to withhold
    Given the Public register task has been completed with consent
    When changing the public register information to withhold
    Then the public register information is saved

  Scenario: Changing previously saved information from withhold to consent
    Given the Public register task has been completed to withhold information
    When changing the public register information to consent
    Then the public register information is saved

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
