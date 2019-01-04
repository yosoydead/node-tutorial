// const fs = require('fs');
// const path = require('path');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );
  // const getProductsFromFile = cb => {
  //   fs.readFile(p, (err, fileContent) => {
  //     if (err) {
  //       cb([]);
  //     } else {
  //       cb(JSON.parse(fileContent));
  //     }
  //   });
  // };

//import the database object
const db = require("../util//db");

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });

    //reach out to the db to save the data
    //i dont specify the id because it is incremented automatically by the db engine
    //to prevent sql injection, i use this pattern here where i use placeholders for the VALUES statement
    //followed by an array of fields
    return db.execute("INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
    [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }

  //i dont need to work with callbacks anymore because i export promises with
  //my db model
  static fetchAll(cb) {
    //getProductsFromFile(cb);
    
    //with this i will fetch all the elements from the database
    return db.execute("SELECT * FROM products");
  }

  //i dont need to work with callbacks anymore because i export promises with
  //my db model
  static findById(id) {
  //   getProductsFromFile(products => {
  //     const product = products.find(p => p.id === id);
  //     cb(product);
  //   });
  }
};
