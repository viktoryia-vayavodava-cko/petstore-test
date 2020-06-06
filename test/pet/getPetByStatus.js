var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

const helpMethods = require('../helpMethods');
const client = require('../client');
const animal = require('../pets');

Feature('Verify the we can search by staus', function () {
  let context, pet1;

  beforeEachScenario("We have a pet to search", async function () {
    pet1 = animal.pet1;
    context = await client.postPet(pet1);
  });


  Scenario.only("Verify that correct pet is returned by staus", function () {

    Given("I have an available pet to search ", function () {
      // available on before each scenario
    });
    When("I request pets by available status", async function () {
      context = await client.getPetByStaus('available', '', '');
    });
    Then("pet is returned", function () {
      expect(context.body).to.be.an('array').that.is.not.empty;
      context.body.should.include.something.that.has.property("status", "available");
      context.body.should.include.something.that.has.property("id", parseInt(pet1.id));
      helpMethods.petIdIsReturned(context.body, pet1.id).should.be.true;
    });

  });
  Scenario("Getting existing pets by several statuses", function () {
    let pet3 = animal.pet3;
    Given("i have some available pets created ", function () {
      context.body.should.include.something.that.has.property("status", "available");
    });
    And("a pet with sold status is created", async function () {
      context = await client.postPet(pet3);
    });
    When("i request pets by available and sold statuses", async function () {
      context = await client.getPetByStaus('available', 'sold', '');
    });
    Then("pets with that status are returned", function () {
      expect(context.body).to.be.an('array').that.is.not.empty;
      context.body.should.include.something.that.has.property("status", "available");
      // I thing the search is not working properly
    });
    And("pending pets are not returned", function () {
      context.body.should.not.include.something.that.has.property("status", "pending");
    });
  });

  Scenario("Getting pets by nonexistent status", function () {
    Given("i have some available pets created ", function () {
    });
    When("i request pets by nonexistent status", async function () {
      context = await client.getPetByStaus('bla', 'bla', 'bla');
    });
    Then("error is returned", function () {
      expect(context.body).to.be.an('array').that.is.empty;
    });
  });
});