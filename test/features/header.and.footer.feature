@issue=ML-20 @issue=ML-279 @issue=ML-543 @issue=ML-644 @issue=ML-726
Feature: Header and footer verification feature
  As a user of the marine licensing service
  I want to see the correct service name "Get permission for marine work" displayed consistently
  So that I have a clear understanding of what service I am using

  AS an applicant
  I WANT to see a footer with useful links at the bottom of every page
  SO THAT I can quickly navigate to important pages

  AS an applicant
  I WANT to see a header with a clear identity and useful links at the top of every page
  SO THAT I know I am in the right place and I can quickly navigate to important pages

  AS an applicant
  I WANT to see the privacy policy of MMO in the footer of every page
  SO THAT I can be sure my data is being used legally

  AS an employee user
  I WANT to be able to log in and carry out work for my organisation
  SO THAT my work is associated with my organisation

  @smoke
  Scenario: The header and footer are correct on the dashboard
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Defra account |
      | Sign out      |
    And the links are displayed in the footer:
      | Privacy                      |
      | Cookies                      |
      | Open Government Licence v3.0 |
      | © Crown copyright            |
    And the organisation name is displayed in the header

  @smoke
  Scenario: The header and footer are correct on the task list
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
    And the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |
    And the links are displayed in the footer:
      | Privacy                      |
      | Cookies                      |
      | Open Government Licence v3.0 |
      | © Crown copyright            |
    And the organisation name is displayed in the header

  @smoke
  Scenario: The header and footer are correct on the project name page
    Given a notification has been created with a valid project name
    When the "Project name" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And no links are displayed in the header
    And the links are displayed in the footer:
      | Privacy                      |
      | Cookies                      |
      | Open Government Licence v3.0 |
      | © Crown copyright            |
    And the organisation name is displayed in the header

  Scenario: The header and footer are correct on the site details page
    Given a notification has been created with a valid project name
    When the "Site details" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |
    And the links are displayed in the footer:
      | Privacy                      |
      | Cookies                      |
      | Open Government Licence v3.0 |
      | © Crown copyright            |
    And the organisation name is displayed in the header

  Scenario: The header and footer are correct on the public register page
    Given a notification has been created with a valid project name
    When the "Sharing your project information publicly" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |
    And the links are displayed in the footer:
      | Privacy                      |
      | Cookies                      |
      | Open Government Licence v3.0 |
      | © Crown copyright            |
    And the organisation name is displayed in the header
