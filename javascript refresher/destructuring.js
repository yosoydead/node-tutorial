const person = {
    name: "Bogdan",
    age: 25,
    //functions
    //this is an arrow function
    //this function will return undefined if i call only the function
    //without initializing its internal values
    greet: () => {
        //the this keyword reffers to the existing object
        //IE to only the values that this object contains
        console.log("Hi, I am " + this.name);
    },
    //this function will return the name set in the object
    greet2(){
        console.log("Hi, I am " + this.name);
    }
};

//by doing this, i can take an object as a param
//and whatever goes into { } and matches the objects keys
//can be printed/used however you want
const printName = ( {name, age} )=> {
    console.log(name, age);
}

//array destructuring
const hobbies = [ "sports", "cooking", 25, true];
//you can choose any name you want for the vars
//they will be pulled by their index in the array
const [hobby1, hobby2] = hobbies;

console.log(hobby1, hobby2);

printName(person);