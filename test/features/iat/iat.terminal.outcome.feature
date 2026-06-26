@iat @iatoutcome @iatterminal
Feature: IAT: Terminal outcome pages
  As an applicant using the IAT
  I want terminal outcome pages to give me a final result
  So that I can read the outcome and continue into the relevant service

  @issue=ML-1167
  Scenario Outline: Terminal outcome page "<route>" renders heading, body and an MCMS handoff button
    Given the user walks the IAT to the outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT terminal outcome page "<route>" is displayed with heading "<heading>"
    And the page has a body content block
    And the page has an MCMS handoff button labelled "<button>"

    Examples:
      | route           | heading                              | button                                  |
      | /fast-track-mla | Self-service marine licensing        | Apply for a self-service marine licence |
      | /mod-permission | MOD permission not sought or granted | Apply for a standard marine licence     |
