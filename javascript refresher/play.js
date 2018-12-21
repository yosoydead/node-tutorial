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

console.log(summarize(name,age,hasHobbies));