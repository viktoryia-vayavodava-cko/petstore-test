const helperM = require('./helpMethods');

let pet1 = {
    "id": `${helperM.generateId()}`,
    "category": {
        "id": 166,
        "name": "mice"
    },
    "name": "Leila",
    "photoUrls": [
        "http://t3est.com",
        "http://t3est2.com"
    ],
    "status": "available"
};

let pet2 = {
    "id": `${helperM.generateId()}`,
    "category": {
        "id": 110,
        "name": "cats"
    },
    "name": "Panda",
    "photoUrls": [
        "http://test.com",
        "http://test2.com",
        "http://test3.com"
    ],
    "tags": [
        {
            "id": 5,
            "name": "good cat"
        },
        {
            "id": 6,
            "name": "bad cat"
        }
    ],
    "status": "sold"
};

let pet3 = {
    "id": `${helperM.generateId()}`,
    "category": {
        "id": 130,
        "name": "mice"
    },
    "name": "Leila",
    "photoUrls": [
        "http://t3est.com",
        "http://t3est2.com"
    ],
    "status": "sold"
}

let pet4 = {
    "id": `${helperM.generateId()}`,
    "category": {
        "id": 130,
        "name": "mice"
    },
    "name": "Leila",
    "photoUrls": [
        "http://t3est.com",
        "http://t3est2.com"
    ],
    "status": "pending"
}

let petInvalid = {
    "id": 'aa',
    "category": {
      "id": 0,
      "namdddde": "string"
    },
    "nasssme": "doggie",
    "photoUxxxrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "statdddus": "availabdddle"
}


// to export varialbe the export method should go at the end
module.exports = {
    pet1, pet2, pet3, pet4, petInvalid
}