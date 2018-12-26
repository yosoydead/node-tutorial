//represent the model of the product: how it looks like
//image, title, description, etc

//const products = [];

//i will store all elements added to a file now
//import the file module
const fs = require("fs");

//use the path module to construct a path to where the file will live
const path = require("path");


//this is the shape of the product
class Product {

    //constructor
    constructor(title){
        //this objects title will be = to the title received in the constructor
        this.title = title;
    }

    //save function to add to the products array
    save() {
        //push the object created with this class into the array
        //products.push(this);

        //save the product to a file
        //construct the path for the file
        //process.mainModule.filename returns the path to where the server app is located
        //in that folder, another folder named whatever will have a file the where products
        //will be stored
        const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json"); 

        //read the contents of the file at path p
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err){
                //if no error, read the products from the file
                products = JSON.parse(fileContent);
            }
            products.push(this);
            //takes the array, converts it to json and write it in the folder
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    //return all elements of the list
    //i can use this function on the class, not on an instance
    //because i store data to json, i need to read that file first
    //to make it not return an error, i have to pass as argument a callback function
    //that executes once everything inside the fetch function is done
    static fetchAll(callback){
        const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json"); 
        fs.readFile(p, (err, fileContent)=>{
            //if i have an error it means that the file doesnt exist
            if(err){
                return callback([]);
            }
            //if i dont have an error, i have to return a parsed json string
            callback(JSON.parse(fileContent));
        });
    }

}

module.exports = Product;