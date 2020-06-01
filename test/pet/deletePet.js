const client = require('../client');
const animal = require('../pets');

feature('Pet with id can be deleted', function () {

    scenario('the correct pet is deleted', function () {
        let context;
        let pet = animal.pet1;
        given("we delete a pet with id ", async function () {
            context = await client.postPet(pet);
            id = context.body.id
        });
        when("we delete the pet by id", async function () {
            context = await client.deletePet(id);
        });
        then("Status code is 200", function () {
            context.status.should.be.equal(200);
            context.statusCode.should.be.equal(200);
        });
        and("we call the deleted pet", async function () {
            context = await client.getPet(id);
        })
        and("we verify the pet is no longer available, 404 Error not found", function () {
            context.statusCode.should.be.equal(404);
            console.log(`\t --> Code: ${context.body.code} Type: ${context.body.type} message: ${context.body.message}`);
        })
    }); // end of scenario
});// end of feature