const client = require('../client');
const animal = require('../pets');

Feature('e2e - Create update delete a pet', function () {
    let response, context;
    let pet, id, body;
    Scenario("e2e - Create update delete a pet", async function () {
        // stepst to create a pet
        Given("we have a pet", function () {
            pet = animal.pet2;
        });
        When("we create the pet", async function () {
            context = await client.postPet(pet);
        });
        Then("Response code is 200", function () {
            context.status.should.be.equal(200);
        });
        And("I get the id of the just created pet", function () {
            id = context.body.id;
        });
        // stepst to update a pet
        And("I have a pet that will replace fields", function () {
            body = animal.petReplace;
        });
        When("I update pet fileds", async function () {
            response = await client.putPet(body);
        });
        Then("Response code is 200", function () {
            response.status.should.be.equal(200);
        });
        // stepst to delete a pet
        When("I delete the pet", async function () {
            response = await client.deletePet(id);
        });
        Then("Response code is 200", async function () {
            response.status.should.be.equal(200);
        });
    });
});