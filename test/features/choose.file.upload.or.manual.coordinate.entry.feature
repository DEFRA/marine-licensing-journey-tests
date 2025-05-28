@issue=ML-16
Feature: Choose File Upload or Manual Coordinate Entry
  As an applicant
  I want to choose whether to upload a file with my coordinates or enter them manually
  So that I can provide my project location details in the most convenient way

  @wip
  Scenario: Selecting to upload a coordinate file
    Given the Site details task is selected
    When selecting to upload a coordinate file
    Then the file upload interface is displayed

  Scenario: Selecting to enter coordinates manually
    Given the Site details task is selected
    When selecting to enter coordinates manually
    Then the manual coordinate entry interface is displayed

  @wip
  Scenario: Validate mandatory selection for coordinate entry method
    Given the Site details task is selected
    When continuing without selecting a coordinate entry method
    Then the error "Select how you want to provide your coordinates" is displayed

  @wip
  Scenario: Changing from file upload to manual entry
    Given the file upload option has been selected
    When changing to manual coordinate entry
    Then the manual coordinate entry interface is displayed
    And any previously uploaded file information is cleared

  @wip
  Scenario: Changing from manual entry to file upload
    Given the manual coordinate entry option has been selected
    When changing to file upload
    Then the file upload interface is displayed
    And any previously entered coordinates are cleared

  @wip
  Scenario: Pre-populated selection when returning to the page
    Given coordinates have been previously provided by file upload
    When returning to the "Enter coordinates" page
    Then the file upload option is pre-selected
    And the previously uploaded file information is displayed

  @wip
  Scenario: Pre-populated selection when returning to the page after manual entry
    Given coordinates have been previously entered manually
    When returning to the "Enter coordinates" page
    Then the manual entry option is pre-selected
    And the previously entered coordinates are displayed
