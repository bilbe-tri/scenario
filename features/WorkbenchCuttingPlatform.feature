Feature: Workbench options
  A workbench should have multiple options for greater versatility

  Scenario: Add workbench saw station
    Given I have a workbench without a cutting station
    When I want to cut things to length
    Then I should have a chop saw station
#change this comment to force a build xxx
