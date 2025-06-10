@issue=ML-36
Feature: Validation of circular site width: user prevented from proceeding with invalid width values
  As an applicant
  I want to be notified when I have provided an invalid width value
  So that I can correct errors before submitting my marine licence application

  @wip
  Scenario: Error when no width is entered
    Given a user is providing site details for a circular site
    And the enter width of circular site page is displayed
    When the Continue button is clicked without providing any width
    Then the width error "Enter the width of the circular site in metres" is displayed

  @wip
  Scenario Outline: Error when invalid width "<width>" is entered
    Given a user is providing site details for a circular site
    And the enter width of circular site page is displayed
    When the width "<width>" is entered and Continue is clicked
    Then the width error "<expected_error>" is displayed

    Examples:
      | width | expected_error                                                 |
      | abc   | The width of the circular site must be a number                |
      |    -5 | The width of the circular site must be 1 metre or more         |
      |     0 | The width of the circular site must be 1 metre or more         |
      |  10.5 | The width of the circular site must be a whole number, like 10 |
      |  3.14 | The width of the circular site must be a whole number, like 10 |
