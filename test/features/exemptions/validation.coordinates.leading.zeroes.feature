@issue=ML-891
Feature: Support Easting and Northing values with leading zeroes
  AS an applicant
  I WANT to be able to enter easting and northing coordinates with leading zeroes
  SO THAT I can provide accurate grid references for sites located in the western parts of the UK

  Note: This feature file will be replaced as part of a test pack improvement that will introduce
  randomness to coordinates provided in all journey tests.

  Scenario Outline: Accepting coordinates with leading zeroes for <description>
    Given a user has started a notification with eastings "<eastings>" and northings "<northings>"
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details

    Examples:
      | description                          | eastings | northings |
      | minimum easting with leading zeroes  |   000001 |    500000 |
      | minimum northing with leading zeroes |   400000 |    000001 |
      | both minimum values                  |   000001 |    000001 |
      | easting with leading zero            |   000004 |    500000 |
      | northing 6 digits with leading zero  |   400000 |    000004 |
      | northing 7 digits with leading zero  |   402265 |   0870840 |
      | easting with multiple leading zeroes |   000700 |    500000 |
      | zero easting                         |        0 |    500000 |
      | zero northing                        |   400000 |         0 |
