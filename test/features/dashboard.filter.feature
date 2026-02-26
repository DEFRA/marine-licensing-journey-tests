@real-defra-id
Feature: Dashboard filter: Filter projects by ownership
  As an applicant
  I want to filter the dashboard by my projects or all organisation projects
  So that I can find the relevant project quickly

  Scenario: Dashboard displays filter radio buttons and Owner column with JS enabled
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    Then the dashboard filter is correctly configured with "My projects" selected by default
    And the submitted notification row contains the correct details
      | Project name  | matches submitted project name     |
      | Type          | Exempt activity notification       |
      | Reference     | matches submitted reference number |
      | Status        | Active                             |
      | Submitted on  | today's date                       |
      | Owner         | Test MMOUser                       |
      | Actions       | View details, Withdraw             |
    And the public details page for the submitted notification shows the exemption is for "Windfarm Co"

  Scenario: Changing the filter radio auto-updates results without clicking Update results
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    And the user selects the "All projects" filter radio option
    Then the dashboard results are updated without clicking a button
    And the submitted notification row contains the correct details
      | Project name  | matches submitted project name     |
      | Type          | Exempt activity notification       |
      | Reference     | matches submitted reference number |
      | Status        | Active                             |
      | Submitted on  | today's date                       |
      | Owner         | Test MMOUser                       |
      | Actions       | View details, Withdraw             |

  Scenario: Withdrawn notification shows correct status on dashboard and in D365
    Given a user has submitted an exemption notification
    And the user navigates to the dashboard
    When the user withdraws the submitted notification
    Then the submitted notification row contains the correct details
      | Project name  | matches submitted project name     |
      | Type          | Exempt activity notification       |
      | Reference     | matches submitted reference number |
      | Status        | Withdrawn                          |
      | Submitted on  | today's date                       |
      | Owner         | Test MMOUser                       |
      | Actions       | View details                       |
    And the case status in D365 matches
      | Reference number   | matches submitted reference number |
      | Application Status | Withdrawn                          |
