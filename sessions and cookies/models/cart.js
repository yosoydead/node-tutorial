//this cart model will use the sequelize module and it will work with the db

//import sequelize
const Sequelize = require("sequelize");

//import the db connection
const sequelize = require("../util/db");

//define the model of a cart
//a cart belongs to e single user but a cart can have many products in it
const Cart = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;