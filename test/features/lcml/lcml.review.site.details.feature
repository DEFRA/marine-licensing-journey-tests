@lcml @issue=ML-1239
Feature: LCML: Review site details page (manual entry)
  As an applicant providing site details for a marine licence application
  I want to review and change the details of the site(s) I have entered manually
  So that I can confirm they are correct before sending my information

  Scenario: A polygon site is displayed with its boundary coordinates and no dividing lines
    Given an organisation user has manually entered a polygon site for a marine licence
    When the user views the review site details page
    Then the review site details page is displayed with the project name as the caption
    And the polygon site card displays the entered boundary coordinates
    And the coordinate rows have no dividing lines between them

  Scenario: Continuing to the task list sets the Site details task to In progress
    Given an organisation user has manually entered a circular site for a marine licence
    When the user continues from the review site details page
    Then the marine licence task list is displayed
    And the "Site details" task status is "In progress"

  Scenario: Saving a changed site name returns to the review page with the change saved
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the "Site name" change link for the circular site
    And the user changes the site name and saves
    Then the review site details page is displayed at the site 1 anchor
    And the site name on the review page shows the updated value

  Scenario: Manually adding a second site shows it on the review page
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the Add another site button
    And the user manually enters another circular site
    Then the review site details page is displayed at the site 2 anchor
    And site 1 is displayed on the review page
    And site 2 is displayed on the review page

  Scenario: Deleting a site that is not the last re-numbers the remaining sites
    Given an organisation user has manually entered two circular sites for a marine licence
    When the user deletes site 1
    Then the review site details page is displayed
    And only 1 site is displayed on the review page
    And the remaining site is re-numbered as site 1 with the second site name

  Scenario: Deleting the last remaining site returns to the task list
    Given an organisation user has manually entered a circular site for a marine licence
    When the user deletes site 1
    Then the marine licence task list is displayed
    And the "Site details" task status is "Not yet started"

  Scenario Outline: Selecting <option> on the delete confirmation page returns to review without deleting
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the Delete site option for site 1
    And the user selects "<option>" on the delete site confirmation page
    Then the review site details page is displayed
    And site 1 is displayed on the review page

    Examples:
      | option |
      | Cancel |
      | Back   |
