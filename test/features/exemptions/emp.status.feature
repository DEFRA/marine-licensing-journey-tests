@issue=ML-1500 @empOvernight
Feature: Exemptions: status changes reach Explore Marine Planning
  As the MMO
  I want EMP to show each exemption's current status
  So that the public map never shows work that has not started, has finished or was withdrawn

  # Runs only on the test environment, scheduled from the CDP portal at 23:55
  # London time: the nightly exemption-status job fires at 00:05 and the first
  # scenario waits for it.

  Scenario: The nightly status job moves exemptions on in EMP
    Given an exemption starting tomorrow has been submitted
    And an exemption ending today has been submitted
    And EMP shows the exemption starting tomorrow as "Scheduled"
    And EMP shows the exemption ending today as "Active"
    When the nightly exemption status job has run
    Then EMP shows the exemption starting tomorrow as "Active"
    And EMP shows the exemption ending today as "Expired"

  Scenario: Withdrawing a scheduled exemption marks it Withdrawn in EMP
    Given an exemption starting in the future has been submitted
    And EMP shows the exemption starting in the future as "Scheduled"
    When the user withdraws the exemption starting in the future
    Then EMP shows the exemption starting in the future as "Withdrawn"

  Scenario: Withdrawing an active exemption marks it Withdrawn in EMP
    Given an exemption running today has been submitted
    And EMP shows the exemption running today as "Active"
    When the user withdraws the exemption running today
    Then EMP shows the exemption running today as "Withdrawn"
