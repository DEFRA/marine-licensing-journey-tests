# @issue:ML-12
# Feature: Public Register Consent
#   As an applicant
#   I want to state whether I consent for my marine project to be shared on the public register
#   So that my notification will only be shared if I consent

#   @run-only
#   Scenario: Allowing information to be added to the public register
#     Given the Public register page is displayed
#     When choosing not to withhold information from the public register
#     Then the public register information is saved

#   Scenario: Withholding information from the public register
#     Given the Public register page is displayed
#     When choosing to withhold information from the public register
#     Then the public register information is saved

#   Scenario: Project name appears on the Public register page
#     Given a notification has been created with a valid project name
#     When the "Public register" task is selected
#     Then the project name is displayed on the Public register page

#   Scenario: Public register task is not pre-populated if no information has been previously saved
#     Given a notification has been created with a valid project name
#     When the "Public register" task is selected
#     Then no information is pre-populated

#   Scenario: Public register task is pre-populated if information has been previously saved
#     Given the Public register task has been completed
#     When the "Public register" task is selected
#     Then the page is pre-populated with the previously entered information

#   Scenario: Do not need to provide a reason when allowing information to be added to the public register
#     Given the Public register page is displayed
#     When choosing to allow information to be added to the public register by selecting “No”
#     Then the option to provide a reason for withholding information is not available

#   Scenario: Cancelling out of the public register task when no information has previously been saved
#     Given the Public register page is displayed
#     When completing the public register task
#     And selecting the "Cancel" option
#     Then the task list page is displayed
#     And the Public register task status is "Not started"
#     And any changes made on the page during this visit are not saved

#   Scenario: Using the back link from the public register task when no information has previously been saved
#     Given the Public register page is displayed
#     When selecting the “Back” link
#     Then the task list page is displayed
#     And the Public register task status is "Not started"
#     And any changes made on the page during this visit are not saved

#   Scenario: Cancelling out of the public register task when information has previously been saved
#     Given the Public register task has been completed
#     When changing the public register information
#     And selecting the "Cancel" option
#     Then the Public register task status is "Completed"
#     And any changes made are not saved

#   Scenario: Using the back link from the public register task when information has previously been saved
#     Given the Public register task has been completed
#     When changing the public register information
#     And selecting the “Back” link
#     Then the Public register task status is "Completed"
#     And any changes made are not saved

#   Scenario: Validate mandatory radio button selection
#     Given the Public register page is displayed
#     When the “Save and continue” button is selected without choosing a radio option
#     Then the error message "Select whether you believe your information should be withheld" is displayed

#   Scenario: Validate mandatory reason text when selecting “Yes”
#     Given the Public register page is displayed
#     When the “Save and continue” button is selected after choosing “Yes” without providing a reason
#     Then the error message "Provide details of why the information should be withheld" is displayed

#   Scenario: Validate maximum length of reason text
#     Given the Public register page is displayed
#     When the “Save and continue” button is selected with a reason exceeding 1000 characters
#     Then the error message "Reason to withhold should be 1000 characters or less" is displayed
