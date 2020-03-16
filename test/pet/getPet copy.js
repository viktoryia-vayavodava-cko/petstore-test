const client = require('../client')

feature.skip('Verify the get functionality', function () {

    scenario("Verify that correct pet is returned by id provided", function () {

        let context;

        given("we have a pet id 14", function () {
        });

        when("we retrieve the pet by this id", async function () {
            context = await client.getPet();
        });

        then("the correct info is returned", function () {
            context.status.should.be.equal(200)
        });
        and("the correct info is returned", function () {
            context.body.id.should.be.equal(14)
            context.body.status.should.be.equal('available')
            context.body.name.should.be.equal('doggie')
            context.body.category.name.should.be.equal('Dog')
        });
    })

})
