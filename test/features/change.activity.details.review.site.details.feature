@issue=ML-695
Feature: The user can make changes to their activity details from the site details review page
AS an applicant
I WANT to be able to change answers from the “Review site details” page
SO THAT I can ensure that my sites are correct

  Scenario: The user can change their project level activity dates
    Given a user has reached the review site details page with project level activity dates
    When the user changes the project level activity dates
    Then the activity dates are updated on the review site details page

  Scenario: The user can change their site level activity dates
    Given a user has reached the review site details page with site level activity dates
    When the user changes the activity dates for site 1
    Then the activity dates are updated on the review site details page for site 1

  Scenario: The user can switch from site level to project level activity dates
    Given a user has reached the review site details page with site level activity dates
    When the user changes to project level activity dates
    Then the new activity dates are set at project level

  @wip
  Scenario: The user can switch from project level to site level activity dates

  @wip
  Scenario: The user can change their project level activity description

  @wip
  Scenario: The user can change their site level activity descriptions

  @wip
  Scenario: The user can switch from project to site level activity description

  @wip
  Scenario: The user can switch from site level to project level activity descriptions
