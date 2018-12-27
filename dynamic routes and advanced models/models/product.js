const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  //i want to find a specific id and i also want a callback function that
  //triggers when that product's id is found
  static findById(id, callback){
    //get all the products. i need to read the entire file to find the id
    //this function returns a parsed array of products fron the JSON file
    getProductsFromFile( products => {
      //the find function takes as argument another function which will be executed on
      //each element of the array and returns that element for which this function returns TRUE
      const product = products.find( p => {
        return p.id === id;
      });
      callback(product);
    });
  }
};
