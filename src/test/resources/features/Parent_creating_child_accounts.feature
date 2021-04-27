
Feature: Parent creating child accounts
  Parents should create accounts for their children. Kids should not make their own accounts

@metadata

  Scenario: Parent should see link to add new kid
    Given that I am a logged in parent
    When I view the the kid list page
    Then I should see a link to add kid
    Then I am a logged in kid with an account balance greater than 0