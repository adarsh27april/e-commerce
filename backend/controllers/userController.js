const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
   const { name, email, password } = req.body;

   const user = await User.create({
      name, email, password,
      avatar: {
         public_id: "this is sample id",
         url: "profilePicUrl"
      }
   });

   sendToken(user, 201, "User Creation Success", res);
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
   const { email, password } = req.body;
   //checking if user has given email & password both

   if (!email || !password) {
      return next(new ErrorHandler("Please enter email & password ", 400))
   }

   // if both email and password are provided by user during login.
   const user = await User.findOne({ email }).select("+password");
   // BLUNDER await is needed here don't miss it.

   if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
   }

   const isPasswordMatched = await user.comparePassword(password);
   console.log(isPasswordMatched);

   if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
      // writing only invalid password is risky ∵ if email is entered randomly and incorrect password provided then that person will get to know that the email is correct.
   }

   // email found & password matched generate jwt & send it.
   sendToken(user, 200, "User Login Success", res);
})


// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {

   res.cookie("token", null, {
      expires: new Date(Date.now()),// keep it expires or else cookie will be set to something random like : {token : 'j:null'}
      httpOnly: true
   })

   res.status(200)
      .json({
         success: true,
         message: "logged out successfully"
      })
})

