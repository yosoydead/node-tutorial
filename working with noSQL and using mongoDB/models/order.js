//this cart model will use the sequelize module and it will work with the db

//import sequelize
const Sequelize = require("sequelize");

//import the db connection
const sequelize = require("../util/db");

//an order is an inbetween table for the user to which the order belongs
//and multiple products that are part of the order
const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;