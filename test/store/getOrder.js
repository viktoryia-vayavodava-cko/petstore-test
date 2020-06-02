const client = require('../client');
const orders = require('../orders');
const helper = require('../helpMethods');


Feature("As a user I want to be able to find a purchased order by id so that I can verify the corretness of the search result", function () {

    Scenario("Search via a valid existing order id", function () {
        let context, response, order, orderID;
        Given("I have a valid existing order", function () {
            order = orders.order01
        });
        And("I have the id of a valid existing order", async function () {
            context = await client.postOrder(order);
            orderID = context.body.id;
            console.log("\t" + orderID);
        });
        When("I search for that order id", async function () {
            response = await client.getOrder(orderID);
        });
        Then("Response is 200", function () {
            context.status.should.be.equal(200);
        });
        And("All fireds are returned", function () {
            expect(response.body).to.have.keys(["id", "petId", "quantity", "shipDate", "status", "complete"]);
        });
        And("all values are matching with the value of the order id", function () {
            expect(response.body).to.deep.include(context.body);
        });
    });

    Scenario("Search via a valid not existing order id", function () {
        let response, orderID;
        Given("I have a valid but not existiong order id", function () {
            orderID = 888;
        });
        And("I search for that order id", async function () {
            response = await client.getOrder(orderID);
        });
        Then("Response is 404", function () {
            response.status.should.be.equal(404);
        });
        // i would advise having more generic descriptions in assertions, like 'The appropriate error message is shown'
        // because then you reveal the message in the assertion itself anyways
        And("The error message says Order not found", function () {
            response.body.message.should.be.equal("Order not found")
        });
        And("The error message is of type error", function () {
            response.body.type.should.be.equal("error")
        });
    });

    Scenario("Search via an invalid id", function () {
        let response, orderID;
        Given("I have an invalid order id", function () {
            orderID = '88r8';
        });
        And("I search for that order id", async function () {
            response = await client.getOrder(orderID);
        });
        Then("Response is 404", function () {
            response.status.should.be.equal(404);
        });
        And("The error is not on the server side", function () {
            response.clientError.should.be.equal(true);
            response.serverError.should.be.equal(false);
        });
        And("The error has generated a java.lang exception", function () {
            let message = response.body.message;
            message.should.be.equal(`java.lang.NumberFormatException: For input string: \"${orderID}\"`);
        });
    });
});




