@issue=ML-1 @issue=ML-9
Feature: Validation of Project name: the project name is validated

  Scenario Outline: Error when project name is <projectName>
    Given the project name page is displayed
    When entering and saving the project with name "<projectName>"
    Then the project name error "<errorMessage>" is displayed

    Examples:
      | errorMessage                                  | projectName                                                                                                                                                                                                                                                                        |
      | Enter the project name                        |                                                                                                                                                                                                                                                                                    |
      | Project name should be 250 characters or less | Construction of an Eco-Conscious Offshore Wind Farm Featuring Advanced Turbine Technology, Renewable Energy Integration Systems, and Marine Environmental Safeguards to Protect Biodiversity Across Coastal and Open Water Ecosystems While Promoting Sustainable Energy Solutions |
