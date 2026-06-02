@lcml @issue=ML-1239  @issue=ML-1203  @issue=ML-1204 @issue=ML-1202  @issue=ML-1200
Feature: LCML: Review site details page (manual entry)
  As an applicant providing site details for a marine licence application
  I want to review and change the details of the site(s) I have entered manually
  So that I can confirm they are correct before sending my information

  @issue=ML-1239
  Scenario: A polygon site is displayed with its boundary coordinates and no dividing lines
    Given an organisation user has manually entered a polygon site for a marine licence
    When the user views the review site details page
    Then the review site details page is displayed with the project name as the caption
    And the polygon site card displays the entered boundary coordinates
    And the coordinate rows have no dividing lines between them

  @issue=ML-1239
  Scenario: Continuing to the task list sets the Site details task to In progress
    Given an organisation user has manually entered a circular site for a marine licence
    When the user continues from the review site details page
    Then the marine licence task list is displayed
    And the "Site details" task status is "In progress"

  @issue=ML-1203
  Scenario Outline: The <field> change link opens a pre-populated page with no Cancel option
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the "<field>" change link for the circular site
    Then the "<page>" page is displayed
    And the previous answer is pre-populated
    And the page does not display a Cancel option

    Examples:
      | field                                  | page                                                  |
      | Site name                              | Site name                                             |
      | Single or multiple sets of coordinates | How do you want to enter the site coordinates?        |
      | Coordinate system                      | Which coordinate system do you want to use?           |
      | Coordinates at centre of site          | Enter the coordinates at the centre point of the site |
      | Width of circular site                 | Enter the width of the circular site in metres        |

  @issue=ML-1203
  Scenario: Saving a changed answer returns to the review page at the site anchor with the change saved
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the "Site name" change link for the circular site
    And the user changes the site name and saves
    Then the review site details page is displayed at the site 1 anchor
    And the site name on the review page shows the updated value

  @issue=ML-1203
  Scenario: Changing the coordinate system follows the knock-on flow back to the review page
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the "Coordinate system" change link for the circular site
    And the user changes the coordinate system and re-enters the centre point
    And the user enters new centre point coordinates and continues
    Then the review site details page is displayed at the site 1 anchor
    And the coordinate system on the review page reflects the change
    And the width of the circular site is retained on the review page

  @issue=ML-1204
  Scenario Outline: The <field> change link opens a pre-populated page with no Cancel option for a polygon site
    Given an organisation user has manually entered a polygon site for a marine licence
    When the user selects the "<field>" change link for the polygon site
    Then the "<page>" page is displayed
    And the previous answer is pre-populated
    And the page does not display a Cancel option

    Examples:
      | field                                  | page                                                                |
      | Site name                              | Site name                                                           |
      | Single or multiple sets of coordinates | How do you want to enter the site coordinates?                      |
      | Coordinate system                      | Which coordinate system do you want to use?                         |
      | Start and end points                   | Enter multiple sets of coordinates to mark the boundary of the site |

  @issue=ML-1204
  Scenario: Saving a changed site name for a polygon site returns to the review page at the site anchor
    Given an organisation user has manually entered a polygon site for a marine licence
    When the user selects the "Site name" change link for the polygon site
    And the user changes the site name and saves
    Then the review site details page is displayed at the site 1 anchor
    And the site name on the review page shows the updated value

  @issue=ML-1204
  Scenario: Changing the coordinate system for a polygon site follows the knock-on flow back to the review page
    Given an organisation user has manually entered a polygon site for a marine licence
    When the user selects the "Coordinate system" change link for the polygon site
    And the user changes the coordinate system and re-enters the boundary coordinates
    Then the review site details page is displayed at the site 1 anchor
    And the coordinate system on the review page reflects the change

  @issue=ML-1202
  Scenario: Manually adding a second site shows it on the review page
    Given an organisation user has manually entered a circular site for a marine licence
    When the user selects the Add another site button
    And the user manually enters another circular site
    Then the review site details page is displayed at the site 2 anchor
    And site 1 is displayed on the review page
    And site 2 is displayed on the review page

  @issue=ML-1200
  Scenario: Deleting a site that is not the last re-numbers the remaining sites
    Given an organisation user has manually entered two circular sites for a marine licence
    When the user deletes site 1
    Then the review site details page is displayed
    And only 1 site is displayed on the review page
    And the remaining site is re-numbered as site 1 with the second site name

  @issue=ML-1200
  Scenario: Deleting the last remaining site returns to the task list
    Given an organisation user has manually entered a circular site for a marine licence
    When the user deletes site 1
    Then the marine licence task list is displayed
    And the "Site details" task status is "Not yet started"

  @issue=ML-1200
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
