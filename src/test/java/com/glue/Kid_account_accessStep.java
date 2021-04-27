package com.glue;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
//
//  Scenario: kid should log in
//          Given i am a kid with an account
//          When i log in after my parent has made an account
//          Then i should see my account balance
public class Kid_account_accessStep {

    @Given("^i am a kid with an account$")
    public void that_i_am_a_logged_in_parent() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @When("^i log in after my parent has made an account$")
    public void i_view_the_kid_list_page() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @Then("^i should see my account balance$")
    public void i_should_see_a_link_to_add_kids() throws Throwable {
        Assert.assertEquals(true, true);
    }
}
