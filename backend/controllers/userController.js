const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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


// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
   const user = await User.findOne({ email: req.body.email });// await is necessary when using findOne function
   console.log(user);
   if (!user) {
      return next(new ErrorHandler("User not found, check email", 404));
   }

   // get reset password token
   const resetToken = user.getResetPasswordToken();
   //here we are calling the function where resetPasswordToken & resetPasswordExpire are 
   // added to db but not yet saved, so we will save it first
   await user.save({ validateBeforeSave: false })

   // now we will generate link which will be sent as mail to user for resetting the password.
   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
   // for http://localhost:3000/asdf => req.get("host") = localhost:3000 & req.protocol = http

   const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it.`

   try {

      await sendEmail({
         email: user.email,
         subject: "E-commerce password recovery",
         message
      })

      res.status(200).json({
         success: true,
         message: `Email sent to ${user.email} successfully`,
      })

   } catch (error) {
      console.log("catch of forgot password controller", error);
      // if some error occurs 
      // first reset the resetPasswordToken & resetPasswordExpire values in DB to undefined 
      // then save the user DB & return the error message.
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false })
      return next(new ErrorHandler(error.message, 500))
   }

})


// reset password
exports.resetpassword = catchAsyncErrors(async (req, res, next) => {
   // creating token hash
   const resetPasswordToken =
      crypto
         .createHash("sha256")
         .update(req.params.token)
         .digest("hex")

   const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
   })

   if (!user) {
      return next(new ErrorHandler("reset password token is invalid or has expired", 400))
   }

   if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400))
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save();

   sendToken(user, 200, "User Password Reset Success", res);
})
