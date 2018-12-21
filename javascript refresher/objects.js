//objects work with key-value pairs
// <keyname> : <value>,
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

//this returns undefined
//person.greet();

//this returns the name of the object
person.greet2();
console.log(person);