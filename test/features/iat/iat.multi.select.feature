@iat @iatmultiselect
Feature: IAT: Multi-select (checkbox) question pages
  As an applicant using the IAT
  I want multi-select question pages to render checkboxes
  So that I can pick one or more activities relevant to my project

  Scenario: Display a multi-select question page
    Given the user walks the IAT to the question "/dredging/activities"
    When the user views the IAT question page
    Then the IAT question page caption shows the section "Self-service check - Sub-activities" and heading contains "Please select sub-activites that match with activities proposed to be carried out."
    And the IAT question page shows checkboxes named "answers" with a Back link and a Continue button
    And the IAT question page has no header navigation links and any external guidance links open in a new tab

  Scenario: Selecting checkboxes and continuing navigates to the next question
    Given the user walks the IAT to the question "/dredging/activities"
    When the user selects the IAT checkbox "Non-navigational clearance dredging (for operational purposes)"
    And the user clicks the IAT Continue button
    Then the IAT question page URL has changed from "/dredging/activities"

  Scenario: Back link navigates away from the multi-select page with no answers pre-selected
    Given the user walks the IAT to the question "/dredging/activities"
    When the user clicks the IAT Back link
    Then the IAT question page URL has changed from "/dredging/activities"
    And no IAT checkbox is checked on the current question page

  @issue=ML-1350
  Scenario: Selected checkboxes are retained when navigating back to a multi-select page
    Given the user walks the IAT to the question "/dredging/activities"
    When the user selects the IAT checkbox "Non-navigational clearance dredging (for operational purposes)"
    And the user clicks the IAT Continue button
    And the user clicks the IAT Back link
    Then the IAT checkbox "Non-navigational clearance dredging (for operational purposes)" is checked
