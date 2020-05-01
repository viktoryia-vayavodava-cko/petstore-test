const helperM = require('./helpMethods');

let shipDate = helperM.genrateTodaydateFormat();

const status = {
    PLACED: 'placed',
    APPROVED: 'approved',
    DELIVERED: 'delivered'
}

// Valid order
let order01 = {
    /* as per orders schema, id and petId are integers, to there is no need 
    to create order object with ` ` (it automatically turns int into string)
    having that changed you won't need to do parseInt in your tests 
    */
    "id": helperM.generateId(),
    "petId": helperM.generateId(),
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

module.exports = {
    order01, order02
}