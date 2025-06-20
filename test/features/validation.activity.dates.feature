@issue=ML-10
Feature: Validation of activity dates: the user is prevented from proceeding with invalid date values
  As an applicant
  I want to be notified when I have provided invalid activity dates
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no start date is entered
    Given a notification has been created with a valid project name
    And the activity has no start date
    When completing the activity dates task
    Then the start date error "Enter the start date" is displayed

  Scenario: Error when no end date is entered
    Given a notification has been created with a valid project name
    And the activity has no end date
    When completing the activity dates task
    Then the end date error "Enter the end date" is displayed

  Scenario: Error when no dates are entered
    Given a notification has been created with a valid project name
    And the activity dates are valid
    When clicking save and continue without entering any dates
    Then the start date error "Enter the start date" is displayed
    And the end date error "Enter the end date" is displayed

  Scenario Outline: Error when <condition> using data: <startDay>/<startMonth>/<startYear> and <endDay>/<endMonth>/<endYear>
    Given a notification has been created with a valid project name
    And the activity start date has "<startDay>", "<startMonth>", "<startYear>"
    And the activity end date has "<endDay>", "<endMonth>", "<endYear>"
    When completing the activity dates task
    Then the start date error "<expected_error>" is displayed

    Examples:
      | startDay | startMonth | startYear | endDay | endMonth | endYear | condition                           | expected_error                                |
      |       15 |            |      2027 |     01 |       01 |    2028 | start month is missing              | The start date must include a month           |
      |          |         06 |      2027 |     01 |       01 |    2028 | start day is missing                | The start date must include a day             |
      |       15 |         06 |           |     01 |       01 |    2028 | start year is missing               | The start date must include a year            |
      |       31 |         02 |      2027 |     01 |       01 |    2028 | date is not valid                   | The start date must be a real date            |
      |       32 |         01 |      2027 |     01 |       01 |    2028 | date is not valid                   | The start date must be a real date            |
      |       15 |         13 |      2027 |     01 |       01 |    2028 | date is not valid                   | The start date must be a real date            |
      |       31 |         04 |      2027 |     01 |       01 |    2028 | day is not valid for month          | The start date must be a real date            |
      |       31 |         06 |      2027 |     01 |       01 |    2028 | day is not valid for month          | The start date must be a real date            |
      |       31 |         09 |      2027 |     01 |       01 |    2028 | day is not valid for month          | The start date must be a real date            |
      |       31 |         11 |      2027 |     01 |       01 |    2028 | day is not valid for month          | The start date must be a real date            |
      |       29 |         02 |      2027 |     01 |       01 |    2028 | 29th of February in a non leap year | The start date must be a real date            |
      |       29 |         02 |      2027 |     01 |       01 |    2028 | 29th of February in a non leap year | The start date must be a real date            |
      |       18 |         01 |      2024 |     01 |       01 |    2028 | start date is in the past           | The start date must be today or in the future |

  Scenario Outline: Error when <condition> end date with data: <startDay>/<startMonth>/<startYear> and <endDay>/<endMonth>/<endYear>
    Given a notification has been created with a valid project name
    And the activity start date has "<startDay>", "<startMonth>", "<startYear>"
    And the activity end date has "<endDay>", "<endMonth>", "<endYear>"
    When completing the activity dates task
    Then the end date error "<expected_error>" is displayed

    Examples:
      | startDay | startMonth | startYear | endDay | endMonth | endYear | condition                           | expected_error                              |
      |       01 |         01 |      2027 |     20 |          |    2028 | end month is missing                | The end date must include a month           |
      |       01 |         01 |      2027 |        |       08 |    2028 | end day is missing                  | The end date must include a day             |
      |       01 |         01 |      2027 |     20 |       08 |         | end year is missing                 | The end date must include a year            |
      |       01 |         01 |      2027 |     31 |       04 |    2028 | end date is not valid               | The end date must be a real date            |
      |       01 |         01 |      2027 |     32 |       12 |    2028 | end date is not valid               | The end date must be a real date            |
      |       01 |         01 |      2027 |     01 |       14 |    2028 | end date is not valid               | The end date must be a real date            |
      |       01 |         01 |      2027 |     31 |       04 |    2028 | day is not valid for month          | The end date must be a real date            |
      |       01 |         01 |      2027 |     31 |       09 |    2028 | day is not valid for month          | The end date must be a real date            |
      |       01 |         01 |      2027 |     29 |       02 |    2027 | 29th of February in a non leap year | The end date must be a real date            |
      |       01 |         01 |      2027 |     29 |       02 |    2029 | 29th of February in a non leap year | The end date must be a real date            |
      |       01 |         12 |      2023 |     01 |       01 |    2024 | end date is in the past             | The end date must be today or in the future |

  Scenario Outline: Error when end date is before start date <startDay>/<startMonth>/<startYear> and <endDay>/<endMonth>/<endYear>
    Given a notification has been created with a valid project name
    And the activity start date has "<startDay>", "<startMonth>", "<startYear>"
    And the activity end date has "<endDay>", "<endMonth>", "<endYear>"
    When completing the activity dates task
    Then the date order error "The end date must be the same as or after the start date" is displayed

    Examples:
      | startDay | startMonth | startYear | endDay | endMonth | endYear |
      |       15 |         06 |      2025 |     14 |       06 |    2025 |
      |       20 |         08 |      2025 |     19 |       08 |    2025 |
      |       01 |         12 |      2025 |     30 |       11 |    2025 |
      |       15 |         06 |      2026 |     15 |       06 |    2025 |
