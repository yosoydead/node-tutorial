//arrays in js can store all kinds of types
const hobbies = [ "sports", "cooking", 25, true];

// for(let hobby of hobbies){
//     console.log(hobby);
// }

//map function returns a new array; doesnt edit the old one
console.log(hobbies.map( hobby => "Hobby: " + hobby));

console.log(hobbies);