//import the db client
const getDb = require("../util/db").getDb;

//import mongodb
const mongodb = require('mongodb');

class User {
    //create the user
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    //save that user to db
    save(){
        const db = getDb();

        //create a users collection
        return db.collection("users")
        .insertOne(this);
    }   

    //i can do this because its a one to one relationship
    //and i can embed a document into mongodb with info
    addToCart(product){
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // });
        //product.quantity = 1;
        const updatedCart = { items: [ { productId: new mongodb.ObjectId(product._id), quantity: 1} ] };
        const db = getDb();
        return db.collection("users")
        .updateOne( {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: updatedCart} });
        
    }

    //find a user by an id
    static findById(userId){
        const db = getDb();
        
        return db
        .collection("users")
        .findOne( {_id: new mongodb.ObjectId(userId)} )
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err)
        });
    }
}

module.exports = User;