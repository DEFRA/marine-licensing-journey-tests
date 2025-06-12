@issue=ML-10
Feature: Validation of activity dates: the user is prevented from proceeding with invalid date values
  As an applicant
  I want to be notified when I have provided invalid activity dates
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no start date is entered
    Given a notification has been created with a valid project name
    When the Activity dates task is selected and saved without entering a start date
    Then the start date error "Enter the start date" is displayed

  Scenario: Error when no end date is entered
    Given a notification has been created with a valid project name
    When the Activity dates task is selected and saved without entering an end date
    Then the end date error "Enter the end date" is displayed

  Scenario: Error when no dates are entered
    Given a notification has been created with a valid project name
    When the Activity dates task is selected and saved without entering any dates
    Then the start date error "Enter the start date" is displayed
    And the end date error "Enter the end date" is displayed

  Scenario Outline: Error when invalid start date <startDate> is entered
    Given a notification has been created with a valid project name
    When entering start date "<day>", "<month>", "<year>" and saving
    Then the start date error "<expected_error>" is displayed

    Examples:
      | day | month | year | startDate   | expected_error                                      |
      | 15  |       | 2025 | partial     | Start date must include a day, month and year      |
      |     | 06    | 2025 | partial     | Start date must include a day, month and year      |
      | 15  | 06    |      | partial     | Start date must include a day, month and year      |
      | 31  | 02    | 2025 | impossible  | Start date must be a real date                     |
      | 29  | 02    | 2025 | impossible  | Start date must be a real date                     |
      | 32  | 01    | 2025 | impossible  | Start date must be a real date                     |
      | 15  | 13    | 2025 | impossible  | Start date must be a real date                     |
      | 01  | 01    | 2024 | past        | Start date must be today or in the future          |
      | 15  | 06    | 2023 | past        | Start date must be today or in the future          |

  Scenario Outline: Error when invalid end date <endDate> is entered
    Given a notification has been created with a valid project name
    When entering end date "<day>", "<month>", "<year>" and saving
    Then the end date error "<expected_error>" is displayed

    Examples:
      | day | month | year | endDate     | expected_error                                      |
      | 20  |       | 2025 | partial     | End date must include a day, month and year        |
      |     | 08    | 2025 | partial     | End date must include a day, month and year        |
      | 20  | 08    |      | partial     | End date must include a day, month and year        |
      | 31  | 04    | 2025 | impossible  | End date must be a real date                       |
      | 30  | 02    | 2025 | impossible  | End date must be a real date                       |
      | 32  | 12    | 2025 | impossible  | End date must be a real date                       |
      | 01  | 14    | 2025 | impossible  | End date must be a real date                       |
      | 01  | 01    | 2024 | past        | End date must be today or in the future            |
      | 20  | 08    | 2023 | past        | End date must be today or in the future            |

  Scenario Outline: Error when end date is before start date
    Given a notification has been created with a valid project name
    When entering start date "<startDay>", "<startMonth>", "<startYear>"
    And entering end date "<endDay>", "<endMonth>", "<endYear>"
    And saving the activity dates
    Then the date order error "End date must be the same as or after the start date" is displayed

    Examples:
      | startDay | startMonth | startYear | endDay | endMonth | endYear |
      | 15       | 06         | 2025      | 14     | 06       | 2025    |
      | 20       | 08         | 2025      | 19     | 08       | 2025    |
      | 01       | 12         | 2025      | 30     | 11       | 2025    |
      | 15       | 06         | 2026      | 15     | 06       | 2025    |
      | 01       | 01         | 2026      | 31     | 12       | 2025    | 