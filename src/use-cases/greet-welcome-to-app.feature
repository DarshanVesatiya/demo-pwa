Feature: Greet welcome to user

  Scenario: Greet welcome message
    Given User is dipesh
    When I go to system
    Then It greets me `welcome dipesh`
