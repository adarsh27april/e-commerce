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

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error_stack: err.stack // we are getting this because of Error.captureStackTrace method.
   })
}