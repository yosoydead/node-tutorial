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

    deteleItemFromCart(productId) {
        //first of all, copy the entire cart
        //except the one i want to remove
        const updatedCartItems = this.cart.items.filter(item => {
            //copy in the new array all the items that don't have the id = to
            //the given one as argument
            return item.productId.toString() !== productId.toString();
        });

        //update the db
        const db = getDb();

        return db.collection("users")
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name,
                    email: this.email
                }
            };
            //create a new collection that stores the orders and insert one new order
            //that contains all the items from the cart
            return db.collection("orders").insertOne(order);


        }).then(result => {
            //if the operation is successful, clear the cart from the page
            //and from the db
            //this means that the cart will be an empty array
            this.cart = { items: [] }

            return db.collection("users")
                .updateOne(
                    { _id: new mongodb.ObjectId(this._id) },
                    { $set: { cart: { items: [] } } }
                );
        });
    }

    getOrders() {
        const db = getDb();

        //search in the db for a field called user with a property of _id
        //and compare it to the current users id
        return db.collection("orders")
            .find( {"user._id": new mongodb.ObjectId(this._id)} )
            .toArray();
    }
}

module.exports = User;