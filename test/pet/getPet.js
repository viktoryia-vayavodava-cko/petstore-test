const client = require('../client')

feature('Verify the get functionality', function () {

    scenario("Verify that correct pet is returned by id provided", function () {

        let context;
        let id = Math.floor(Math.random() * 1000000);
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

        when("we retrieve the pet by id", async function () {
            context = await client.getPet(id);
        });

        then("Status code is 200", function () {
            context.status.should.be.equal(200)
        });
        and("the correct ped id is returned ", function () {
            context.body.id.should.be.equal(id);

            // TO DO
            // change assertions accordingly and create new ones
        });

        and("The correct pet name is returned", function () {
            context.body.name.should.be.equal(pet.name);

        });
        and("The correct id and name category is returned", function () {
            context.body.category.name.should.be.equal(pet.category.name);
            context.body.category.id.should.be.equal(pet.category.id);


        });
        and("the correct info are in the photoUrls array", function () {

            // method 01
            let i = 0;

            context.body.photoUrls.forEach(element => {

                element.should.be.equal(pet.photoUrls[i]);
                i++;
            });

            // method 02
            context.body.photoUrls.forEach(function (value, y) {
                value.should.be.equal(pet.photoUrls[y]);
            });
        });
        and ("The correct pet status is returnd",function(){
            context.body.status.should.be.equal(pet.status);
        })
    });
});
