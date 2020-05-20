
const helpMethods = require('./helpMethods');

module.exports = {
    getPet,
    postPet,
    deletePet,
    getPetByStaus,
    getPetByStaus1,
    postOrder,
    getOrder

}


function getPet(id) {
    return request("https://petstore.swagger.io/v2")
        .get(`/pet/${id}`)
        .send()
}

function postPet(body) {
    return request("https://petstore.swagger.io/v2")
        .post("/pet")
        .set("Content-Type", "application/json")
        .send(body)
}

function deletePet(id) {
    return request("https://petstore.swagger.io/v2")
        .delete(`/pet/${id}`)
        .set("Content-Type", "application/json")
        .send()

}

function getPetByStaus(status1, status2, status3) {

    let sendSting = helpMethods.generateSendString(status1,status2,status3);

    console.log('\t sending ' +  sendSting);

    return request("https://petstore.swagger.io/v2")
        .get(`/pet/findByStatus?${sendSting}`)
        .set("Content-Type", "application/json")
        .send()
}

// TO-DO this does not work - need to verify why
function getPetByStaus1(status1, status2, status3) {

    return request("https://petstore.swagger.io/v2")
        .get(`/pet/findByStatus?${status1,status2,status3}`)
        .set("Content-Type", "application/json")
        .send()
}


// STORE
function postOrder(body){

    return request("https://petstore.swagger.io/v2")
    .post("/store/order")
    .set("Content-Type", "application/json")
    .send(body)
}

function getOrder(oderId){



    return request("https://petstore.swagger.io/v2")
    .get(`/store/order/${oderId}`)
    .set("Content-Type", "application/json")
    .send()
}