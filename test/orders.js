const helperM = require('./helpMethods');

let shipDate = helperM.genrateTodaydateFormat();

const status = {
    PLACED: 'placed',
    APPROVED: 'approved',
    DELIVERED: 'delivered'
}

// Valid order
let order01 = {
    "id": `${helperM.generateId()}`,
    "petId": `${helperM.generateId()}`,
    "quantity": 20,
    "shipDate": `${shipDate}`,
    "status": status.PLACED,
    "complete": false

};

// Not valid order - status and shipDate are incorrect
order02 =
{
    "id": 0,
    "petId": 0,
    "quantity": 0,
    "shipDate": "2020-04-3:46:43.301Z",
    "status": "placedffff",
    "complete": true
}

// Fix values
let order03 = {
    "id": `${helperM.generateId()}`,
    "petId": "011",
    "quantity": 25,
    "shipDate": `${shipDate}`,
    "status": status.DELIVERED,
    "complete": true

};

module.exports = {
    order01, order02 ,order03
}