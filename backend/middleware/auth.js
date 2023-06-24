const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
   const { token } = req.cookies;// its cookies with an s.
   // console.log("token", token, req.cookies);

   if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401))
   }

   const decodedData = jwt.verify(token, process.env.JWT_SECRET)
   // console.log("decodedData", decodedData);

   req.user = await User.findById(decodedData.id);
   next();// here next() is the next function to be executed as provided in the productRoute.js 
})


exports.authorizeRoles = (...roles) => {

   return (req, res, next) => {
      // req, res, next args are provided by the ExpressJS.
      if (!roles.includes(req.user.role)) {
         return next(new ErrorHandler(`Role: '${req.user.role}' is not allowed to access this resource.`, 403));
      }
      next();
   }
}

