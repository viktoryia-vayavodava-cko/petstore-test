const client = require('../client')

feature.skip('Verify the post  functionality', function () {

    scenario("Verify that correct pet is created", function () {

        let context;

        let pet = {
            "category": {
                "id": 10,
                "name": "cats"
            },
            "name": "Lucy",
            "photoUrls": [
                "http://test.com",
                "http://test2.com"
            ],
            "tags": [
                {
                    "id": 5,
                    "name": "good cat"
                }
            ],
            "status": "available"
        };

        given("we have a pet data", function () {
        });

        when("we create the pet with data provided", async function () {
            context = await client.postPet(pet);
        });

        then("the correct pet is created", function () {
            context.status.should.be.equal(200)
            context.body.name.should.be.equal ('Lucy')
            // TO DO
            // add more assertions

        });
    })

})
