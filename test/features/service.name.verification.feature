@issue=ML-20 @issue=ML-543
Feature: Header verification feature
  As a user of the marine licensing service
  I want to see the correct service name "Get permission for marine work" displayed consistently
  So that I have a clear understanding of what service I am using

  @smoke
  Scenario: The header is correct on the dashboard
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Defra account |
      | Sign out      |

  @smoke
  Scenario: The header is correct on the task list
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
    And the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |

  @smoke
  Scenario: The header is correct on the project name page
    Given a notification has been created with a valid project name
    When the "Project name" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And no links are displayed in the header

  Scenario: The header is correct on the activity dates page
    Given a notification has been created with a valid project name
    When the "Activity dates" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |

  Scenario: The header is correct on the activity description page
    Given a notification has been created with a valid project name
    When the "Activity description" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |

  Scenario: The header is correct on the site details page
    Given a notification has been created with a valid project name
    When the "Site details" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |

  Scenario: The header is correct on the public register page
    Given a notification has been created with a valid project name
    When the "Public register" task is selected
    Then the service name "Get permission for marine work" is displayed in the header
    And the links are displayed in the header:
      | Projects      |
      | Defra account |
      | Sign out      |
