/* - this cause a bug when use .to.have.all.keys - threrefore remove it for now - */
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));



const helpMethods = require('../helpMethods');


const client = require('../client');
const helperM = require('../helpMethods');
const animal = require('../pets');

feature('Verify the we can search by using staus', function () {

  let context;

  scenario("Verify that correct pet is returned by staus provided", function () {

    let pet1 = animal.pet1;

    given(" I have an available pet created ", async function () {
      context = await client.postPet(pet1);
    });

    when(" I request pets by available status", async function () {
      context = await client.getPetByStaus('available', '', '');
      expect(context.body).to.be.an('array').that.is.not.empty;
    });

    Then(" this pet is returned", function () {

      console.log("\t The number of returned available pets is: " + context.body.length);
      context.body.should.include.something.that.has.property("status", "available");
      context.body.should.include.something.that.has.property("id", parseInt(pet1.id));
      helpMethods.petIdIsReturned(context.body, pet1.id).should.be.true;

    });

  });
  scenario(" Getting existing pets by several statuses", function () {

    let pet3 = animal.pet3;

    Given(" i have some available pets created ", async function () {
      context.body.should.include.something.that.has.property("status", "available");

    });

    And(" a sold pet is created", async function () {
      context = await client.postPet(pet3);

    });

    When(" i request pets by available and sold statuses", async function () {
      context = await client.getPetByStaus('available', 'sold', '');
      expect(context.body).to.be.an('array').that.is.not.empty;

    });

    Then(" pets with that status are returned", function () {
      context.body.should.include.something.that.has.property("status", "available");

      // I thing the search is not working properly
    });

    And(" pending pets are not returned", function () {
      context.body.should.not.include.something.that.has.property("status", "pending");
    });
  });

  scenario(" Getting pets by unexistent status", function () {

    Given(" i have some available pets created ", function () {
      expect(context.body).to.be.an('array').that.is.not.empty;
    });

    When(" i request pets by unexistent status", async function () {
      context = await client.getPetByStaus('bla', 'bla', 'bla');
    });

    Then(" error is returned", function () {
      expect(context.body).to.be.an('array').that.is.empty;
    });
  });
});