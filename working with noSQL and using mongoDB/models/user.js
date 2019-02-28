//import the db client
const getDb = require("../util/db").getDb;

//import mongodb
const mongodb = require('mongodb');

class User {
    //create the user
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    //save that user to db
    save() {
        const db = getDb();

        //create a users collection
        return db.collection("users")
            .insertOne(this);
    }

    //i can do this because its a one to one relationship
    //and i can embed a document into mongodb with info
    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;

        //get a new array with all the items that are already in the cart
        const updatedCartItems = [...this.cart.items];

        //if i retrieve the quantity of an item from the cart
        if (cartProductIndex >= 0) {
            //increase the quantity
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;

            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            //if the item did not exist, push to the array a new object containing the new item added
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
        }



        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db.collection("users")
            .updateOne({ _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } });

    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db
            .collection("products")
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p, quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                });
            });
    }

    //find a user by an id
    static findById(userId) {
        const db = getDb();

        return db
            .collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) })
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