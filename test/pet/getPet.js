const client = require('../client')

feature.only('Verify the get functionality', function () {

    scenario.only("Verify that correct pet is returned by id provided", function () {

        let context;
        let id = Math.floor(Math.random() * 1000000)
        let pet = {
            "id": `${id}`,
            "category": {
                "id": 130,
                "name": "mice"
            },
            "name": "Leila",
            "photoUrls": [
                "http://t3est.com",
                "http://t3est2.com"
            ],
            "status": "new"
        }

        given("we create a pet with unique id ", async function () {
            context = await client.postPet(pet);
            id = context.body.id
        });

        when("we retrieve the pet by this id", async function () {
            context = await client.getPet(id);
        });

        then("the correct info is returned", function () {
            context.status.should.be.equal(200)
        });
        and("the correct info is returned", function () {
            context.body.id.should.be.equal(id)
            context.body.name.should.be.equal('Leila')
            context.body.category.name.should.be.equal('mice')
            // TO DO
            // change assertions accordingly and create new ones
        });
    })

})
