//this cart model will use the sequelize module and it will work with the db

//import sequelize
const Sequelize = require("sequelize");

//import the db connection
const sequelize = require("../util/db");

//define the model of a cartItem
//a cart belongs to e single user but a cart can have many products in it
//each cartItem is a combination of a product and the ID of the cart in which that product lies
const CartItem = sequelize.define("cartItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;