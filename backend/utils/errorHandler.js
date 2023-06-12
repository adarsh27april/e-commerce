class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message) // super denotes the constructor of the class which is being extended.
      this.statusCode = statusCode // basically here a statusCode var is created for ErrorHandler and value is assigned

      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = ErrorHandler
