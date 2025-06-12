Feature: Test Gherkin Violations
  As a developer
  I want to test the linter
  So that I can verify it catches violations

  Scenario: When before Given violation
    When I perform an action
    Given I have some context
    Then I should see a result

  Scenario: Then before When violation  
    Given I have some context
    Then I should see a result
    When I perform an action

  Scenario: Multiple behaviours violation
    Given I have some context
    When I perform first action
    Then I should see first result
    When I perform second action
    Then I should see second result

  Scenario: Given after When violation
    Given I have initial context
    When I perform an action
    Given I have additional context
    Then I should see a result

  Scenario: Too many steps violation
    Given I have some context
    And I have more context
    And I have even more context
    When I perform an action
    And I perform another action
    Then I should see a result
    And I should see another result
    And I should see yet another result

  Scenario: Correct scenario (should pass)
    Given I have some context
    And I have more context
    When I perform an action
    Then I should see a result
    And I should verify the outcome 