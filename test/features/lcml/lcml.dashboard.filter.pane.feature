@issue=ML-1488
Feature: LCML: Dashboard filter pane
  As an organisation user
  I want to filter my organisation's projects by owner, type and status
  So that I can find the submissions I am interested in

  Scenario: The filter pane is not offered to an individual user
    Given an individual user is registered
    When the user navigates to the dashboard
    Then no filter pane is offered

  Scenario: A started application that has not been submitted is listed under Draft
    Given an organisation user has started a marine licence application
    When the user filters by type "Marine licence application" and status "Draft"
    Then the marine licence is listed

  Scenario: The pane starts hidden, toggles, and defaults to My submissions
    Given the shared submitted marine licence application
    When the user navigates to the dashboard
    Then the filter pane is hidden
    And selecting Show filter reveals it and Hide filter hides it again
    And "My submissions" is the selected Show option
    And the results caption reads "1 results found in 'My submissions'"

  Scenario: Showing all organisation submissions names the organisation
    Given the shared submitted marine licence application
    When the user filters by all organisation submissions
    Then the all submissions option names the organisation
    And the results caption counts one result in the organisation scope

  Scenario: A type and status that both match lists the application
    Given the shared submitted marine licence application
    When the user filters by type "Marine licence application" and status "Submitted"
    Then the marine licence is listed

  Scenario: A type and status are combined, so a status that does not match excludes the application
    Given the shared submitted marine licence application
    When the user filters by type "Marine licence application" and status "Draft"
    Then the marine licence is not listed
    And the results caption reads "0 results found in 'My submissions'"
    And the empty submissions message is displayed

  Scenario: Applied filters are listed, survive hiding the pane and can be removed one at a time
    Given the shared submitted marine licence application
    When the user filters by type "Marine licence application" and status "Draft"
    And the user hides and shows the filter pane
    Then the selected filters are "Draft" and "Marine licence application"
    And the marine licence is not listed
    And removing the "Draft" filter leaves only "Marine licence application" selected
    And the marine licence is listed

  Scenario: Clear filters returns the pane and the list to their default state
    Given the shared submitted marine licence application
    When the user filters by type "Marine licence application" and status "Draft"
    And the user selects Clear filters
    Then no filters are selected
    And the marine licence is listed
    And "My submissions" is the selected Show option
    And the results caption reads "1 results found in 'My submissions'"
