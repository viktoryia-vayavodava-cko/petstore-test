module.exports = {
    pet1
}

function pet1() {
    let id = Math.floor(Math.random() * 1000000);
    let pet = {
        "id": `${id}`,
        "category": {
            "id": 130,
            "name": "mice"
        },
        "name": "Leila",
        "photoUrls": [
            "http://t3est.com",
            "http://t3est2.com"
        ],
        "status": "new"
    }
    return pet;
}