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
const summ2 = (userName, userAge, hobbies) =>{
    return ("Name is " + userName + 
    " , age is " + userAge + 
    " and has hobbies " + hobbies);
}

const add = (a,b)=>{
    return a+b;
}
// you can ommit using the return keyword
const add2 = (a,b) => a+b;

//if you have only one argument, you can ommit the () around the argument
const addOne = a => a+1;
//arrow function without arguments
const addRandom = ()=> 1 + 2;

//console.log(summ(name, age, hasHobbies));
console.log(add2(2,3));
//console.log(addOne(3));
console.log(summarize(name,age,hasHobbies));