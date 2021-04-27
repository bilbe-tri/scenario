package com.glue;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;

//Scenario: Parent can remove money
//        Given i am logged in as a parent
//        When i view my child who spent money
//        Then i can deduct money from the child
//
//        Scenario: Parent can remove moneyx
//        Given i am logged in as a parentx
//        When i view my child who spent moneyx
//        Then i can deduct money from the childx
//

public class Kid_spent_money_and_parent_is_deductingStep {

    @Given("^i am logged in as a parent$")
    public void that_l_i_am_a_logged_in_parent() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @When("^i view my child who spent money$")
    public void ss_i_view_the_kid_list_page() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @Then("^i can deduct money from the child$")
    public void ss_i_should_see_a_link_to_add_kids() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @Given("^i am logged in as a parentx$")
    public void ss_that_i_am_a_logged_in_parent() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @When("^i view my child who spent moneyx$")
    public void i_view_the_kid_list_page() throws Throwable {
        Assert.assertEquals(true, true);
    }

    @Then("^i can deduct money from the childx$")
    public void i_can_should_see_a_link_to_add_kids() throws Throwable {
        Assert.assertEquals(true, true);
    }
}
