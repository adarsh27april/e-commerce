const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
   shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
      phoneNum: { type: Number, required: true },
   },

   OrderItems: [
      {
         name: { type: String, required: true },
         price: { type: Number, required: true },
         quantity: { type: Number, required: true },
         image: { type: String },

         product: {
            type: mongoose.Schema.ObjectId,
            ref: "productModel",// contains the name of the model
            required: true,
         }
      }
   ],

   user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",// contains the name of the model
      required: true,
   },
   paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
      // paidAt: { type: String, required: true },
   },

   itemsPrice: { type: Number, default: 0, required: true },
   taxPrice: { type: Number, default: 0, required: true },
   shippingPrice: { type: Number, default: 0, required: true },
   totalPrice: { type: Number, default: 0, required: true },

   orderStatus: {
      type: String,
      reuired: true,
      default: "Processing"
   },

   deliveredAt: Date, //
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

module.exports = mongoose.model("orderModel", orderSchema)
