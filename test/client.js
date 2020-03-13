module.exports = {
    getPet,
    postPet

}

// TO DO 
// refactor the method to receive dynamic id

function getPet() {
    return request('https://petstore.swagger.io/v2')
        .get('/pet/14')
        .send()
}


function postPet(body) {
    return request('https://petstore.swagger.io/v2')
        .post('/pet')
        .send(body)
}