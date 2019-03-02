//import mongoose
const mongoose = require("mongoose");

//this allows me to create a blueprint of the object i want to add to the db
const Schema = mongoose.Schema;

//to this schema, i need to add an object as parameter IE how the thing should look like
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        //the type of the userId will be a reference to a user
        type: Schema.Types.ObjectId,
        //this has to be the model you want to relate to
        ref: "User",
        required: true
    }
});

//basically, this exports an object which can be used to work with the data
//and that object is based on the Schema defined above
//it also creates the collection in the db if it doesn't exist
module.exports = mongoose.model("Product", productSchema);