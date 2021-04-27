package com.glue;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

public class Parent_gives_kid_moneyStep {

    @Given("^Parent is logged in and has children$")
    public void that_i_am_a_logged_in_parent() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @When("^Parent selects child$")
    public void i_view_the_kid_list_page() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @Then("^Parent should see an option to give money$")
    public void i_should_see_a_link_to_add_kids() throws Throwable {
        Assert.assertEquals(true, true);
    }
}
