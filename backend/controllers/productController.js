/**
 * Controller me bas functions hote hai 
 * jo specific route hit hone par call karne hote hai Router se.
 */
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const API_Features = require("../utils/apiFeatures");
const API_Features = require("../utils/apiFeatures")


// POST - Create Product -Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

   req.body.user = req.user.id
   // note that ∵ to come to createProduct route it will have to pass first to isAuthenticatedUser middleware
   // which will provide the req.user the data of the user so here we will have access to it.

   const product = await productModel.create(req.body);
   // console.log('product added successfully to DB :\n', product);
   res.status(201).json({
      success: true,
      message: `Product created Successfully`,
      product
   })
})
// note

// GET - all products - Admin
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
   const resultPerPage = 5;
   const productCount = await productModel.countDocuments();
   // It will provide us the number of elements in the Database,
   // We can also pass a filter object to get num of objs which match the filter condition.

   const apiFeature = new
      API_Features(productModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
   const products = await apiFeature.query;
   res.status(200).json({
      success: true,
      message: `List of ${products.length} product(s) on this page`,
      total_product_count: productCount,
      page_num: Number(req.query.page),
      products
   })
})

// PUT - update Product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
   let product = productModel.findById(req.params.id);
   console.log(req.params.id);
   // console.log(product);
   if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
   }

   // findByIdAndUpdate : 1st arg : what is to be found, 2nd arg : the final update to be done.
   // note that jo `keys` mai req.body me pass karunga sirf uski values hi update hogi remaining keys ki value unaffected rahegi.
   product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //true-> updated document will be returned; false(default)-> `original` document before the update will be returned
      runValidators: true, // determines whether to run the model's validation logic during the update operation
      useFindAndModify: false //This property indicates whether to use the `findOneAndUpdate()` method instead of the deprecated `findAndModify()` method. Setting it to false ensures that the `findOneAndUpdate()` method is used.
   })

   res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product
   })
})

//DELETE Product - Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
   const product = await productModel.findById(req.params.id);
   if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
   }
   // await product.remove();
   // product.remove() is depreciated from mongoose ver 7
   await product.deleteOne() // ∵ product is a instance generated by productModel.find() method, so it contains all these methods.

   res.status(200).json({
      success: true,
      message: "Product deleted successfully"
   })
})

// GET get single product details - ALL
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
   const product = await productModel.findById(req.params.id);
   if (!product) {
      // return res.status(500).json({
      //    success: false,
      //    message: "Product not found"
      // })
      return next(new ErrorHandler("Product Not Found", 404));
   }

   res.status(200).json({
      success: true,
      message: "Product found successfully",
      product
   })
})


// Create New Review or Update Review 
exports.createUpdateProductReview = catchAsyncErrors(async (req, res, next) => {
   // -> i.e., if a user is creating reviwe for first time then it will create review or else it will update the previous review
   const { rating, comment, productId } = req.body
   const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment, productId
   }
   const product = await productModel.findById(productId)
   // it will return us an instance of what we have in the DB => this is allowed by the MONGOOSE package and not MONGODB.
   // which we will update here and then when it is saved then the actual DB is updated.
   const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
   )// NOTE THE SYNTAX, review is an array which has to be updated, WE ARE USING find() on the array just like that.
   // use find or foreach
   if (isReviewed) {
      product.reviews.forEach(rev => {
         if (rev.user.toString() === req.user._id.toString()) {
            rev.rating = rating;
            rev.comment = comment;
         }
      })
   } else {
      product.reviews.push(review)
      product.num_of_reviews = product.reviews.length
   }
   let sum = 0
   product.reviews.forEach(rev => {
      sum += rev.rating
   })
   product.ratings = sum / product.reviews.length;// avg rating
   await product.save({ validateBeforeSave: false })

   res.status(200).json({
      success: true,
      message: isReviewed ? "Review Updated" : "Review Added"
   })
})

// Get All Reviews of a single Product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
   const product = await productModel.findById(req.query.productId);

   if (!product) {
      return next(new ErrorHandler("Product Not found", 404))
   }

   res.status(200).json({
      success: true,
      message: `List of all ${product.num_of_reviews} reviews of the Product`,
      reviews: product.reviews
   })
})

// Delete Review
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
   const product = await productModel.findById(req.query.productId);

   if (!product) {
      return next(new ErrorHandler("Product Not found", 404))
   }

   const reviews = product.reviews.filter(
      // filter out the review to be deleted and keep only the not deletable reviews
      (rev) => rev._id.toString() !== req.query.id.toString()
   )

   let ratings = 0;
   if (reviews.length === 0) {
      ratings = 0;
   } else {
      let sum = 0
      reviews.forEach((rev) => {
         sum += rev.rating
      })
      ratings = sum / reviews.length;
   }

   const num_of_reviews = reviews.length;

   await productModel.findByIdAndUpdate(
      req.query.productId,

      { reviews, ratings, num_of_reviews },

      { new: true, runValidators: true, useFindAndModify: false }
   )

   res.status(200).json({
      success: true,
      message: "Successfully Deleted review of the Product",
   })
})
