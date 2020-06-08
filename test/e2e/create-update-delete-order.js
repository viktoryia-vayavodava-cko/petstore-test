const client = require('../client');
const order = require('../orders');

Feature.only('e2e - Create update delete an order', function () {
    let response, context;
    let orderItem, id, body;
    Scenario("e2e - Create update delete an order", async function () {
        // stepst to create a pet
        Given("we have an order", function () {
            orderItem = order.order01;
        });
        When("we create the order", async function () {
            context = await client.postOrder(orderItem);
        });
        Then("Response code is 200", function () {
            context.status.should.be.equal(200);
        });
        And("I get the id of the just created order", function () {
            id = context.body.id;
        });
        // stepst to get the order
        When("I search the order", async function () {
            response = await client.getOrder(id);
        });
        Then("Response code is 200", function () {
            response.status.should.be.equal(200);
        });
        // stepst to delete an order
        When("I delete the order", async function () {
            response = await client.deleteOrder(id);
        });
        Then("Response code is 200", async function () {
            response.status.should.be.equal(200);
        });  //
    });
});