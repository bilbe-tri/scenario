
Feature: Kid spent money and parent is deducting
  Here is the description for the feature as a whole

  Scenario: Parent can remove money
    Given i am logged in as a parent
    When i view my child who spent money
    Then i can deduct money from the child