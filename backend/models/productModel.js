const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please Enter Product Name"],// if no name entered then the second arg is the message to returned.
      trim: true// remove extra whitespase
   },
   description: {
      type: String,
      required: [true, "Please Enter Product Description"]
   },
   price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxLength: [8, "Price cannot exceed 8 chars."]
   },
   ratings: {
      type: Number,
      default: 0
   },
   images: [
      // ∵ images will be array conaining multiple image denoted by many obj , each obj has public_id, url
      {
         public_id: {
            type: String,
            required: true
         },
         url: {
            type: String,
            required: true
         }
      }
   ],
   category: {
      type: String,
      required: [true, "Please Enter Product Category"],
   },
   stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Price cannot exceed 8 chars."],
      default: 1
   },
   num_of_reviews: {
      type: Number,
      default: 0
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
         },
         name: {
            type: String,
            required: true
         },
         rating: {
            type: Number,
            required: true
         },
         comment: {
            type: String,
            required: true
         }
      }
   ],
   user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   }
})

module.exports = mongoose.model("productModel", ProductSchema)