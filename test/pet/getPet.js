const client = require('../client')

feature.only('Verify the get functionality', function () {

    scenario("Verify that correct pet is returned by id provided", function () {

        let context;
        let id;
        let pet;

        given("we have a pet id ", async function () {
             pet = {
                "category": {
                    "id": 10,
                    "name": "cats"
                },
                "name": "Leila",
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
                "status": "availablo"
            }

            context = await client.postPet(pet);
            console.log(context.body);
            id = context.body.id
            console.log(id);

        });

        when("we retrieve the pet by this id", async function () {
            context = await client.getPet(id);
        });

        then("the correct info is returned", function () {
            context.status.should.be.equal(200)
        });
        and("the correct info is returned", function () {
            context.body.id.should.be.equal(id)
            // context.body.status.should.be.equal('available')
            context.body.name.should.be.equal('doggie')
            context.body.category.name.should.be.equal('Dog')
            // TO DO
            // change assertions accordingly and create new ones
        });
    })

})
