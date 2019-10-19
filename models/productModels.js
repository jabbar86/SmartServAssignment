const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    subcategory : {
        type : String
    },
    title : {
        type : String
    },
    price : {
        type : Number
    },
    popularity : {
        type : Number
    }
});

const Product = mongoose.model("product", productSchema,"product");

module.exports = Product;