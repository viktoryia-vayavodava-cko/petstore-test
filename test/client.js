module.exports = {
    getPet,
    postPet

}

// TO DO 
// refactor the method to receive dynamic id

function getPet(id) {
    return request('https://petstore.swagger.io/v2')
        .get(`/pet/${id}`)
        .send()
}


function postPet(body) {
    return request('https://petstore.swagger.io/v2')
        .post('/pet')
        .set("Content-Type", "application/json")
        .send(body)
}

// TO DO 
// create function for deleting the pet