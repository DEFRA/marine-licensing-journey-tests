@issue=ML-69
Feature: File type selection: The user can choose which type of file to upload for site location
  As an applicant
  I want to choose which file type to upload
  So that I can pick the correct type based on the file I have

  @smoke
  Scenario: Successfully select Shapefile for upload
    Given a user has chosen to upload a file for site location
    And the "Which type of file do you want to upload?" page is displayed
    When selecting "Shapefile" as the file type
    Then the file type selection is saved

  @smoke
  Scenario: Successfully select KML for upload
    Given a user has chosen to upload a file for site location
    And the "Which type of file do you want to upload?" page is displayed
    When selecting "KML" as the file type
    Then the file type selection is saved

  Scenario: Display file type selection page with correct elements
    Given a user has chosen to upload a file for site location
    When the "Which type of file do you want to upload?" page is displayed
    Then the page shows the project name as the caption
    And the page shows two file type options: "Shapefile" and "KML"
    And neither radio button is selected by default
    And the help content "Help with file types" is available

  Scenario: Prevent proceeding without selecting a file type
    Given a user has chosen to upload a file for site location
    And the "Which type of file do you want to upload?" page is displayed
    When the Continue button is clicked without selecting a file type
    Then the error message "Select which type of file you want to upload" is displayed 