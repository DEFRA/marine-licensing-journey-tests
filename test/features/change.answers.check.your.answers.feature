@issue=ML-83
Feature: The user can make changes to their answers from the check your answers page
AS an applicant
I WANT to be able to change answers from the "Check your answers" page
SO THAT I can ensure everything is correct before submitting my notification

NOTE: These scenarios test that change links navigate to the correct pages and return to CYA after changes are made.

  Scenario: The user can change their project name from check your answers
    Given a user has reached the check your answers page
    When the user changes the project name from check your answers
    Then the project name is updated on the check your answers page

  Scenario: The user can navigate to review site details from providing the site location change link
    Given a user has reached the check your answers page
    When the user selects change for providing the site location from check your answers
    Then the user is taken to the review site details page

  Scenario: The user can change activity details from check your answers with multiple sites
    Given a user has reached the check your answers page with multiple sites
    When the user changes the activity details from check your answers
    Then the user is returned to the check your answers page with updated activity details

  Scenario: The user can change a specific site from check your answers
    Given a user has reached the check your answers page with multiple sites
    When the user changes site 1 details from check your answers
    Then the user is returned to the check your answers page with updated site 1 details

  Scenario: The user can change data sharing consent from check your answers
    Given a user has reached the check your answers page
    When the user changes the data sharing consent from check your answers
    Then the data sharing consent is updated on the check your answers page

  Scenario: The user can change site name for file uploaded sites from check your answers
    Given a user has reached the check your answers page with file uploaded sites
    When the user changes a site name from check your answers
    Then the site name is updated on the check your answers page
