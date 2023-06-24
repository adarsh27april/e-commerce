const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

productRouter.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

productRouter.route('/product/:id')
   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
   .get(getProductDetails)
// ∵ the api-endpoint will be same for delete & update product.

module.exports = productRouter;
