@issue=ML-70 @issue=ML-69
Feature: Upload coordinate file: The user can upload a KML or Shapefile containing coordinates for their site
  As an applicant
  I want to upload a file of coordinates for my site
  So that I can provide my site details easily and accurately

  @smoke
  Scenario: Successfully upload a valid KML file
    Given an exemption notification with a valid KML file
    When completing the site details task
    Then the file is successfully processed
    And the Upload a KML file page is displayed

  Scenario: Successfully upload a valid Shapefile file
    Given an exemption notification with a valid Shapefile
    When completing the site details task
    Then the file is successfully processed
    And the Upload a Shapefile file page is displayed

  Scenario: Spinner page displays during upload process
    Given an exemption notification with a valid KML file
    When completing the site details task
    Then the spinner page displays during upload process

  Scenario: Uploading a file with a virus fails
    Given an exemption notification with a file with a virus
    When completing the site details task
    Then the file upload error "The selected file contains a virus" is displayed

  Scenario: Uploading without selecting a file fails
    Given an exemption notification for file upload
    When navigating to the file upload page and continuing without selecting a file
    Then the file upload error "Select a file to upload" is displayed
