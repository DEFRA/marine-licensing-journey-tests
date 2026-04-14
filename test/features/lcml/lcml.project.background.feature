@lcml
Feature: LCML: Project background task
  As an applicant
  I want to provide a project background for my marine licence application
  So that the MMO understands the context of my project

  Scenario: Project background task is displayed on the task list
    Given an organisation user is on the marine licence task list
    When the user views the task list
    Then the "Project background" task status is "Not yet started"

  Scenario: Completing the project background task
    Given an organisation user is on the project background page
    When the user enters a valid project background and saves
    Then the user is returned to the task list with "Project background" status "Completed"

  Scenario: Previously saved project background is displayed on reload
    Given an organisation user has completed the project background task
    When the user re-enters the project background task
    Then the previously saved project background is displayed

