const orderModel = require("../models/orderModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const productModel = require("../models/productModel");

// create new user - all logged in user
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

   const {
      itemsPrice, taxPrice, shippingPrice,
      totalPrice, OrderItems, shippingInfo, paymentInfo,
   } = req.body;

   const order = await orderModel.create({
      itemsPrice, taxPrice, shippingPrice,
      totalPrice, OrderItems, shippingInfo, paymentInfo,

      paidAt: Date.now(),
      user: req.user._id
   })

   res.status(201).json({
      success: true,
      message: "Order Successfully Created",
      order
   })
})

// get single order - Admin
exports.getSingleorder = catchAsyncErrors(async (req, res, next) => {

   const order =
      await orderModel
         .findById(req.params.id)
         .populate(
            "user", // name of the model
            "name email" // what fields are to be added
         );
   // `populate` => fetch user doc(ref. in mongoDB Schema) & replace the user field in 
   // the order doc with the actual user document. The "name email" argument specifies
   // that only name & email fields from the referenced user doc should be included.

   if (!order) {
      return next(new ErrorHandler("Order not found for provided order id", 404))
   }

   res.status(200).json({
      success: true,
      message: "Successfully found order",
      order
   })
})

// get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

   const orders = await orderModel.find({ "user": req.user._id })
   if (!orders) {
      return next(new ErrorHandler("No order found for the current user", 404))
   }

   res.status(200).json({
      success: true,
      message: `Successfully found ${orders.length} orders for the user`,
      orders
   })
})

// get All Orders - Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
   const orders = await orderModel.find();

   if (!orders) {
      return next(new ErrorHandler("No orders to show in DB", 404))
   }

   let totalAmt = 0;
   orders.forEach(item => { totalAmt += item.totalPrice })

   res.status(200).json({
      success: true,
      message: `Successfully fetched all ${orders.length} orders from DB`,
      totalAmt,
      orders
   })
})

// Update Order status - Admin
// basically admin will be manually updating the status of the order by passing the order status from the frontend
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
   const order = await orderModel.findById(req.params.id);

   if (!order) {
      return next(new ErrorHandler("No such order Exist", 404))
   }

   if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have been already delivered this product", 400))
   }

   order.OrderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity)
      // update the stock of the product which has been ordered
      // decrease count of product in stock by the order.quantity
   })

   order.orderStatus = req.body.status;

   if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now()
      // if from frontend the status is passed as Delivered then set deliveredAt value to be Date.now()
   }

   await order.save({ validateBeforeSave: false })

   res.status(200).json({
      success: true,
      message: "Successfully updated status of the order",
      order
   })
})

async function updateStock(id, quantity) {
   // ∵ we have saved the ref of product so we can retrieve the product from the id only
   const product = await productModel.findById(id);

   product.stock -= quantity

   await product.save({ validateBeforeSave: true })
}

// delete orders - Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
   const order = await orderModel.findById(req.params.id);

   if (!order) {
      return next(new ErrorHandler("No such orders exist", 404))
   }

   await order.deleteOne(); // delete the entire current order including all the OrderItems in the array

   res.status(200).json({
      success: true,
      message: "Successfully Deleted the order from DB",
   })
})
