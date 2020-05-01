const client = require('../client');
const orders = require('../orders');

feature.only('User is able to place an order', function () {

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
            context.status.should.be.equal(200); // assertion in Given step? ;)
        });

        then("verify that the all fields are populated", function () {
            let response = context.body;
            /*
             this one might be also useful for the future:
             expect(response).to.have.all.keys(["id", "petId", "quantity", "shipDate", "status", "complete"]);
             */
            expect(response.id).to.not.be.undefined.and.not.be.null; // maybe its better to validate the type of value instead? what do you think ?
            expect(response.petId).to.not.be.undefined.and.not.be.null;
            response.quantity.should.be.equal(20); // for future reference - i would suggest using  1 notaion (either expect().to.be.. or should.be..)
            expect(response.shipDate).to.not.be.undefined.and.not.be.null; // its crucial to verify that ship date is populated correctly. please add a test for that
            response.status.should.be.equal('placed');
            response.complete.should.be.equal(false);
        });
    });

    /* could you please create a test scenario with shipDate tests? 
    for example, i noticed that:
    1) if you Post  order object with  shipDate": "2020-05-01", the order will be created with 2020-05-01T00:00:00.000+0000
    2) if you Post  order object  shipDate having unexistent day of month ,e.g ": "2020-05-32", the order will be created with date calculated accordingly, so in my example its gonna be  2020-06-01T00:00:00.000+0000
    3) if you Post  order object  shipDate having unexistent  month ,e.g ": "2020-13-01", the order will be created with date calculated accordingly, so in my example the month will be added,e.g its gonna be   "2021-01-01T00:00:00.000+0000"

    you will need a helper method calculateShipDate or smth like that.
    if you struggle with the method, dont waste much time on it, just calculate expected dates manually and add to the assertions
    */

    scenario("Place a not valid order", function () {

        let order = orders.order02;

        given("an invalid order", async function () {
            context = await client.postOrder(order);
        });

        then("verify that all fields are undefined", function () {
            let response = context.body;
            expect(response.id).to.be.undefined;
            expect(response.petId).to.be.undefined;
            expect(response.quantity).to.be.undefined;
            expect(response.shipDate).to.be.undefined;
            expect(response.status).to.be.undefined;
            expect(response.complete).to.be.undefined;

            /*
            these 2 assertions might be also useful:
            response.should.not.have.any.keys ("id","petId","quantity","shipDate","status","complete")
            response.should.have.all.keys( "code", "type", "message")
            */

            // could you please also verify actual response received? e.g response.type, response.message?

        });
        and("The return status is 500", function () {
            context.status.should.be.equal(500);
        });

    });

    scenario("Update an existing order", function () {

        let order = orders.order01;

        let replacedorder = {
            "id": order.id,
            "petId": "111", // shouldn't the petId be integer?
            "quantity": 25,
            "shipDate": "2020-06-29T16:47:45.794",
            "status": "delivered",
            "complete": true
        };

        let context
        // why did you create 2 contexts if you are using only 1 of them in your test?

        given("I have the above existing order id", async function () {
            context = await client.postOrder(order);
        });

        when("replace the orderId with the above values", async function () {
            context = await client.postOrder(replacedorder);

        });
        then("The return status is 200", async function () {
            context.status.should.be.equal(200);
        });

        and("each of order properties has been updated", function () {
            let replaceresponce = context.body;  // replaced
            expect(replaceresponce.id).to.be.equal(replacedorder.id);
            expect(replaceresponce.petId).to.be.equal(replacedorder.petId);
            expect(replaceresponce.quantity).to.be.equal(replacedorder.quantity);
            /* you were having assertion error cuz actual date returned was 2020-06-29T16:37:45.794+0000. 
             i think its better not to count how many items are in the date, but count the needless stuff from the end, e.g.
             find the '+' sign and cut all starting from this '+' sign position =>
             replaceresponce.shipDate.slice(0,replaceresponce.shipDate.indexOf('+')).should.be.equal(replacedorder.shipDate)
             but of course the slice itself should be coming from helper method
            */

           expect(replaceresponce.shipDate.slice(0, 23)).to.be.equal(replacedorder.shipDate.slice(0, 23));
           expect(replaceresponce.status).to.be.equal(replacedorder.status);
            expect(replaceresponce.complete).to.be.equal(replacedorder.complete);
        });

    });

});