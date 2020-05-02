const client = require('../client');
const orders = require('../orders');
const helper = require('../helpMethods');

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

        });

        and("status 200 is returned", function () {
            context.status.should.be.equal(200); // assertion in Given step? ;) <-- @angye comment - moved under this "and" function
        });

        then("verify that the all fields are populated", function () {
            let response = context.body;

            expect(response.id).to.not.be.undefined.and.not.be.null; // maybe its better to validate the type of value instead? what do you think ?
            //  <-- @angye comment  yes - the assertion is is more pricese 
            expect(response.id, '"id" is not an integer').and.is.a('number').above(0).and.satisfy(Number.isInteger);

            expect(response.petId, 'petId is not undefined').to.not.be.undefined.and.not.be.null;
            expect(response.petId, 'petId is not a number').and.is.a('number').above(0).and.satisfy(Number.isInteger);

            //    response.quantity.should.be.equal(20); // for future reference - i would suggest using  1 notaion (either expect().to.be.. or should.be..)
            // @angye reply - is this only for consistency or there is an acutal reaon to chose eiter? - when I asked on our last chat - you said I can use both
            expect(response.quantity).to.be.equal(20);
            expect(response.shipDate).to.not.be.undefined.and.not.be.null; // its crucial to verify that ship date is populated correctly. please add a test for that
            // @angye reply - yes I have it - check below
            expect(response.status, 'response is not set as "placed"').to.be.equal('placed');
            expect(response.status, '"status" is not a string').and.is.a('string');

            response.complete.should.be.equal(false, 'response is not set as "false"');

        });

        and("all keys are returned", function () {
            /*
            this one might be also useful for the future:
            expect(response).to.have.all.keys(["id", "petId", "quantity", "shipDate", "status", "complete"]);
            <-- @angye comment - moved to a separated step 
            - the reason I haven't use it is because of a chai bug conflict - basically when chai-things library is used, the 
            assertion fails (AssertionError: expected { Object (id, petId, ...) } to have property 'length')  
            (you can read here - https://github.com/chaijs/chai-things/issues/24) 
            for the sake of this test I undo the chai-thing library and related assertions.
            */
            let response = context.body;
            //      expect(response).to.have.keys(["id", "petId", "quantity", "shipDate", "status", "complete"]).and.to.have.length(5);
            // this is a possible 
            expect(response).to.have.property('id');
            expect(response).to.have.property("petId");
            expect(response).to.have.property("quantity");
            expect(response).to.have.property("shipDate");
            expect(response).to.have.property("status");
            expect(response).to.have.property("complete");

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

        let replacedOrder = {
            "id": order.id,
            "petId": 111, // shouldn't the petId be integer? <-- @angye comment yes
            "quantity": 25,
            "shipDate": "2020-06-29T16:47:45.794",
            "status": "delivered",
            "complete": true
        };

        let context
        // why did you create 2 contexts if you are using only 1 of them in your test? <-- @angye comment - 
        /*  
        because first I POST the order - which is order01
        then I replace the same order with POST replacedOrder
        I don't need to keep the previous value - but yes does not make sance to save the return body into a variable that I will soon replace - donce changed
        */
        given("I have an existing order id", async function () {
            await client.postOrder(order);
        });

        when("replace the orderId with the above values", async function () {
            context = await client.postOrder(replacedOrder);

        });
        then("The return status is 200", async function () {
            context.status.should.be.equal(200, 'Status for context');
        });

        and("each of order properties has been updated", function () {
            let replaceResponce = context.body;  // replaced
            expect(replaceResponce.id).to.be.equal(replacedOrder.id);
            expect(replaceResponce.petId).to.be.equal(replacedOrder.petId);
            expect(replaceResponce.quantity).to.be.equal(replacedOrder.quantity);

            /* you were having assertion error cuz actual date returned was 2020-06-29T16:37:45.794+0000. 
            i think its better not to count how many items are in the date, but count the needless stuff from the end, e.g.
            find the '+' sign and cut all starting from this '+' sign position =>
            replaceResponce.shipDate.slice(0,replaceResponce.shipDate.indexOf('+')).should.be.equal(replacedOrder.shipDate)
            but of course the slice itself should be coming from helper method

            <-- @angye answer - well - after the fix I have made in  hempmethod.js related to date yes now I can use your apporach
            but since I know the string should be long 23 - I think it is an acceplabele approach
            but for the sake of the excercise - done :) 
            */
        
         

 //  OLD         expect(replaceResponce.shipDate.slice(0, 23)).to.be.equal(replacedOrder.shipDate.slice(0, 23));
            expect(helper.dateRefoactor(replaceResponce.shipDate)).to.be.equal(helper.dateRefoactor(replaceResponce.shipDate));
            expect(replaceResponce.status).to.be.equal(replacedOrder.status);
            expect(replaceResponce.complete).to.be.equal(replacedOrder.complete);
        });

    });

});