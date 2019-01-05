//this cart model will use the sequelize module and it will work with the db

//import sequelize
const Sequelize = require("sequelize");

//import the db connection
const sequelize = require("../util/db");

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = OrderItem;