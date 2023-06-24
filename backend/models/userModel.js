const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")// crypto is a built in module

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name Should not have more than 30 Characters"],
      minLength: [3, "Name Should not have more than 3 Characters."]
   },
   email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"]
   },
   password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should have more than 6 characters"],
      select: false// this makes sure that when we do modelName.find() to get all data from a collection then if select:false is there then password will not be provided.
   },
   avatar: {
      public_id: {
         type: String,
         required: true
      },
      url: {
         type: String,
         required: true
      }
   },
   role: {
      type: String,
      default: "user",
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {

   if (!this.isModified("password")) {
      // this condition will make sure that password will only be hashed if it's a new user or a pre-existing user is updating his `password`. if no password is being updated then it will prevent the already hashed password to be hashed repeatedly.
      next();
   }

   this.password = await bcrypt.hash(this.password, 10); // 10 is salt, it will return a fix length string. more the salt more power consumption.
})

// JWT Token
userSchema.methods.get_JWT_Token = function () {
   return jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
   );
   // this will create jwt token based on the _id of the user in DB.
   // JWT_SECRET => it is the secret key used to signing the JWT, it is used to verify the authenticity of JWT during validation.
   // JWT_EXPIRE => expiration time for JWT
   // The jwt.sign() method takes the payload, secret key, and options as arguments and returns a signed JWT token as a string.
}

userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
   // enteredPassword => what string is to be comapred
   // this.password => the encrypted string that is stored in DB.
   // return true/false
}

module.exports = new mongoose.model("User", userSchema);
