const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route('/product/new').post(createProduct)

productRouter.route('/product/:id')
   .put(updateProduct)
   .delete(deleteProduct)
   .get(getProductDetails)
// since the url will be same for delete & update product.

module.exports = productRouter;