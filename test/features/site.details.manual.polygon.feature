@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-19
Feature: Site details: The user marks the boundary of a triangular site manually using WGS84 or OSGB36 coordinates
  These scenarios test the user journey for manually entering triangular site coordinates, covering:
  
  - ML-16: Choosing to manually enter the site details
  - ML-17: Selecting polygon site entry method (multiple coordinate points for boundary)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-19: Entering multiple sets of coordinates to mark the boundary of a triangular site

  Scenario Outline: Successfully entering triangular site coordinates using WGS84 coordinates with <lat1>, <lng1>, <lat2>, <lng2>, <lat3>, <lng3>
    Given an exemption for a triangular site using WGS84 coordinates with point 1 "<lat1>", "<lng1>", point 2 "<lat2>", "<lng2>" and point 3 "<lat3>", "<lng3>"
    And the site details task is reached
    When the triangular site coordinates are entered
    Then the coordinates entry page remains displayed

    Examples: WGS84 coordinate testing: boundary values and realistic marine scenarios
      | lat1      | lng1      | lat2      | lng2      | lat3      | lng3      |
      | 50.000000 | -1.000000 | 50.001000 | -0.999000 | 50.000500 | -0.999500 |
      | 51.507222 | -0.127500 | 51.508000 | -0.126500 | 51.507500 | -0.127000 |
      | 55.123456 |  1.234567 | 55.124000 |  1.235000 | 55.123700 |  1.234800 |
      | 49.500000 | -6.000000 | 49.501000 | -5.999000 | 49.500500 | -5.999500 |

  Scenario Outline: Successfully entering triangular site coordinates using OSGB36 coordinates with <east1>, <north1>, <east2>, <north2>, <east3>, <north3>
    Given an exemption for a triangular site using OSGB36 coordinates with point 1 "<east1>", "<north1>", point 2 "<east2>", "<north2>" and point 3 "<east3>", "<north3>"
    And the site details task is reached
    When the triangular site coordinates are entered
    Then the coordinates entry page remains displayed

    Examples: OSGB36 coordinate testing: UK Grid coverage and decimal precision
      | east1  | north1 | east2  | north2 | east3  | north3 |
      | 432675 | 181310 | 433000 | 181500 | 432800 | 181700 |
      | 529090 | 181680 | 529300 | 181900 | 529200 | 182000 |
      | 326398 | 673781 | 326600 | 674000 | 326500 | 673900 |
      | 456123 | 234567 | 456400 | 234800 | 456300 | 234700 |
