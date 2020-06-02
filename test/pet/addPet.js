const client = require('../client');
const helpMethods = require('../helpMethods');
const animal = require('../pets');

feature('Verify the post functionality', function () {

  scenario("Add a new pet to the store", function () {
    let context;
    let pet = animal.pet2;
    given("we have a pet data", function () {
    });
    when("we create the pet with data provided", async function () {
      context = await client.postPet(pet);
    });
    then("the correct pet is created", function () {
      context.status.should.be.equal(200)
      context.body.name.should.be.equal('Panda')
    });
    and("has pictures of pets", function () {
      context.body.should.have.property("photoUrls").and.is.not.empty;
    });
    and("and has a picture", function () {
      console.log("\t--> " + "Has the following picture 'http://test3.com' ");
      context.body.photoUrls.should.be.an('array').that.does.include("http://test3.com");
    });
    and("has tags", function () {
      context.body.should.have.property("tags").and.is.not.empty;
    });
    and("has this tag name 'good cat'", function () {
      helpMethods.hasSpecifiElementInObject(context.body.tags, "good cat")
        .should.be.equal(true);
    });
  })
})

// i wonder why havent we thought of negative test cases here.. can you add one please?