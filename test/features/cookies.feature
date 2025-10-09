@issue=ML-278
Feature: Cookies policy page allows users to manage cookie preferences
  AS an applicant
  I WANT to see a cookies page
  SO THAT I can reassure myself of the data that is being stored about me
  AND I can be sure that DEFRA are meeting their statutory cookie management requirements

  Scenario: Accessing the cookies page from the footer
    Given the project name page is displayed
    When the cookies link is clicked in the footer
    Then the cookies policy page is displayed

  Scenario: Analytics cookies are not accepted by default
    Given a user has not made a decision about cookies
    When the cookies link is clicked in the footer
    Then the "No" radio button is selected for analytics cookies

  Scenario: Analytics cookies accepted from the cookie banner
    Given the project name page is displayed with the cookie banner visible
    When the analytics cookies are accepted from the cookie banner
    Then the analytics cookies are enabled

  Scenario: Analytics cookies rejected from the cookie banner
    Given the project name page is displayed with the cookie banner visible
    When the analytics cookies are rejected from the cookie banner
    Then the analytics cookies are disabled

  @smoke
  Scenario: Accepting analytics cookies
    Given a user is on the cookies policy page
    When selecting Yes for analytics cookies and saving preferences
    Then the cookie preferences confirmation banner is displayed
    And the analytics cookies are enabled

  @smoke
  Scenario: Rejecting analytics cookies
    Given a user is on the cookies policy page
    When selecting No for analytics cookies and saving preferences
    Then the cookie preferences confirmation banner is displayed
    And the analytics cookies are disabled

  Scenario: Previously accepted analytics cookies are pre-selected
    Given analytics cookies have been previously accepted
    When returning to the cookies policy page
    Then the "Yes" radio button is selected for analytics cookies

  Scenario: Previously rejected analytics cookies are pre-selected
    Given analytics cookies have been previously rejected
    When returning to the cookies policy page
    Then the "No" radio button is selected for analytics cookies

  Scenario: Changing cookie preferences from rejected to accepted
    Given analytics cookies have been previously rejected
    When returning to the cookies policy page
    And selecting Yes for analytics cookies and saving preferences
    Then the analytics cookies are enabled

  Scenario: Changing cookie preferences from accepted to rejected
    Given analytics cookies have been previously accepted
    When returning to the cookies policy page
    And selecting No for analytics cookies and saving preferences
    Then the analytics cookies are disabled
