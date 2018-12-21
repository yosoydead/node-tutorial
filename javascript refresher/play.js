//string
//var name = "Bogdan";
const name = "Bogdan";

//int - numbers
//var age = 25;
let age = 25;

//bools
//var hasHobbies = true;
const hasHobbies = true;

//functions
//local params
function summarize(userName, userAge, hobbies){
    return "Name is " + userName + 
    " , age is " + userAge + 
    " and has hobbies " + hobbies;
}

//anonymous function
//does the same thing like the above one
const summ = function (userName, userAge, hobbies){
    return "Name is " + userName + 
    " , age is " + userAge + 
    " and has hobbies " + hobbies;
}

//arrow functions

//console.log(summ(name, age, hasHobbies));
console.log(summarize(name,age,hasHobbies));