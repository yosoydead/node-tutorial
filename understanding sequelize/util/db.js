//this file will be used to connect to the database and then return a connection object on which
//i will run queries

// //import the mysql module
// const mysql = require("mysql2");

// //this will contain a pool of connection allowing me to run multiple queries at the same time
// //i wont need to open the connection, query and close the connection for each operation i need to do
// //the pool takes as argument an object which contains information about where the db is located,
// //username/password used to connect, the name of the db to connect to
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: '1234'
// });

// //export the pool
// module.exports = pool.promise();

//import sequelize
const Sequelize = require("sequelize");

//this new object needs some parameters to get it going
//it needs the name of the database to connect to, the username to access it and the password
//the forth one is optional
//it creates a connection pool and connects to the db automatically and other stuff
const sequelize = new Sequelize("node-complete", "root", "1234", {dialect: "mysql", host: "localhost"});

module.exports = sequelize;