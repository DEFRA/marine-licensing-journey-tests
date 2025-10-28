@issue=ML-12
Feature: Validation of Public register: the user is prevented from saving with invalid data

  Scenario: Validate mandatory reason text when selecting No
    Given the Public register page is displayed
    When the Save and continue button is selected after choosing No without providing a reason
    Then the reason error message "Provide details of why you do not consent to your project information being published" is displayed

  Scenario: Validate mandatory radio button selection
    Given the Public register page is displayed
    When the Save and continue button is clicked without choosing a radio option
    Then the consent error message "Select whether you consent to the MMO publishing your project information publicly" is displayed

  Scenario: Validate maximum length of reason text (1000 characters)
    Given the Public register page is displayed
    When the reason text provided is too long
    Then the reason error message "Details of why you do not consent must be 1000 characters or less" is displayed
