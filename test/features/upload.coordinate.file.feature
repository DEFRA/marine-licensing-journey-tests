@issue=ML-70 @issue=ML-69
Feature: Upload coordinate file: The user can upload a KML or Shapefile containing coordinates for their site
  As an applicant
  I want to upload a file of coordinates for my site
  So that I can provide my site details easily and accurately

  @smoke @kml
  Scenario: Successfully upload a valid KML file
    Given an exemption notification with a valid KML file
    When completing the site details task
    Then the file is successfully processed
    And the Upload a KML file page is displayed

  @kml
  Scenario: Spinner page displays during KML upload process
    Given an exemption notification with a valid KML file
    When completing the site details task
    Then the spinner page displays during upload process

  @kml
  Scenario: Uploading a KML file with a virus fails
    Given an exemption notification with a KML file with a virus
    When completing the site details task
    Then the file upload error "The selected file contains a virus" is displayed

  @kml
  Scenario: Uploading without selecting a KML file fails
    Given an exemption notification for KML file upload
    When navigating to the KML upload page and continuing without selecting a file
    Then the file upload error "Select a file to upload" is displayed

  @kml
  Scenario: Uploading wrong file type fails - KML
    Given an exemption notification with wrong file type for KML
    When completing the site details task
    Then the file upload error "The selected file must be a KML file" is displayed

  @kml
  Scenario: Uploading KML file too large fails
    Given an exemption notification with KML file too large
    When completing the site details task
    Then the file upload error "The selected file must be smaller than 50 MB" is displayed

  @kml
  Scenario: Uploading empty KML file fails
    Given an exemption notification with empty KML file
    When completing the site details task
    Then the file upload error "The selected file is empty" is displayed

  @smoke @shapefile
  Scenario: Successfully upload a valid Shapefile
    Given an exemption notification with a valid Shapefile
    When completing the site details task
    Then the file is successfully processed
    And the Upload a Shapefile file page is displayed

  @shapefile
  Scenario: Spinner page displays during Shapefile upload process
    Given an exemption notification with a valid Shapefile
    When completing the site details task
    Then the spinner page displays during upload process

  @shapefile
  Scenario: Uploading a Shapefile with a virus fails
    Given an exemption notification with a Shapefile with a virus
    When completing the site details task
    Then the file upload error "The selected file contains a virus" is displayed

  @shapefile
  Scenario: Uploading without selecting a Shapefile fails
    Given an exemption notification for Shapefile upload
    When navigating to the Shapefile upload page and continuing without selecting a file
    Then the file upload error "Select a file to upload" is displayed

  @shapefile
  Scenario: Uploading wrong file type fails - Shapefile
    Given an exemption notification with wrong file type for Shapefile
    When completing the site details task
    Then the file upload error "The selected file must be a Shapefile" is displayed

  @shapefile
  Scenario: Uploading Shapefile too large fails
    Given an exemption notification with Shapefile too large
    When completing the site details task
    Then the file upload error "The selected file must be smaller than 50 MB" is displayed

  @shapefile
  Scenario: Uploading empty Shapefile fails
    Given an exemption notification with empty Shapefile
    When completing the site details task
    Then the file upload error "The selected file is empty" is displayed
