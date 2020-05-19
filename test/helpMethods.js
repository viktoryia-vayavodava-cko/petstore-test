module.exports = {
    hasSpecifiElementInObject,
    generateId,
    compareElementInArray,
    generateSendString,
    petIdIsReturned,
    genrateTodaydateFormat,
    dateTrim,
    varifyDateTime
}

function generateId() {
    return id = Math.floor(Math.random() * 1000000);
}

function compareElementInArray(original, returned) {


    // method 01
    let i = 0;

    original.forEach(element => {

        element.should.be.equal(returned[i]);
        i++;
    });
    /*
        // method 02
        original.forEach(function (value, y) {
            value.should.be.equal(returned[y]);
        }); 
        */

}

function hasSpecifiElementInObject(element, name) {

    // OR push all in an arry

    hasit = false;
    element.forEach(el => {
        //   console.log('object :', el);
        if (el.name == name) {
            hasit = true;
            return true;
        } else {

        }

    });
    return hasit;

};

function generateSendString(status1, status2, status3) {

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

    return sendSting;
}

function petIdIsReturned(cBody, petId) {

    let item = cBody.findIndex(i => i.id === parseInt(petId));

    var valueAtIndex = cBody[item];

    return (parseInt(petId)) === (parseInt(valueAtIndex.id)) ? true : false

}


function genrateTodaydateFormat() {


    var todayDate = new Date().toISOString();
    return todayDate;
}

/**
 * Remove the part after + symbol.
 * @param {string} data just the string
 * @return {string} String truncated after + symbol
 */
function dateTrim(data) {

    let position = data.slice(0, data.indexOf('+'));

    return position;

};


function varifyDateTime(date) {
    

}