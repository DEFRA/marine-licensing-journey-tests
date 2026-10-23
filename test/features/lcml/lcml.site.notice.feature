@lcml
Feature: LCML: Displaying a site notice
  As an applicant
  I want to understand the requirements for publishing a site notice
  So that I am able to display the site notice correctly

  @issue=ML-1526
  Scenario: The applicant is asked to display a site notice and the application needs their action
    Given an organisation user has submitted a marine licence application
    When the caseworker sends the applicant a site notice for marine and community users
    Then the application status is "Action required" on the dashboard
    And View details shows the "Display a site notice" task as "Not yet responded"

  @issue=ML-1526
  Scenario: Going back from the Display a site notice page leaves the task not yet responded
    Given an organisation user has submitted a marine licence application
    When the caseworker sends the applicant a site notice for marine users
    And the applicant opens the Display a site notice task
    And the applicant goes back from the site notice page
    Then View details shows the "Display a site notice" task as "Not yet responded"
    And the application status is "Action required" on the dashboard

  @issue=ML-1528
  Scenario: An empty file is rejected as the close-up photo for site notice evidence
    Given an applicant asked to display a site notice is on the Display a site notice page
    When the applicant uploads an empty file as the close-up photo
    Then the site notice evidence error "The selected file is empty" is displayed
    And the site notice evidence page has no Cancel link

  @issue=ML-1528
  Scenario: Changing an uploaded site notice photo discards the previous file
    Given an applicant asked to display a site notice is on the Display a site notice page
    When the applicant adds all the site notice evidence for the location
    And the applicant changes the close-up photo to a different file
    Then the close-up photo evidence shows only the new file

  @issue=ML-1528
  Scenario: Added site notice evidence shows the answers and, once sent, completes the task
    Given an applicant asked to display a site notice is on the Display a site notice page
    When the applicant adds all the site notice evidence for the location
    Then each site notice evidence item shows the applicant's answer with a Change link
    And sending the evidence shows the "Display a site notice" task as "Completed" on View details
    And the application status is "Submitted" on the dashboard
    And the Display a site notice page is read-only and says when the evidence was submitted

  @real-defra-id @d365 @issue=ML-1525
  Scenario: A Public notice task saved with "Site notice" in D365 asks the applicant to display a site notice
    Given an organisation user has submitted a marine licence application
    When the caseworker completes the Site check in D365
    And the caseworker saves the Public notice task with "Site notice"
    Then the Public notice task was read-only until the Site check was done
    And the Public notice task asked for the site notice summary and who needs to be told
    And the Public notice task is "Awaiting applicant" in D365
    And View details shows the "Display a site notice" task as "Not yet responded"

  @issue=ML-1571
  Scenario: Another evidence location can be added and deleted, and Send evidence waits for every location
    Given an applicant asked to display a site notice is on the Display a site notice page
    When the applicant adds all the site notice evidence for the location
    And the applicant adds another evidence location
    Then a "Location 2 evidence" card is added with a Delete location link, the first card has none, and Send evidence is hidden
    And cancelling or going back from deleting location 2 keeps both cards
    And confirming the deletion of location 2 leaves only the first card and shows Send evidence again
