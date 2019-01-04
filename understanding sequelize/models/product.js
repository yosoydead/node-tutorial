//import the sequelize library
const Sequelize = require("sequelize");

//import my db connection
const sequelize = require("../util/db");

//the model which will be managed by sequelize
//first param is the name of the model/structure
//the second is the structure of the model IE fields
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;