const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice){
        //fetch the prev cart
        fs.readFile(p, (err, fileContent) => {
            //if we got an error, the cart doesn't exist yet
            //so we need to create it
            //else, there is an existing cart
            let cart = { products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }

            //see if we have that product already
            const existingProductIndex = cart.products.findIndex( prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            //add a new product or increase the quantity
            //if we have an existing product, increase the quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                //if we have a new product
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice= cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }


}