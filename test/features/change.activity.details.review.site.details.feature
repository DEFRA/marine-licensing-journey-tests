@issue=ML-695 @issue=ML-696
Feature: The user can make changes to their activity details from the site details review page
AS an applicant
I WANT to be able to change answers from the “Review site details” page
SO THAT I can ensure that my sites are correct

NOTE: These scenarios randomly generate multi-site details either manually or using file upload to provide coverage over time without test duplication.

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

  Scenario: The user can switch from project level to site level activity dates
    Given a user has reached the review site details page with project level activity dates
    When the user changes to site level activity dates
    Then the new activity dates are applied to all sites at site level

  Scenario: The user can change their project level activity description
    Given a user has reached the review site details page with project level activity descriptions
    When the user changes the project level activity description
    Then the new activity description is set at project level

  Scenario: The user can change their site level activity descriptions
    Given a user has reached the review site details page with site level activity descriptions
    When the user changes the site level activity description for site 1
    Then the new activity description is set at site level for site 1

  Scenario: The user can switch from project to site level activity description
    Given a user has reached the review site details page with project level activity descriptions
    When the user changes to site level activity descriptions
    Then the new activity description is applied to all sites at site level

  Scenario: The user can switch from site level to project level activity descriptions
    Given a user has reached the review site details page with site level activity descriptions
    When the user changes to project level activity descriptions
    Then the new activity description is set at project level
