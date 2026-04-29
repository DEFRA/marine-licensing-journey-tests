@lcml
Feature: LCML: Activity flow (Type of activity + What activity)
  As an applicant
  I want to specify the type of activity and what I'm doing for each site
  So that the MMO knows the precise nature of the proposed works

  Scenario: Validation error when Other text exceeds 1000 characters
    Given an organisation user is on the What activity page after a random sub-option
    When the user checks Other and enters text longer than 1000 characters
    Then the user sees the other-too-long error for the selected top-level

  Scenario: Saving valid answers returns to the review page with the activity card populated
    Given an organisation user is on the What activity page after a random sub-option
    When the user selects a random checkbox and saves
    Then the review site details page is displayed
    And the activity details card shows the sub-option's review row title
    And the row contains the selected checkbox label as a bullet
    And that row has a Change link

  Scenario: Other text is displayed with the correct prefix on the activity card
    Given an organisation user is on the What activity page after a random sub-option
    When the user checks Other, enters valid text and saves
    Then the activity details card row contains the Other prefix and the entered text

  Scenario: Changing Type of activity to the same sub-option preserves What activity answers
    Given an organisation user has saved a random sub-option with a checkbox and Other text
    When the user changes Type of activity and keeps the same sub-option
    Then the previously selected checkbox and Other text are preserved on the What activity page

  Scenario: Changing Type of activity to a different top-level clears What activity answers
    Given an organisation user has saved a random sub-option with a checkbox and Other text
    When the user changes Type of activity to a different top-level option
    Then all checkboxes are unchecked and the Other textbox is cleared and hidden

  Scenario: Clicking Change on the What activity row defaults previously saved answers
    Given an organisation user has saved a random sub-option with a checkbox and Other text
    When the user clicks Change on the What activity row
    Then the previously selected checkbox and Other text are defaulted on the page
