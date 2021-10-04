package com.glue;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class Build_custom_workbenchStep {

    @Given("^I have a workbench$")
    public void i_have_a_workbench() throws Throwable {
        Assert.assertEquals(true, true);
    }

  @When("^I need to cut material$")
  public void i_need_to_cut_material() throws Throwable {
      // Write code here that turns the phrase above into concrete actions
      Assert.assertEquals(true, true);
  }

  @Then("^add a cutting station$")
  public void add_a_cutting_station() throws Throwable {
      // Write code here that turns the phrase above into concrete actions
      Assert.assertEquals(true, true);
  }
}
