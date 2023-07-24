const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
   // the values of the err we are getting from m
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";

   // CastError - Wrong MongoDB ID error
   if (err.name === "CastError") {
      const message = `${err.name} - Resource not found. Invalid: ${err.path}`
      err = new ErrorHandler(message, 404);
   }

   // duplicate mongoDB Key Error
   if (err.code === 11000) {
      // console.log("err=> \n", err, "\nend")
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      err = new ErrorHandler(message, 400)
   }

   // wrong JWT error
   if (err.name === "JsonWebTokenError") {// this error comes if the JWT token doesn't match
      const message = `Json Web Token is Invalid, Try Again`
      err = new ErrorHandler(message, 400)
   }

   // JWT Expire Error
   if (err.name === "TokenExpireError") {
      const message = `Json Web Token is Expired, Try Again`
      err = new ErrorHandler(message, 400)
   }

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error_stack: err.stack // we are getting this because of Error.captureStackTrace method.
   })
}
