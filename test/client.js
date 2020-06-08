
const helpMethods = require('./helpMethods');

module.exports = {
    getPet,
    postPet,
    deletePet,
    getPetByStaus,
    putPet,
    postOrder,
    getOrder,
    deleteOrder
}
// PET
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
function putPet(body) {
    return request("https://petstore.swagger.io/v2")
        .put(`/pet`)
        .set("Content-Type", "application/json")
        .send(body)
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

function deleteOrder(oderId){
    return request("https://petstore.swagger.io/v2")
    .delete(`/store/order/${oderId}`)
    .set("Content-Type", "application/json")
    .send()
}