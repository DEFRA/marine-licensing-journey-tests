@issue=ML-70 @covers=ML-69
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
