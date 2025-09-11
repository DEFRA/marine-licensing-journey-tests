@issue=ML-278
Feature: Cookies policy page allows users to manage cookie preferences
  AS an applicant
  I WANT to see a cookies page
  SO THAT I can reassure myself of the data that is being stored about me
  AND I can be sure that DEFRA are meeting their statutory cookie management requirements

  @smoke
  Scenario: Accessing the cookies page from the footer
    Given the project name page is displayed
    When the cookies link is clicked in the footer
    Then the cookies policy page is displayed

  @smoke
  Scenario: Analytics cookies are not accepted by default
    Given a user has not made a decision about cookies
    When the cookies link is clicked in the footer
    Then the "No" radio button is selected for analytics cookies

  Scenario: Accepting analytics cookies
    Given the cookies policy page is displayed
    When selecting "Yes" for analytics cookies and saving preferences
    Then the cookie preferences confirmation banner is displayed

  Scenario: Rejecting analytics cookies
    Given the cookies policy page is displayed
    When selecting "No" for analytics cookies and saving preferences
    Then the cookie preferences confirmation banner is displayed

  Scenario: Previously accepted analytics cookies are pre-selected
    Given analytics cookies have been previously accepted
    When the cookies policy page is displayed
    Then the "Yes" radio button is selected for analytics cookies

  Scenario: Previously rejected analytics cookies are pre-selected
    Given analytics cookies have been previously rejected
    When the cookies policy page is displayed
    Then the "No" radio button is selected for analytics cookies

  Scenario: Returning to previous page from cookies page
    Given the cookies policy page is displayed from the task list
    When the back link is clicked
    Then the task list page is displayed

  Scenario: Returning to previous page from confirmation banner
    Given the cookie preferences confirmation banner is displayed
    When the "Go back to the previous page" link is clicked
    Then the previous page is displayed
