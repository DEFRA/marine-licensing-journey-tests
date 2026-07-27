@lcml
Feature: LCML: Check your answers marine plan policies
  As an applicant
  I want to review and change my marine plan policy considerations on the Check your answers page
  So that I can confirm my answers before sending my information

  @issue=ML-1377 @issue=ML-1457
  Scenario: Check your answers shows the marine plan policies and invoicing cards
    Given an organisation user has completed a marine licence ready to review
    When the user opens the check your answers page
    Then the marine plan policies card is displayed beneath the site and activity cards
    And the marine plan policies card has a Change link for each policy
    And the invoicing details card is displayed beneath the Other permissions card
    And the invoicing details card shows the invoicing details entered
    And the invoicing details card has a Change link to the check invoicing details page

  @issue=ML-1377
  Scenario: Changing a marine plan policy from check your answers opens the pre-populated consideration page
    Given an organisation user is on the check your answers page with completed marine plan policies
    When the user selects Change for the first marine plan policy
    Then the policy consideration page is pre-populated with my response and has no Cancel option

  @issue=ML-1377
  Scenario: Saving a changed marine plan policy returns to check your answers
    Given an organisation user is on the check your answers page with completed marine plan policies
    When the user selects Change for the first marine plan policy
    And the user updates the consideration and selects Save and continue
    Then the user is returned to the check your answers page

  @issue=ML-1377
  Scenario: Selecting Back from a marine plan policy consideration returns to check your answers
    Given an organisation user is on the check your answers page with completed marine plan policies
    When the user selects Change for the first marine plan policy
    And the user selects Back on the policy consideration page
    Then the user is returned to the check your answers page

  @issue=ML-1457
  Scenario: The invoicing details Change link opens the check invoicing details page
    Given an organisation user is on the check your answers page with completed marine plan policies
    When the user selects Change on the invoicing details card
    Then the check invoicing details page is displayed

  @issue=ML-1457
  Scenario: Finishing on the check invoicing details page returns to check your answers
    Given an organisation user is on the check your answers page with completed marine plan policies
    When the user selects Change on the invoicing details card
    And the user selects Continue on the check invoicing details page
    Then the user is returned to the check your answers page
