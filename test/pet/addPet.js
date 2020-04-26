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
            context.body.name.should.be.equal ('Panda')
            // TO DO
            // add more assertions

        });
        and("has pictures of pets",function(){

        helpMethods.hasElementInArray(context.body.photoUrls)
          .should.be.equal(true);


        });
        and("and has the following picture http://test3.com",function(){

            helpMethods.hasSpecifiElementInArray(context.body.photoUrls ,"http://test3.com")
           .should.be.equal(true);
            
        });

        and("has tags", function(){

            helpMethods.hasElementInArray(context.body.tags)
          .should.be.equal(true);

        });
        and("has this tag name 'good cat'", function(){

            helpMethods.hasSpecifiElementInObject(context.body.tags, "good cat")
            .should.be.equal(true);
  
          });
    })

})
