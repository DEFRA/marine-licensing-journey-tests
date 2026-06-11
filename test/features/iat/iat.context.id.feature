@iat @iatcontext @issue=ML-1304
Feature: IAT: per-tab context ID tracking
  As a user
  I want my answers tracked accurately when I use the IAT
  So that I do not get incorrect advice, even with the IAT open in multiple tabs

  Scenario: Each browser tab is given its own independent context
    Given the user has started an IAT journey in a browser tab
    And the user answers "In or over the sea" in that tab
    When the user starts another IAT journey in a separate browser tab
    Then the two IAT journeys are given different context IDs
    And the first question in the second tab has no answer pre-selected

  Scenario: The context ID is retained on every page of the journey
    Given a user is on the IAT start page
    When the user starts the IAT and answers these questions:
      | answer                                             |
      | In or over the sea                                 |
      | English waters or Northern Ireland offshore waters |
      | Construction                                       |
    Then the same IAT context ID is kept on every page of the journey

  Scenario: Answers are tracked against the context ID
    Given the user has started the IAT and answered "In or over the sea"
    When the user revisits the first question using the same context ID
    Then the IAT answer "In or over the sea" is still selected
