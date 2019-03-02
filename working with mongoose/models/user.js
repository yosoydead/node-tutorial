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

//export the user as an object that can be worked with
module.exports = mongoose.model("User", userSchema);