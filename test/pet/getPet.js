const client = require('../client');
const helperM = require('../helpMethods');
const animal = require('../pets');


feature('Verify the get functionality', function () {

    scenario("Verify that correct pet is returned by id provided", function () {

        let context;
        let pet = animal.pet3;

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
        });

        and("The correct pet name is returned", function () {
            context.body.name.should.be.equal(pet.name);

        });
        and("The correct id and name category is returned", function () {
            context.body.category.name.should.be.equal(pet.category.name);
            context.body.category.id.should.be.equal(pet.category.id);
        });
        and("the correct info are in the photoUrls array", function () {

            helperM.compareElementInArray(context.body.photoUrls, pet.photoUrls);
        });
        and("The correct pet status is returnd", function () {
            context.body.status.should.be.equal(pet.status);
        })
    });
    
    scenario("Verify that pet is returned by specific id", function () {

        when("we retrieve the pet by id", async function () {
            id=423654262525634800;
            context = await client.getPet(id);
            console.log("Here is your pet: ");
            console.log(context.body);
        });
    });
});
