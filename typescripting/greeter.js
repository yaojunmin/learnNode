"use strict";
class Student {
    constructor(firstName, middleInitail, lastName) {
        this.firstName = firstName;
        this.middleInitail = middleInitail;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitail + ' ' + lastName;
    }
}
function greeter(person) {
    return 'hello,' + person.firstName + ' ' + person.lastName;
}
let user = new Student('jane', 'm.', 'user');
document.body.textContent = greeter(user);
const aaa = new Promise((resolve, reject) => {
    if (true) {
        resolve(123);
    }
    else {
        reject(false);
    }
});
