const client = require('../client');
const orders = require('../orders');

Feature("Delete a purchased order by id", function () {

    let orderID;

    beforeEachScenario("Create a new order", async function () {
        order = orders.order01
        context = await client.postOrder(order);   // Question - Why I get the same orderId for each scenario?
        orderID = context.body.id;
        console.log("\t" + orderID);
    });

    Scenario("Delete an order using a valid existing order id", function () {
        let response;
        Given("I have a valid order id", function () {
            // is the OrderID saved as global variable
        });
        And("I Delete the order using the orderid", async function () {
            response = await client.deleteOrder(orderID);
        });
        Then("Response is 200", function () {
            response.status.should.be.equal(200);
        });
        And("The message returns the order id that has been deleted", function () {
            parseInt(response.body.message).should.be.equal(orderID);
        });
        And("The type is unknown", function () {
            response.body.type.should.be.equal("unknown")
        });
    });

    Scenario("Delete an order whose order id does not exists", function () {
        let response;
        Given("I have a not esisting order id", async function () {
            response = await client.deleteOrder(orderID);
        });
        When("I search for that not existing order id", async function () {
            response = await client.getOrder(orderID);
        });
        And("The message says 'Order not found'", function () {
            response.body.message.should.be.equal("Order not found")
        });
        Then("I try to delete an order that does not exists", async function () {
            response = await client.deleteOrder(orderID);
        });
        And("I receive a 404 and message 'Order Not Found'", function () {
            response.status.should.be.equal(404);
            response.body.message.should.be.equal("Order Not Found");
            response.notFound.should.be.equal(true);
            console.log('\t-->  ' + response.error);
        });
    });

    Scenario("Delete an order whose order id is invalid", function () {
        let response, orderIDNotValid;
        Given("I have an invalid order id ", function () {
            orderIDNotValid = "88r8";
            console.log("\t--> " + orderIDNotValid);
        });
        And("I Delete using an invalid order id", function () {
            response = await client.deleteOrder(orderIDNotValid);
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
            console.log('\t--> ' + response.error);
            message.should.be.equal(`java.lang.NumberFormatException: For input string: \"${orderIDNotValid}\"`)
        });
    });
});




