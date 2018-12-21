//arrays in js can store all kinds of types
const hobbies = [ "sports", "cooking", 25, true];

// for(let hobby of hobbies){
//     console.log(hobby);
// }

//map function returns a new array; doesnt edit the old one
console.log(hobbies.map( hobby => "Hobby: " + hobby));

//this cppies an array
//takes arguments to narrow the range of elements copied
const coppiedArray = hobbies.slice();

//the spread operator returns the elements of an array/object and
//puts them into the new variable you want
//here, i copied all the elements of the hobbies into a new array
const copiedAgain = [...hobbies];
console.log(copiedAgain);

//here i copy an object
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
const personCopy = {...person};
console.log(personCopy);

//the rest operator takes all the arguments given as params
//and returns them; args returns an array
//... depend where you use it
const toArray = (...args) => {
    return args;
}
console.log(toArray(1,2,3,4,5,6,7,8,9));

console.log(hobbies);