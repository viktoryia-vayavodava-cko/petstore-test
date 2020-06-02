const client = require('../client');
const orders = require('../orders');
const helper = require('../helpMethods');

feature('User is able to place an order', function () {

    scenario("Place an empty order", function () {
        let order;
        let context;
        given("an empty order", function () {
            order = {};
        });
        when("submit the order", async function () {
            context = await client.postOrder(order);
        });
        then("verify that an empty order is created", function () {
            let response = context.body;
            context.status.should.be.equal(200);
            response.petId.should.be.equal(0);
            response.quantity.should.be.equal(0);
            response.complete.should.be.equal(false);
        });
    })

    scenario("Place a valid order", function () {
        let order = orders.order01;
        given("a valid order", async function () {
            context = await client.postOrder(order);
        });
        // do we need this assertion in And() method? i would say that the above Given() should be changed to When () actually, bacause you perform an Post action
        // and the below And() should be renamed to Then()
        // which  means that you need to come up with Given() method to start with

        and("status 200 is returned", function () {
            context.status.should.be.equal(200);
        });
        then("verify that the all fields are populated", function () {
            let response = context.body;
            expect(response.id).to.not.be.undefined.and.not.be.null;
            expect(response.id, '"id" is not an integer').and.is.a('number').above(0).and.satisfy(Number.isInteger);
            expect(response.petId, 'petId is not undefined').to.not.be.undefined.and.not.be.null;
            expect(response.petId, 'petId is not a number').and.is.a('number').above(0).and.satisfy(Number.isInteger);
            expect(response.quantity).to.be.equal(20);
            expect(response.shipDate).to.not.be.undefined.and.not.be.null;
            expect(helper.dateTrim(response.shipDate)).to.be.equal(helper.dateTrim(order.shipDate));
            expect(response.status, 'response is not set as "placed"').to.be.equal('placed');
            expect(response.status, '"status" is not a string').and.is.a('string');
            response.complete.should.be.equal(true, 'response is not set as "true"');
        });
        and("all keys are returned", function () {
            let response = context.body;
            // why do you need all these assertions? isnt assertion in the line 53 similar to assertions in lines 54-59?
            expect(response).to.have.keys(["id", "petId", "quantity", "shipDate", "status", "complete"]);
            expect(response).to.have.property('id');
            expect(response).to.have.property("petId");
            expect(response).to.have.property("quantity");
            expect(response).to.have.property("shipDate");
            expect(response).to.have.property("status");
            expect(response).to.have.property("complete");
        });
    });

    scenario("Place a not valid order", function () {
        let order = orders.order02;
        given("an invalid order", async function () {
            context = await client.postOrder(order);
        });
        // where is your action - e.g.When() step?
        then("verify that all fields are undefined", function () {
            let response = context.body;
            expect(response.id).to.be.undefined;
            expect(response.petId).to.be.undefined;
            expect(response.quantity).to.be.undefined;
            expect(response.shipDate).to.be.undefined;
            expect(response.status).to.be.undefined;
            expect(response.complete).to.be.undefined;
        });
        and("The return status is 500", function () {
            context.status.should.be.equal(500);
        });

        // i dont understang what "Respone type and response message" mean? do you mean "Respone type and response message are correct" or smth like that?
        And("Respone type and response message", function () {
            context.body.code.should.be.equal(500);
            context.body.type.should.be.equal('unknown');
            context.body.message.should.be.equal('something bad happened');
        });
    });

    scenario("Update an existing order", function () {
        let order = orders.order01;
        let replacedOrder = {
            "id": order.id,
            "petId": 111,
            "quantity": 25,
            "shipDate": "2020-06-29T16:47:45.794",
            "status": "delivered",
            "complete": true
        };
        let context
        given("I have an existing order id", async function () {
            await client.postOrder(order);
        });
        when("replace the orderId with the above values", async function () {
            context = await client.postOrder(replacedOrder);
        });
        then("The return status is 200", function () {
            context.status.should.be.equal(200, 'Status for context');
        });
        and("each of order properties has been updated", function () {
            let replaceResponce = context.body;  // replaced
            expect(replaceResponce.id).to.be.equal(replacedOrder.id);
            expect(replaceResponce.petId).to.be.equal(replacedOrder.petId);
            expect(replaceResponce.quantity).to.be.equal(replacedOrder.quantity);
            expect(helper.dateTrim(replaceResponce.shipDate)).to.be.equal(helper.dateTrim(replaceResponce.shipDate));
            expect(replaceResponce.status).to.be.equal(replacedOrder.status);
            expect(replaceResponce.complete).to.be.equal(replacedOrder.complete);
        });
    });

    Scenario("Post order with shipDate format 'yyy-mm-dd' should have time set to T00:00:00.000+0000", function () {
        let order;
        Given("I have an existing order id", function () {
            order = orders.order03;
        });
        When("The return statis is 200", async function () {
            context = await client.postOrder(order);
            context.status.should.be.equal(200);
        });
        Then("the shipDate has a time set to all zeros", function () {
            expect(context.body.shipDate, "shiDate does not have time set to zero").to.include('T00:00:00.000+0000');
        });
    });

    Scenario("Calculate the current date", function () {
        let order;
        Given("I have an existing order id with unexistent day of month ", function () {
            order = orders.order04;
        });
        And("I create the order with existing order id and unexistent day of the month", async function () {
            context = await client.postOrder(order);
        });
        When("The return statis is 200", function () {
            context.status.should.be.equal(200, 'Status for context');
        });
        Then("The order date is calculated and saved correctly", function () {
            let response = context.body;
            expect(response.shipDate).to.be.contain('2020-06-01');
        });
        When("user posts the order with inexistent month", async function () {
            order.shipDate = '2020-13-01'
            context = await client.postOrder(order);
        });
        Then("The order date is calculated and saved correctly", function () {
            let response = context.body;
            expect(response.shipDate).to.be.contain('2021-01-01');
        });
    });
});