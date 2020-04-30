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

    scenario("updated an existing order id and change value and verify if apdated", function () {

        let order = orders.order01;

        let replacedorder = {
            "id": `${order.id}`,
            "petId": "111",
            "quantity": 25,
            "shipDate": "2020-06-29T16:37:45.794Z",
            "status": "delivered",
            "complete": true

        };

        let context1, context2;

        given("I have the above existing order id", async function () {

            context1 = await client.postOrder(order);

        });

        then("replace the orderId with the above values", async function () {

            context2 = await client.postOrder(replacedorder);

        });
        and("The return status is 200", async function () {
            context2.status.should.be.equal(200);

        });

        and("Verify if each order properties have been updated", function () {

            let replaceresponce = context2.body;  // replaced

            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            console.log(replacedorder);
            console.log(replaceresponce);
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");


            expect(replaceresponce.id).to.be.equal(parseInt(replacedorder.id));
            expect(replaceresponce.petId).to.be.equal(parseInt(replacedorder.petId));
            expect(replaceresponce.quantity).to.be.equal(parseInt(replacedorder.quantity));
            expect(replaceresponce.shipDate.slice(0, 23)).to.be.equal(replacedorder.shipDate.slice(0, 23));
            expect(replaceresponce.status).to.be.equal(replacedorder.status);
            expect(replaceresponce.complete).to.be.equal(replacedorder.complete);

        });

    });

});


// Date()

// single positive test
// simple negative test
// post method - updated the same id and change value and verify if apdated
// assert that all are updated correclty