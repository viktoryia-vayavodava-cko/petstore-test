const client = require('../client');
const orders = require('../orders');

Feature("Find a purchased order by ID", function () {
    Scenario("Search via a valid existing order id", function () {
        let context, response, order, orderID;
        Given("I have a valid existing order", function () {
            order = orders.order01
        });
        And("I have the id of a valid existing order", async function () {
            context = await client.postOrder(order);
            orderID = context.body.id;
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
        when("I search for that order id", async function () {
            response = await client.getOrder(orderID);
        });
        Then("Response is 404", function () {
            response.status.should.be.equal(404);
        });
        And("The appropriate error message is shown", function () {
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
        when("I search for that order id", async function () {
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




