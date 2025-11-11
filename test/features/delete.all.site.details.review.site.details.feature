@issue=ML-694
Feature: The user can delete all site details from the review site details page
AS an applicant
I WANT to be able to delete all the sites that have been provided so far
SO THAT I can start again if needed

NOTE: This scenario randomly generates sites either manually or using file upload to provide coverage over time without test duplication.

  Scenario: The user can delete all site details after confirmation
    Given a user has reached the review site details page
    When the user confirms deletion of all site details
    Then the user is returned to the task list with site details task not yet started

  Scenario: The user can cancel deletion of all site details
    Given a user has reached the review site details page
    When the user cancels deletion of all site details
    Then the user is returned to the review site details page with unchanged site details

  Scenario: The user can delete file upload site details and upload a new file
    Given a user has uploaded sites via file upload
    When the user confirms deletion of all site details
    Then the user can successfully upload a new file

  Scenario: The user can delete file upload site details and enter manual coordinates
    Given a user has uploaded sites via file upload
    When the user confirms deletion of all site details
    Then the user can successfully enter manual coordinates
