//the mongodb connection
//const mongoConnect = require("../util/db");

//get access to the db
const getDb = require("../util/db").getDb;

const mongodb = require("mongodb");


//create the product "schema"
class Product {

    constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;

    }

    //this method will be used to save data to mongodb
    //but this needs the connection to mongodb
    save() {
        //access the db
        const db = getDb();

        //tell the db in which collection you want to insert data
        //if it doesnt exist, it will be created automatically
        //after collection, you can use insertOne() or insertMany([])
        //insertMany([]) takes an array of stuff you want to insert in the db
        //insert also returns a promise
        return db.collection("products").insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    //get all products from the db
    static fetchAll(){
        const db = getDb();
        //the collection has a find method that gets all the products
        //it can take arguments to filter the finding
        //find() returns everything and it does not return a promise, it returns a cursor
        //the cursor helps traverse the document
        return db.collection("products").find().toArray()
        .then( products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    //fetch a single product by id
    static findById(prodId){
        //get connection to the db
        const db = getDb();
        
        //filtering the find method so that it will return
        //an element with the given prodId
        //mongo stores the id as an object
        //i have to compare an object with the given id so it compares both objects
        return db.collection("products").find({_id: mongodb.ObjectId(prodId)})
            .next()
            .then( product => {
                console.log(product);
                return product;
            })
            .catch( err => {
                console.log(err);
            });
    }
}

module.exports = Product;