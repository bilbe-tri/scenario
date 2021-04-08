Feature:AuthenticationFeature
  This is the description of the auth feature

  Scenario:
    Given I have opend the application
    When I put in valid credentials
    And click login
    Then I should see my personalized home page
