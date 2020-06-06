const client = require('../client');
const helpMethods = require('../helpMethods');
const animal = require('../pets');

Feature('Verify the post functionality', function () {

  Scenario("Add a new pet to the store", function () {
    let context;
    let pet;
    Given("we have a pet", function () {
      pet = animal.pet2;
    });
    When("we create the pet", async function () {
      context = await client.postPet(pet);
    });
    Then("the correct pet is created", function () {
      context.status.should.be.equal(200)
      context.body.name.should.be.equal('Panda')
    });
    And("has pictures of pets", function () {
      context.body.should.have.property("photoUrls").and.is.not.empty;
    });
    And("and has a picture", function () {
      console.log("\t--> " + "Has the following picture 'http://test3.com' ");
      context.body.photoUrls.should.be.an('array').that.does.include("http://test3.com");
    });
    And("has tags", function () {
      context.body.should.have.property("tags").and.is.not.empty;
    });
    And("tag has a specific name 'good cat'", function () {
      helpMethods.hasSpecifiElementInObject(context.body.tags, "good cat")
        .should.be.equal(true);
    });
  })

  Scenario("Add an invalid pet to the store", function () {
    let response, context;
    let pet;
    given("I have an invalid pet", function () {
      pet = animal.petInvalid;
    });
    When("I create an invalid pet", async function () {
      context = await client.postPet(pet);
    });
    Then("Response is 500", function () {
      context.status.should.be.equal(500);
    });
  });
})