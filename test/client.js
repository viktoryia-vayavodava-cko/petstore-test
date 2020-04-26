module.exports = {
    getPet,
    postPet,
    deletePet,
    getPetByStaus,
    getPetByStaus1

}

// TO DO 
// refactor the method to receive dynamic id

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

// TO DO 
// create function for deleting the pet

function deletePet(id) {
    return request("https://petstore.swagger.io/v2")
        .delete(`/pet/${id}`)
        .set("Content-Type", "application/json")
        .send()

}

function getPetByStaus(status1, status2, status3) {

    let sendSting;

    if (status1 == `` || status1 == null) {
        if (status2 == `` || status2 == null) {
            if (status3 == `` || status3 == null) { // 000
                console.log('all 3 parameters are empty')
                sendSting = `status=''`;
            } else {// 001
                sendSting = `status=${status3}`;
            }
        } else {
            if (status3 == `` || status3 == null) { // 010
                sendSting = `status=${status2}`;
            } else {  // 011

                sendSting = `status=${status2}&status=${status3}`;
            }
        }
    } else {
        if (status2 == `` || status2 == null) {
            if (status3 == `` || status3 == null) {//100
                sendSting = `status=${status1}`;
            } else { //101
                sendSting = `status=${status1}&status=${status3}`;
            }
        } else {
            if (status3 == `` || status3 == null) { //110
                sendSting = `status=${status1}&status=${status2}`;
            } else {  //111
                sendSting = `status=${status1}&status=${status2}&status=${status3}`;
            }
        }
    }

    console.log('\t sending ' +  sendSting);

    return request("https://petstore.swagger.io/v2")
        .get(`/pet/findByStatus?${sendSting}`)
        .set("Content-Type", "application/json")
        .send()
}



function getPetByStaus1(status1, status2, status3) {


    return request("https://petstore.swagger.io/v2")
        .get(`/pet/findByStatus?${status1,status2,status3}`)
        .set("Content-Type", "application/json")
        .send()
}
