@issue=ML-1 @issue=ML-9
Feature: Starting a new exemption notification by providing a project name

  Scenario: Provide a valid project name for a new exemption notification
  As the first step in creating an exemption notification,
  applicants can provide a meaningful name for their project.
  This helps them identify and track their notification throughout the process.
  Note: Due to being unable to connect to mongodb we cannot currently confirm
  that the notification record has been created. This will be solved in the next
  story.

    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed

  Scenario Outline: Error when project name is <projectName>
    Given the project name page is displayed
    When entering and saving the project with name "<projectName>"
    Then the error "<errorMessage>" is displayed

    Examples:
      | errorMessage                                  | projectName                                                                                                                                                                                                                                                                        |
      | Enter the project name                        |                                                                                                                                                                                                                                                                                    |
      | Project name should be 250 characters or less | Construction of an Eco-Conscious Offshore Wind Farm Featuring Advanced Turbine Technology, Renewable Energy Integration Systems, and Marine Environmental Safeguards to Protect Biodiversity Across Coastal and Open Water Ecosystems While Promoting Sustainable Energy Solutions |
