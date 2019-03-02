//import mongoose
const mongoose = require("mongoose");

//this allows me to create a blueprint of the object i want to add to the db
const Schema = mongoose.Schema;

//to this schema, i need to add an object as parameter IE how the thing should look like
const productSchema = new Schema();