module.exports = {
    hasSpecifiElementInObject,
    generateId,
    generateSendString,
    petIdIsReturned,
    genrateTodaydateFormat,
    dateTrim,
    findInString
}

/**
 * Generate an Id of 6 digits
 * @returns {number} a number of 6 digits
 */
function generateId() {
    return id = Math.floor(Math.random() * 1000000);
}

/**
 * Returns true if an element exists in the object
 * @param {Object} element is the object where to search
 * @param {string} name is the string to search in the object
 * @returns {boolean} true if the object has the string
 */
function hasSpecifiElementInObject(element, name) {

    hasit = false;
    element.forEach(el => {
        if (el.name == name) {
            hasit = true;
            return true;
        } else {
        }
    });
    return hasit;

};
/**
 * If one or two of the 3 parameter is or are empty 
 * this function will generate a correct send string
 * @param {string} status1 one of the 3 status
 * @param {string} status2 one of the 3 status
 * @param {string} status3 one of the 3 status
 */
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
/**
     * Check it the Pet ID exists in the body
     * @param {object} cBody is the body
     * @param {number} petId the id 
     * @returns {boolean} true if pet id exists
     */
function petIdIsReturned(cBody, petId) {
    let item = cBody.findIndex(i => i.id === parseInt(petId));
    var valueAtIndex = cBody[item];
    return (parseInt(petId)) === (parseInt(valueAtIndex.id)) ? true : false
}
/**
     * Generate today date using ISO
     * @example: 2011-10-05T14:48:00.000Z
     * @returns {Date} the date in ISO format
     */
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
}

/**
     * Check if a string exists withing another string
     * st2 is the string to search
     * st1 is the complete string
     * @param {string} st1 to search
     * @param {string} st2 complete 
     * @returns {number} 0 if true -1 if false
     */
function findInString(/**String*/ st1, /**String*/ st2) {
    return st1.search(st2);

}