//import the sequelize module
const Sequelize = require("sequelize");

//connecting to the db
const sequelize = require("../util/db");

//defining the user model
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;