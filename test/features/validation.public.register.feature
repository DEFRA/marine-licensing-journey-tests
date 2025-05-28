@issue=ML-12
Feature: Validation of Public register: the user is prevented from saving with invalid data

  Scenario: Validate mandatory reason text when selecting Yes
    Given the Public register page is displayed
    When the Save and continue button is selected after choosing Yes without providing a reason
    Then the reason error message "Details of why the information should be withheld cannot be blank" is displayed

  Scenario: Validate mandatory radio button selection
    Given the Public register page is displayed
    When the Save and continue button is clicked without choosing a radio option
    Then the consent error message "Select whether you believe your information should be withheld from the public register" is displayed

  Scenario: Validate maximum length of reason text (1000 characters)
    Given the Public register page is displayed
    When the reason text provided is too long
    Then the reason error message "Details of why the information should be witheld must be 1000 characters or less" is displayed
