@issue=ML-1494
Feature: Exemptions: status derived from the activity dates
  As an applicant
  I want the status of my exemption to reflect whether it is scheduled, active or expired
  So that I can understand at a glance where it is up to

  Scenario: An exemption starting in the future is Scheduled
    Given an individual has submitted an exemption starting in the future
    When the user opens View details for the exemption from the dashboard
    Then the dashboard row showed "Scheduled" with a green tag
    And the dashboard row offered the Withdraw option
    And the View details page shows the "Scheduled" status
    And the public view details page shows the "Scheduled" status

  Scenario: An exemption running today is Active, taking the widest dates across its sites
    Given an individual has submitted a two-site exemption with one site ended and one running
    When the user opens View details for the exemption from the dashboard
    Then the dashboard row showed "Active" with a teal tag
    And the dashboard row offered the Withdraw option
    And the View details page shows the "Active" status
    And the public view details page shows the "Active" status

  Scenario: An exemption that has ended is Expired and cannot be withdrawn
    Given an individual has submitted an exemption that has already ended
    When the user opens View details for the exemption from the dashboard
    Then the dashboard row showed "Expired" with a grey tag
    And the dashboard row offered no Withdraw option
    And the View details page shows the "Expired" status
    And the public view details page shows the "Expired" status
