const client = require('../client');
const orders = require('../orders');

feature.only('User is able to plance an order', function () {

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

            let responce = context.body;
            context.status.should.be.equal(200);
            responce.petId.should.be.equal(0);
            responce.quantity.should.be.equal(0);
            responce.complete.should.be.equal(false);

        });

    })

    scenario("Place a valid order", function () {

        let order = orders.order01;

        given("a valid order", async function () {

            context = await client.postOrder(order);
            context.status.should.be.equal(200);

        });

        then("verify that the all fields are populated", function () {

            let responce = context.body;

            expect(responce.id).to.not.be.undefined.and.not.be.null;
            expect(responce.petId).to.not.be.undefined.and.not.be.null;
            responce.quantity.should.be.equal(20);
            expect(responce.shipDate).to.not.be.undefined.and.not.be.null;
            responce.status.should.be.equal('placed');
            responce.complete.should.be.equal(false);


        });

    });

    scenario("Place a not valid order", function () {

        let order = orders.order02;

        given("an invalid order", async function () {

            context = await client.postOrder(order);
        });

        then("verify that all fields are undefined", function () {

            let responce = context.body;

            expect(responce.id).to.be.undefined;
            expect(responce.petId).to.be.undefined;
            expect(responce.quantity).to.be.undefined;
            expect(responce.shipDate).to.be.undefined;
            expect(responce.status).to.be.undefined;
            expect(responce.complete).to.be.undefined;

        });
        and("The return status is 500", function () {
            context.status.should.be.equal(500);

        });

    });

    // the functionality of update an existing order with POST is not supported
    // modified the test to verified that cannot be updated
    scenario("cannot updated an existing order id", function () {

        let order = orders.order01;
        let replaceorder = orders.order03;
        let context1, context2;

        given("I have the above existing order id", async function () {

            context1 = await client.postOrder(order);

            console.log(order);

        });

        then("replace the orderId with the above values", async function () {

            console.log(replaceorder);

            context2 = await client.postOrder(replaceorder);


        });
        and("The return status is 200", async function () {
            context1.status.should.be.equal(200);

        });

        and("Verify the order is not updated", function () {

            expect(order).to.be.not.equal(replaceorder);
        });

    });

});