const express = require("express");
const { getAllProducts, createProduct,
   updateProduct, deleteProduct,
   getProductDetails, createUpdateProductReview,
   getAllProductReviews, deleteProductReviews
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

productRouter.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

productRouter.route('/admin/product/:id')
   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
// ∵ the api-endpoint will be same for delete & update product.

productRouter.route('/product/:id').get(getProductDetails)

productRouter.route("/review").put(isAuthenticatedUser, createUpdateProductReview)

productRouter.route("/reviews")
   .get(getAllProductReviews)
   .delete(isAuthenticatedUser, deleteProductReviews)


module.exports = productRouter;
