@real-defra-id
Feature: Dashboard: submitted notification details with real Defra ID
  As an applicant
  I want my submitted notification shown correctly on the dashboard and its public view URL
  So that I can confirm what has been published about it

  Scenario: The public view page names the organisation the exemption is for
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    Then the public view page for the submitted notification shows the exemption is for "Windfarm Co"

  Scenario: Withdrawn notification shows correct status on dashboard and in D365
    Given a user has submitted an exemption notification
    And the case status in D365 matches
      | Reference number       | matches submitted reference number |
      | D365 Status            | Completed                         |
      | Application Status     | Active                             |
      | Applicant Organisation | Windfarm Co                        |
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
      | Reference number       | matches submitted reference number |
      | Application Status     | Withdrawn                          |
      | Applicant Organisation | Windfarm Co                        |
