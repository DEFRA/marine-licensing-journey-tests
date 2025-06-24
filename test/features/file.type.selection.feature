@issue=ML-69
Feature: File type selection: The user can choose which type of file to upload for site location
  As an applicant
  I want to choose which file type to upload
  So that I can pick the correct type based on the file I have

  @smoke
  Scenario: Successfully select Shapefile for upload
    Given the user wants to apply for an exemption using a Shapefile
    And the Which type of file do you want to upload? page is displayed
    When selecting Shapefile as the file type
    Then the Shapefile option is selected

  @smoke
  Scenario: Successfully select KML for upload
    Given the user wants to apply for an exemption using a KML file
    And the Which type of file do you want to upload? page is displayed
    When selecting KML as the file type
    Then the KML option is selected

  Scenario: Prevent proceeding without selecting a file type
    Given the Which type of file do you want to upload? page is displayed
    When the Continue button is clicked without selecting a file type
    Then the file type error "Select which type of file you want to upload" is displayed
