@issue=ML-69
Feature: File type selection: The user can choose which type of file to upload for site location
  As an applicant
  I want to choose which file type to upload
  So that I can pick the correct type based on the file I have

  Scenario: Prevent proceeding without selecting a file type
    Given the Which type of file do you want to upload? page is displayed
    When the Continue button is clicked without selecting a file type
    Then the file type error "Select which type of file you want to upload" is displayed
