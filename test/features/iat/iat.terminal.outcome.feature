@iat @iatoutcome @iatterminal
Feature: IAT: Terminal outcome pages
  As an applicant using the IAT
  I want terminal outcome pages to give me a final result
  So that I can read the outcome and see a Continue button

  Scenario Outline: Terminal outcome page "<route>" renders heading, body and a Continue button
    Given an anonymous user navigates directly to the IAT outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT terminal outcome page "<route>" is displayed with heading "<heading>"
    And the page has a body content block
    And the page has a placeholder Continue button

    Examples:
      | route                                              | heading                                  |
      | /fast-track-mla                                    | Self-service marine licensing            |
      | /standard-marine-licence-application/construction  | Construction                             |
      | /mod-permission                                    | MOD permission not sought or granted     |
