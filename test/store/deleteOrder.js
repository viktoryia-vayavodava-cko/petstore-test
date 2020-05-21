const client = require('../client');
const orders = require('../orders');
const helper = require('../helpMethods');


Feature.only("As a user I want to be able to Delete a purchased order by id so that I can verify that the order does not exists anymore", function () {

    let orderID;
    Scenario("Find an order using a valid existing order id", function () {
        let context, response, order;
        Given("I have a valid existing order", async function () {
            order = orders.order01
        });
        And("I have the id of a valid existing order", async function () {
            context = await client.postOrder(order);
            orderID = context.body.id;
            console.log("\t" + orderID);
        });
        When("I search for that order id to verify that the order exists", async function () {
            response = await client.getOrder(orderID);
        });
        Then("Response is 200", async function () {
            context.status.should.be.equal(200);
        });
    });

    Scenario("Delete an order using a valid existing order id", function () {
        let response;
        Given("I have a valid order id", async function () {
            // is the OrderID saved as global variable
        });
        And("I Delete the order using the orderid", async function () {
            response = await client.deleteOrder(orderID);
        });
        Then("Response is 200", async function () {
            response.status.should.be.equal(200);
        });
        And("The message returns the order id that has been deleted", async function () {
            parseInt(response.body.message).should.be.equal(orderID);
        });
        And("The type is unknown", async function () {
            response.body.type.should.be.equal("unknown")
        });
    });

    Scenario("Delete an order whose order id does not exists", function () {
        let response;
        Given("I have a not esisting order id", function () {
            // is the OrderID saved as global variable
            // in the previoud scenario got deleted
        });
        When("I search for that not existing order id", async function () {
            response = await client.getOrder(orderID);
        });
        And("Response is 404", async function () {
            response.status.should.be.equal(404);
        });
        And("The message says 'Order not found'", async function () {
            response.body.message.should.be.equal("Order not found")
        });
        Then("I try to delete an order that does not exists", async function () {
            response = await client.deleteOrder(orderID);
        });
        And("I receive a 404 and message 'Order Not Found'", function () {
            response.status.should.be.equal(404);
            response.body.message.should.be.equal("Order Not Found");
            response.notFound.should.be.equal(true);
            console.log('\t' +response.error);
        });

        And("the method is DELETE", function () {
            response.error.method.should.be.equal("DELETE");
        });
    });

    Scenario("Delete an order whose order id is invalid", function () {
        let response, orderID;
        Given("I have an invalid order id '88r8' ", async function () {
            orderID = "88r8";
        });
        And("I Delete for that order id", async function () {
            response = await client.deleteOrder(orderID);
        });
        Then("Response is 404", async function () {
            response.status.should.be.equal(404);
        });
        And("The error is not on the server side", async function () {
            response.clientError.should.be.equal(true);
            response.serverError.should.be.equal(false);
        });
        And("The error has generated a java.lang exception", function () {
            let message = response.body.message;
            helper.findInString(message, "java.lang").should.be.equal(0);
            console.log('\t' +response.error);
        });
    });
});




