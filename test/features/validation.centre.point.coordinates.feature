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

  Scenario: Error when no OSGB36 coordinates are entered
    Given a user is providing site details
    And the enter OSGB36 coordinates at the centre point of the site page is displayed
    When the Continue button is clicked with providing any coordinates
    Then the eastings error "Enter the eastings" is displayed
    And the northings error "Enter the northings" is displayed

  Scenario Outline: Error when invalid WGS84 latitude <latitude> is entered
    Given the user wants to apply for an exemption for a circular site using "<latitude>" latitude
    And reaches the site details task
    When the site details task is completed
    Then the latitude error "<expected_error>" is displayed

    Examples:
      | latitude   | expected_error                                         |
      | abc        | Latitude must be a number                              |
      |        -91 | Latitude must be between -90 and 90                    |
      |         91 | Latitude must be between -90 and 90                    |
      |   55.01988 | Latitude must include 6 decimal places, like 55.019889 |
      | 55.0198899 | Latitude must include 6 decimal places, like 55.019889 |

  Scenario Outline: Error when invalid WGS84 longitude <longitude> is entered
    Given the user wants to apply for an exemption for a circular site using "<longitude>" longitude
    And reaches the site details task
    When the site details task is completed
    Then the longitude error "<expected_error>" is displayed

    Examples:
      | longitude  | expected_error                                          |
      | xyz        | Longitude must be a number                              |
      |       -181 | Longitude must be between -180 and 180                  |
      |        181 | Longitude must be between -180 and 180                  |
      |   -1.39950 | Longitude must include 6 decimal places, like -1.399500 |
      | -1.3995000 | Longitude must include 6 decimal places, like -1.399500 |

  Scenario Outline: Error when invalid OSGB36 eastings <eastings> is entered
    Given the user wants to apply for an exemption for a circular site using "<eastings>" eastings
    And reaches the site details task
    When the site details task is completed
    Then the eastings error "<expected_error>" is displayed

    Examples:
      | eastings | expected_error                                          |
      | abc      | Eastings must be a number                               |
      |  -123456 | Eastings must be a positive 6-digit number, like 123456 |
      |    12345 | Eastings must be 6 digits                               |
      |  1234567 | Eastings must be 6 digits                               |

  Scenario Outline: Error when invalid OSGB36 northings <northings> is entered
    Given the user wants to apply for an exemption for a circular site using "<northings>" northings
    And reaches the site details task
    When the site details task is completed
    Then the northings error "<expected_error>" is displayed

    Examples:
      | northings | expected_error                                                |
      | xyz       | Northings must be a number                                    |
      |   -654321 | Northings must be a positive 6 or 7-digit number, like 123456 |
      |     12345 | Northings must be 6 or 7 digits                               |
      |  12345678 | Northings must be 6 or 7 digits                               |
