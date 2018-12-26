//represent the model of the product: how it looks like
//image, title, description, etc

const products = [];

//this is the shape of the product
class Product {

    //constructor
    constructor(title){
        //this objects title will be = to the title received in the constructor
        this.title = title;
    }

    //save function to add to the products array
    save() {
        //push the object created with this class into the array
        products.push(this);
    }

    //return all elements of the list
    //i can use this function on the class, not on an instance
    static fetchAll(){
        return products;
    }

}

module.exports = Product;