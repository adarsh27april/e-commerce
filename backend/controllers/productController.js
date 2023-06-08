/**
 * Controller me bas functions hote hai 
 * jo specific route hit hone par call karne hote hai Router se.
 */

const productModel = require("../models/productModel");

// POST - Create Product -Admin
exports.createProduct = async (req, res, next) => {
   const product = await productModel.create(req.body);
   console.log('product added successfully to DB :\n', product);
   res.status(201).json({
      success: true,
      message: `Product created Successfully`,
      product
   })
}

// GET - all products - Admin
exports.getAllProducts = async (req, res, next) => {
   const products = await productModel.find();
   console.log(req.url, "inside getAllProducts");
   res.status(200).json({
      success: true,
      message: "List of all products in DB",
      products
   })
}

// PUT - update Product - Admin
exports.updateProduct = async (req, res, next) => {
   let product = productModel.findById(req.params.id);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: "Product not found"
      })
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
}

//DELETE Product - Admin
exports.deleteProduct = async (req, res, next) => {
   const product = await productModel.findById(req.params.id);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: "Product not found"
      })
   }
   // await product.remove();
   // since product is a single object from productModel, so it contains all these methods.
   // product.remove() is depreciated from mongoose ver 7
   await product.deleteOne()

   res.status(200).json({
      success: true,
      message: "Product deleted successfully"
   })
}

// GET get single product details - ALL
exports.getProductDetails = async (req, res) => {
   const product = await productModel.findById(req.params.id);
   if (!product) {
      return res.status(500).json({
         success: false,
         message: "Product not found"
      })
   }

   res.status(200).json({
      success: true,
      message: "Product found successfully",
      product
   })
}

