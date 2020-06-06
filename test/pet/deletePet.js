const client = require('../client');
const animal = require('../pets');

Feature('Pet with id can be deleted', function () {

    Scenario('the correct pet is deleted', function () {
        let context;
        let pet, id;
        Given("we have a pet id to be deleted", async function () {
            pet = animal.pet1;
            context = await client.postPet(pet);
            id = context.body.id
        });
        When("we delete the pet by id", async function () {
            context = await client.deletePet(id);
        });
        Then("Status code is 200", function () {
            context.status.should.be.equal(200);
            context.statusCode.should.be.equal(200);
        });
        When("we call the deleted pet", async function () {
            context = await client.getPet(id);
        })
        Then("we verify the pet is no longer available, with the correct code type and message", function () {
            context.statusCode.should.be.equal(404);
            context.body.code.should.be.equal(1);
            context.body.type.should.be.equal('error');
            context.body.message.should.be.equal('Pet not found');
        })
    });
});
