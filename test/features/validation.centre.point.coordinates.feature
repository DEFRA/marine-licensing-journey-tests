@issue=ML-35
Feature: Validation of centre point coordinates: the user is prevented from proceeding with invalid coordinate values
  As an applicant
  I want to be notified when I have provided invalid coordinate values
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no WGS84 coordinates are entered
    Given a user is providing site details
    And the enter WGS84 coordinates at the centre point of the site page is displayed
    When the Continue button is clicked with providing any coordinates
    Then the latitude error "Enter the latitude" is displayed
    And the longitude error "Enter the longitude" is displayed

  @wip
  Scenario: User is prevented from proceeding with invalid WGS84 latitude values
    Given a user is providing centre point coordinates
    And the "Enter the coordinates at the centre point of the site" page has been reached with WGS84 selected
    When the Continue button is clicked with invalid latitude values
      | latitude   | expected_error                                         |
      | abc        | Latitude must be a number                              |
      |        -91 | Latitude must be between -90 and 90                    |
      |         91 | Latitude must be between -90 and 90                    |
      |   55.01988 | Latitude must include 6 decimal places, like 55.019889 |
      | 55.0198899 | Latitude must include 6 decimal places, like 55.019889 |
    Then the latitude error is displayed as expected

  @wip
  Scenario: User is prevented from proceeding with invalid WGS84 longitude values
    Given a user is providing centre point coordinates
    And the "Enter the coordinates at the centre point of the site" page has been reached with WGS84 selected
    When the Continue button is clicked with invalid longitude values
      | longitude  | expected_error                                          |
      | xyz        | Longitude must be a number                              |
      |       -181 | Longitude must be between -180 and 180                  |
      |        181 | Longitude must be between -180 and 180                  |
      |   -1.39950 | Longitude must include 6 decimal places, like -1.399500 |
      | -1.3995000 | Longitude must include 6 decimal places, like -1.399500 |
    Then the longitude error is displayed as expected

  @wip
  Scenario: User is prevented from proceeding with blank OSGB36 coordinates
    Given a user is providing centre point coordinates
    And the "Enter the coordinates at the centre point of the site" page has been reached with OSGB36 selected
    When the Continue button is clicked with blank coordinates
    Then the eastings error "Enter the eastings" is displayed
    And the northings error "Enter the northings" is displayed

  @wip
  Scenario: User is prevented from proceeding with invalid OSGB36 eastings values
    Given a user is providing centre point coordinates
    And the "Enter the coordinates at the centre point of the site" page has been reached with OSGB36 selected
    When the Continue button is clicked with invalid eastings values
      | eastings | expected_error                                          |
      | abc      | Eastings must be a number                               |
      |  -123456 | Eastings must be a positive 6-digit number, like 123456 |
      |    12345 | Eastings must be 6 digits                               |
      |  1234567 | Eastings must be 6 digits                               |
    Then the eastings error is displayed as expected

  @wip
  Scenario: User is prevented from proceeding with invalid OSGB36 northings values
    Given a user is providing centre point coordinates
    And the "Enter the coordinates at the centre point of the site" page has been reached with OSGB36 selected
    When the Continue button is clicked with invalid northings values
      | northings | expected_error                                                |
      | xyz       | Northings must be a number                                    |
      |   -654321 | Northings must be a positive 6 or 7-digit number, like 123456 |
      |     12345 | Northings must be 6 or 7 digits                               |
      |  12345678 | Northings must be 6 or 7 digits                               |
    Then the northings error is displayed as expected
