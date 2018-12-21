//string
var name = "Bogdan";

//int - numbers
var age = 25;

//bools
var hasHobbies = true;

//functions
//local params
function summarize(userName, userAge, hobbies){
    return "Name is " + userName + 
    " , age is " + userAge + 
    " and has hobbies " + hobbies;
}

console.log(summarize(name,age,hasHobbies));