@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35 @issue=ML-36 @issue=ML-37
Feature: Site details: The user enters the details of a circular site manually using WGS84 or OSGB36 coordinates
  These scenarios test the user journey for manually entering circular site coordinates, covering:
  
  - ML-16: Choosing to manually enter the site details
  - ML-17: Selecting circular site entry method (single coordinate point + width)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-35: Entering a single set of coordinates representing the centre point of the site
  - ML-36: Entering the width of the circular site in metres
  - ML-37: Reviewing the circular site details before saving

  Scenario Outline: Successfully completing circular site details using WGS84 coordinates with latitude "<latitude>", longitude "<longitude>" and width "<width>" metres
    Given an exemption for a circular site using WGS84 coordinates with latitude "<latitude>", longitude "<longitude>" and width "<width>" metres
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

    Examples: WGS84 coordinate testing: boundary values, precision requirements, and realistic marine scenarios
      | latitude  | longitude | width |
      | 89.999999 | -3.000000 |     1 |
      | 49.000000 | -6.000000 |     5 |
      | 52.500000 |  1.999999 |    10 |
      | 55.000000 | -8.999999 |    50 |
      | 51.507222 | -0.127500 |   100 |
      | 58.123456 |  1.234567 |   500 |
      | 50.500000 | -2.500000 |  1000 |
      | 53.000000 |  0.000000 |  5000 |

  Scenario Outline: Successfully completing circular site details using OSGB36 coordinates with eastings "<eastings>", northings "<northings>" and width "<width>" metres
    Given an exemption for a circular site using OSGB36 coordinates with eastings "<eastings>", northings "<northings>" and width "<width>" metres
    And the site details task is reached
    When the site details task is completed
    Then the site details review page shows the site details
    And the "Site details" task status is "Completed"

    Examples: OSGB36 coordinate testing: 6/7-digit boundaries, decimal precision testing, and UK Grid coverage
      | eastings | northings | width |
      |   100000 |    100000 |     1 |
      |   650000 |   1200000 |     5 |
      |   630000 |    150000 |    10 |
      |   200000 |    900000 |    50 |
      |   529090 |    181680 |   100 |
      |   326398 |    673781 |   500 |
      | 234567.5 |    287654 |  1000 |
      |   456123 | 1034567.5 |  5000 |
