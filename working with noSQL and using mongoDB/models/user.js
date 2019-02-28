//import the db client
const getDb = require("../util/db").getDb;

//import mongodb
const mongodb = require('mongodb');

class User {
    //create the user
    constructor(username, email){
        this.name = username;
        this.email = email;
    }

    //save that user to db
    save(){
        const db = getDb();

        //create a users collection
        return db.collection("users")
        .insertOne(this);
    }   

    //find a user by an id
    static findById(userId){
        const db = getDb();
        
        return db
        .collection("users")
        .findOne( {_id: new mongodb.ObjectId(userId)} )
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err)
        });
    }
}

module.exports = User;