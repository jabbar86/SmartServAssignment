const mongoose = require("mongoose");
let Product = require('./../models/productModels');
let data = require('./../data');
module.exports = {
    addproducts: async (req, res, next) => {
        console.log("Adding Products \n");
        let productData = data.products;
        for (var key in productData) {
            console.log(productData[key]);

            let value = productData[key];

            const product = new Product({
                subcategory: value.subcategory,
                title: value.title,
                price: Number(value.price),
                popularity: Number(value.popularity)
            })

            product.save(function (err, product) {
                if (err) {
                    console.log(err);
                }
            })
        }

    },
    searchusingtitle: async (req, res, next) => {
        try {

            console.log("Getting Data According to Title");
            var title = (req.body.title + " ").trim();

            if (!title) {
                return res.status(404).send({ code: 404, content: null, error: "Title Should Not be Null" })
            }

            console.log("Title \n", title);

            let productData = await Product.find({ title: title }).exec();

            console.log("Getting Data \n", productData);

            res.status(200).send({ code: 200, content: productData, error: null });
        } catch (err) {
            console.log(err);

            res.status(500).send({ code: 500, content: null, error: err.message });
        }
    },
    searchusingandclause: async (req, res, next) => {
        //AND : eg samsung AND galaxy should match both keywords
        try {
            let search_query = "samsung galaxy";
            search_query = search_query.toLowerCase().replace(/\s/g, '')

            console.log("Search Query \n", search_query);

            let productSnap = await Product.find({}).exec();

            //console.log("Product Snapshot\n", productSnap);

            if (productSnap.length === 0) {
                res.status(404).send({ code: 404, content: null, error: "No Record Found in Collection" });
            }
            else {

                let productArray = [];
                await Promise.all(productSnap.map(async (productData) => {

                    var product_title = productData.title;
                    product_title = product_title.toLowerCase().replace(/\s/g, '');

                    var searchProduct = product_title.indexOf(search_query);

                    if (searchProduct !== -1) {
                        console.log("Search Result \n", productData);
                        productArray.push(productData);
                    }

                }))
                    .then(() => {
                        console.log("Printing Result \n", productArray);
                        //console.log("Length \n", productArray.length);
                        res.status(200).send({ code: 200, content: productArray, error: null });
                    })
                    .catch((err) => {
                        console.log("error \n", err);
                        res.send(500).send({ code: 500, content: null, error: err.message });
                    })
            }
        } catch (err) {
            console.log(err);
            res.send(500).send({ code: 500, content: null, error: err.message });
        }
    },
    searchusingorclause: async (req, res, next) => {
        try {
            let search_query1 = "samsung";
            let search_query2 = "iphone";
            let productSnap = await Product.find({}).exec();

            //console.log("Product Snapshot\n", productSnap);

            if (productSnap.length === 0) {
                res.status(404).send({ code: 404, content: null, error: "No Record Found in Collection" });
            }
            else {

                let productArray = [];

                let ProductRegex = await Product.find({
                    $or: [
                        {
                            "title": {
                                $regex: search_query1,
                                $options: "ig"
                            }
                        },
                        {

                            "title": {
                                $regex: search_query2,
                                $options: "ig"
                            }
                        }
                    ]
                }).exec()

                console.log("Printing Result \n", ProductRegex);

                res.status(200).send({ code: 200, content: ProductRegex, error: null });

            }

        } catch (err) {
            console.log(err);
            res.send(500).send({ code: 500, content: null, error: err.message });

        }
    },
    searchusingmultipleclause: async (req, res, next) => {
        try {

            let search_query1 = "samsung";
            let search_query2 = "apple";
            let search_query3 = "ipad";
            let search_query4 = "micromax";

            let productSnap = await Product.find({}).exec();

            //console.log("Product Snapshot\n", productSnap);

            if (productSnap.length === 0) {
                res.status(404).send({ code: 404, content: null, error: "No Record Found in Collection" });
            }
            else {

                let ProductRegex1 = await Product.find({
                    $or: [
                        {
                            "title": {
                                $regex: search_query1,
                                $options: "ig"
                            }
                        },
                        {

                            "title": {
                                $regex: search_query2,
                                $options: "ig"
                            }
                        }
                    ],
                }).exec()

                console.log("Printing Result \n", ProductRegex1.length);

                let ProductRegex2 = await Product.find({

                    $and: [
                        {
                            "title": {
                                $regex: search_query2,
                                $options: "ig"
                            }
                        },
                        {
                            "title": {
                                $regex: search_query3,
                                $options: "ig"
                            }
                        }
                    ],
                }).exec()

                console.log("Printing Result \n", ProductRegex2.length);

                let ProductRegex3 = await Product.find({

                    $or: [
                        {
                            "title": {
                                $regex: search_query3,
                                $options: "ig"
                            }
                        },
                        {

                            "title": {
                                $regex: search_query4,
                                $options: "ig"
                            }
                        }
                    ],
                }).exec()

                console.log("Printing Result \n", ProductRegex3.length);

                let result = ProductRegex1.concat(ProductRegex2, ProductRegex3);

                res.status(200).send({ code: 200, content: result, error: null });

            }


        } catch (err) {
            console.log(err);
            res.status(500).send({ code: 500, content: null, error: err.message });
        }
    },
    filterquery1: async (req, res, next) => {
        try {
            let search_query1 = "samsung";
            let search_query2 = "apple";
            let search_query3 = "ipad";
            let search_query4 = "micromax";

            let productSnap = await Product.find({}).exec();

            //console.log("Product Snapshot\n", productSnap);

            if (productSnap.length === 0) {
                res.status(404).send({ code: 404, content: null, error: "No Record Found in Collection" });
            }
            else {

                let ProductRegex1 = await Product.find({
                    $or: [
                        {
                            "title": {
                                $regex: search_query1,
                                $options: "ig"
                            }
                        },
                        {

                            "title": {
                                $regex: search_query2,
                                $options: "ig"
                            }
                        }
                    ],
                    "price" : {
                        $lte : 10000
                    }
                }).exec()

                console.log("Printing Result \n", ProductRegex1.length);

                let ProductRegex2 = await Product.find({
                    $and: [
                        {
                            "title": {
                                $regex: search_query2,
                                $options: "ig"
                            }
                        },
                        {

                            "title": {
                                $regex: search_query3,
                                $options: "ig"
                            }
                        }
                    ],
                    "price" : {
                        $gt : 10000
                    }
                }).exec()

                console.log("Printing Result \n", ProductRegex2.length);

                let result = ProductRegex1.concat(ProductRegex2);

                res.status(200).send({ code: 200, content: result, error: null })

            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ code: 500, content: null, error: err.message });
        }
    },
    fetchproduct : async (req, res, next) => {
        try {
            let productSnap = await Product.find({}).sort({price : 1}).exec();

            //res.render("index.ejs", { responseParameter: productSnap });
            
            res.status(200).send({code : 200, content : productSnap, error : null});
        }catch (err) {
            console.log(err);
            res.status(500).send({ code: 500, content: null, error: err.message });
        }
    },
    fetchacctopopularity: async (req, res, next) => {
        try {
            let productSnap = await Product.find({}).sort({popularity : -1}).exec();

            
            res.status(200).send({code : 200, content : productSnap, error : null});
        }catch (err) {
            console.log(err);
            res.status(500).send({ code: 500, content: null, error: err.message });
        }
    }

}
