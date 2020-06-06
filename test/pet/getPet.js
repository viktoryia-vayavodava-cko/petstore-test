const client = require('../client');
const animal = require('../pets');

Feature('Verify the get functionality', function () {
    Scenario("Verify that correct pet is returned by id provided", function () {
        let context;
        let pet;
        Given("we have a pet with unique id ", function () {
            pet = animal.pet3;
        });
        When("we create a pet with unique id ", async function () {
            context = await client.postPet(pet);
            id = context.body.id
        });
        And("we retrieve the pet by id", async function () {
            context = await client.getPet(id);
        });
        Then("Status code is 200", function () {
            context.status.should.be.equal(200)
        });
        And("the correct ped id is returned ", function () {
            context.body.id.should.be.equal(id);
        });
        And("The correct pet name is returned", function () {
            context.body.name.should.be.equal(pet.name);
        });
        And("The correct id and name category is returned", function () {
            context.body.category.name.should.be.equal(pet.category.name);
            context.body.category.id.should.be.equal(pet.category.id);
        });
        And("the correct info are in the photoUrls array", function () {
            context.body.photoUrls.should.be.an('array').that.does.include("http://t3est.com");
            context.body.photoUrls.should.be.an('array').that.does.include("http://t3est2.com");
        });
        And("The correct pet status is returnd", function () {
            context.body.status.should.be.equal(pet.status);
        })
    });
    scenario("Verify that pet is returned by specific large id", function () {
        let context;
        Given("We have a large id", function () {
            id = 423654262525634800n;
        });
        When("we retrieve the pet by id", async function () {
            context = await client.getPet(id);
        });
        Then("The pet is not found", async function () {
            context.body.message.should.be.equal("Pet not found")
        });
    });
});
