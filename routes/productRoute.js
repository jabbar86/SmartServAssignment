var express = require("express");
const router = express.Router();

//Importing Controller

var productController = require('./../controllers/product')

router
    .route('/addProducts')
    .post(productController.addproducts);

//******** Search Queries  */
router
    .route('/searchUsingTitle')
    .post(productController.searchusingtitle);

router
    .route('/searchUsingAndClause')
    .post(productController.searchusingandclause);

router
    .route('/searchUsingOrClause')
    .post(productController.searchusingorclause);

router
    .route('/searchUsingMultipleClause')
    .post(productController.searchusingmultipleclause);

router
    .route('/filterQuery1')
    .post(productController.filterquery1);

router
    .route('/fetchProduct')
    .get(productController.fetchproduct);

router
    .route('/fetchAccToPopularity')
    .get(productController.fetchacctopopularity);


module.exports = router;