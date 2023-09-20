Feature:
  Add a cutting station to my worktable

  Scenario: The worktable should have a cutting station
    Given My worktable does not have a cutting station
    When I have the money
    Then I will add a chopsaw
