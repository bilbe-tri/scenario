package com.glue;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class WorkbenchCuttingPlatformStep {

    @Given("^I have a workbench without a cutting station$")
    public void i_have_a_workbench() throws Throwable {
        Assert.assertEquals(true, true);
    }

  @When("^I want to cut things to length$")
  public void i_need_to_cut_material() throws Throwable {
      // Write code here that turns the phrase above into concrete actions
      Assert.assertEquals(true, true);
  }

  @Then("^I should have a chop saw station$")
  public void add_a_cutting_station() throws Throwable {
      // Write code here that turns the phrase above into concrete actions
      Assert.assertEquals(false, false);
  }
}
