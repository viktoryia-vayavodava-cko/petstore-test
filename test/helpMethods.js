module.exports = {
    hasElementInArray,
    hasSpecifiElementInArray,
    hasSpecifiElementInObject

}

function hasElementInArray(element) {

    let arrayToCheck = element;
    let hasit = false;

    if (arrayToCheck === undefined || arrayToCheck.length == 0) {
        hasit = false;
    } else
        hasit = true;

    return hasit;
};

function hasSpecifiElementInArray(element, name) {

    let arrayToCheck = element;
    let hasit = false;

    arrayToCheck.forEach(element => {

        if (element == name) {
            hasit = true;
        } else {
            hasit = false
        };
    });

    return hasit;
}


function hasSpecifiElementInObject(element, name) {

 //   console.log('object :', element);
 //   console.log('name :', name);

    hasit = false;
    element.forEach(el => {
     //   console.log('object :', el);
        if (el.name == name) {
            hasit = true;
            return true;
        }else {
         
        }
        
    });
    return hasit;

};