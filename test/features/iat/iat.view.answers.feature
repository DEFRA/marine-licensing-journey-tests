@iat @iatoutcome @iatterminal
Feature: IAT: Licence not required outcomes and viewing answers
  As an applicant using the IAT
  I want clear "licence not required" outcome pages and a record of my answers
  So that I know no marine licence is needed and can keep a copy of what I saw

  @issue=ML-1185
  Scenario Outline: Anonymous user can view the "<route>" licence-not-required outcome page
    Given an anonymous user navigates directly to the IAT outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT licence-not-required outcome page "<route>" is displayed with heading "<heading>"
    And the page has a body content block
    And the page has a "View answers" link that opens in a new tab
    And the page has a Back link

    Examples:
      | route                                              | heading                     |
      | /exemption/licence-not-required                    | Marine licence not required |
      | /exemption/licence-not-required/sea                | Marine licence not required |
      | /exemption/licence-not-required/Activity-elsewhere | Marine licence not required |
      | /licence-not-required-devolved                     | Marine licence not required |

  @issue=ML-1185
  Scenario: Licence-not-required outcome is reached by selecting "Somewhere else" on the first question
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer         |
      | Somewhere else |
    Then the IAT licence-not-required outcome page "/exemption/licence-not-required/sea" is displayed with heading "Marine licence not required"
    And the page has a body content block
    And the page has a "View answers" link that opens in a new tab
    And the Back link points to "/journey/self-service/sea"

  @issue=ML-1165
  Scenario: The View answers link is shown beneath the Continue button and opens in a new tab
    Given an anonymous user navigates directly to the IAT outcome "/fast-track-mla"
    When the user views the IAT outcome page
    Then the page has a "View answers" link that opens in a new tab
    And the "View answers" link is displayed beneath the Continue button

  @issue=ML-1165
  Scenario: The IAT answers page shows the saved answers on a unique, print-friendly page
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer         |
      | Somewhere else |
    And the user opens the IAT answers page
    Then the IAT answers page shows the date of check, summary and answers
    And the IAT answers page lists the question "Where will the activity take place?" with answer "Somewhere else"
    And the IAT answers page has a unique URL that can be reopened directly
    And the IAT answers page omits header navigation, the Back link and non-essential print elements

  @issue=ML-1165
  Scenario: The IAT answers page reflects the latest answers after navigating back and forward
    Given the user starts the IAT
    And the user follows this IAT answer path:
      | answer         |
      | Somewhere else |
    When the user goes back to the first IAT question and follows this answer path:
      | answer         |
      | Somewhere else |
    And the user opens the IAT answers page
    Then the IAT answers page lists the question "Where will the activity take place?" with answer "Somewhere else"
