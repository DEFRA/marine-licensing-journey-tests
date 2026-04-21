@iat
Feature: IAT: Interactive Assistance Tool journey
  As an applicant
  I want to use the IAT to find out what type of marine licence I need
  So that I can be directed to the appropriate service

  Scenario: IAT start page is displayed with correct content and links
    Given a user navigates to the IAT start page
    When the user views the start page
    Then the heading "Check if you need a marine licence" is displayed
    And the start page contains guidance links that open in a new tab
    And there are no links in the page header
    And a "Start now" button is displayed

  Scenario: Question page is displayed and selecting an answer navigates to the next question
    Given a user is on an IAT question page
    When the user selects an option and clicks Continue
    Then the user is taken to the next question page

  Scenario: Back link navigates to previous question with answer pre-selected
    Given a user has answered an IAT question and is on the next page
    When the user clicks the Back link
    Then the previous question page is displayed with the previously selected answer

  Scenario: Navigating through all questions reaches an outcome page
    Given a user is on the IAT start page
    When the user answers the first option on each question page
    Then an outcome page is reached
