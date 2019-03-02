//import mongoose
const mongoose = require("mongoose");

//this allows me to create a blueprint of the object i want to add to the db
const Schema = mongoose.Schema;

//to this schema, i need to add an object as parameter IE how the thing should look like
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [ 
            {
                productId: {
                    //this is the type of id that mongodb uses to store stuff
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]

    }
});

//add my custom functions to the user
userSchema.methods.addToCart = function(product){
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product.id.toString();
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
        updatedCartItems.push({ 
            productId: product._id, 
            quantity: newQuantity 
        });
    }

    const updatedCart = {
        items: updatedCartItems
    };

    this.cart = updatedCart;

    return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    // const updatedCartItems = this.cart.items.filter(item => {
    //     return item.productId.toString() !== productId.toString();
    // });
    const updatedCartItems = this.cart.items.filter(item => {
        //copy in the new array all the items that don't have the id = to
        //the given one as argument
        return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
}

//export the user as an object that can be worked with
module.exports = mongoose.model("User", userSchema);