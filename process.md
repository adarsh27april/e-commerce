# Starting with backend - 00:22:49

- created seperate backend & frontend folders, inside backend app.js & server.js

- npm init in `root` (e-commerce)

## Backend folder Setup

1. in app.js only require express instantiate it into app and export it.

2. in server.js listen to port, get vars from .env

3. config.env for env vars

4. create folders `controllers` and `routes`

5. Inside controllers create `productController` like : 
   
   ```js
   exports.getAllProducts = (req, res) => {
      res.status(200).json({ mseesge: "produt route is working" })
   }
   ```

6. Then in route folder create `productRoute` import express, instantiate `express.Router` and allocate the function `getAllProducts` controller to get route of `/products` like : 
   
   ```js
   const express = require("express");
   const { getAllProducts } = require("../controllers/productController");
   
   const router = express.Router();
   
   router.route("/products").get(getAllProducts);
   
   module.exports = router;
   ```

7. Then import the router in `app.js` and use it like this 
   
   ```js
   // Route imports 
   const product = require("./routes/productRoute") 
   app.use("api/v1", product) 
   ```
   
   run the server to check it.

8. Note that the Structure is like :  ![](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)so the controller will be controlling everything and providing it to the app.js

#### Configuring DB connection

1. create database.js in config folder, the `connectDatabase()` function connects us to the DB, export it & import it into the **<mark>server.js</mark>** file after the line where dotenv is configured or else it wont get DB_URI.

# Making Product API - 00:37:46

1. Create Model folder inside backend 

2. create `productModel.js` createschema in it &rarr; create `productModel` from schema and expor the model as  `productModel`.
   
   1. Do Note that the new collection that will be created will be like: `productmodels` if the name of the model is `productModel` i.e., it is converted to lowercase and an `s` is added in the end

3. import the `productModel` inside the productController.js
   
   1. Inside productController make `async createProduct()` to create product from `req.body` export the function and import it into productRoute and set it to run when post request is hit to `/products/new` 

4. Updating & Deleting & GetSingle product.
   
   1. create controller function `updateProduct()` and alot it to `PUT` route `/product/:id` in `productRoute`.
   
   2. create controller function `deleteProduct()` and alot it to `DELETE` route `/product/:id` in `productRoute`.
   
   3. create controller function `getProductDetails()` and alot it to `GET` route `/product/:id` in `productRoute`.

# Backend Error Handling

### For Product Not found

    Instead of handling error by writing if else block like : 

```js
if (!product) {
    return res.status(500).json({
        success: false,
        message: "Product not found"
    })
}
```

We can create class and handle error there.

1. Create a folder utils inside backend. then create errorHandle.js

2. create js class ErrorHandler, note that in JS the name of classfirst letter is capital.
   
   ```js
   The given code defines a class called `ErrorHander`, which extends the built-in `Error` class in JavaScript. This class is designed to handle errors in a more structured and customizable way.
   Let's break down the code step by step:
     1. The `class ErrorHander extends Error` line defines the `ErrorHander` class, which inherits from the `Error` class. By extending the `Error` class, `ErrorHander` inherits all the properties and methods of the `Error` class.
     2. The `constructor(message, statusCode)` method is the constructor of the `ErrorHander` class. It is called when a new instance of `ErrorHander` is created. The constructor accepts two parameters: `message` and `statusCode`. The `message` parameter represents the error message, and the `statusCode` parameter represents the HTTP status code associated with the error.
     3. The line `super(message)` is used to call the constructor of the parent class (`Error`). The `super` keyword is used to refer to the parent class and invoke its constructor. In this case, it passes the `message` parameter to the `Error` constructor, which sets the error message. The message is set by the Error Class of JS you can look ar route 
        look at /product/new route after removing name &/or price of product.
     4. The line `this.statusCode = statusCode` assigns the `statusCode` parameter value to the `statusCode` property of the `ErrorHander` instance. This allows you to store the HTTP status code associated with the error for further use.
     5. The line `Error.captureStackTrace(this, this.constructor)` captures the stack trace of the error. It is a utility method provided by the `Error` class. By calling this method, the stack trace information is attached to the current `ErrorHander` instance. This can be useful for debugging purposes, as it provides information about the call stack and helps identify where the error occurred.
     6. Finally, the line `module.exports = ErrorHander` exports the `ErrorHander` class, making it available for use in other modules. This line assumes that the code is running in a Node.js environment, where the `module.exports` object is used to define the module's public API.
   Overall, this code creates a custom error handler class (`ErrorHander`) that extends the built-in `Error` class. It adds a custom HTTP status code property and captures the stack trace for better error handling and debugging.
   ```

Look at files `backend/utils/errorHandler.js`, `backend/middleware/error.js`, & then just register the middleware in the app.js file at the end just before exporting the app.

1. error middleware `error.js`

```js
module.exports = (err, req, res, next) => {
   // the values of the err we are getting from m
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";

   res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error_stack: err.stack // we are getting this because of Error.captureStackTrace method.
   })
}
```

In case some error occurs then this middleware will be triggered and it will send 3 key-val pairs : success(t/f), message & error_stack.

2. ErrorHandler function `utils`

```js
class ErrorHandler extends Error {
   constructor(message, statusCode) {
      super(message) // super denotes the constructor of the class which is being extended.
      this.statusCode = statusCode // basically here a statusCode var is created for ErrorHandler and value is assigned

      Error.captureStackTrace(this, this.constructor);
   }
}
module.exports = ErrorHandler
```

This instance of this class is used to handle the error in the `productController.js` for generating the error (using method `Error.captureStackTrace`) so that the error middleware in <u>`error.js` is triggered.</u> 

The middleware in error.js will be returning res.json() for cases like : 

1. product not found.

2. improper length mongodb id provided. (we need to seperately handle this error as well).

### Aync Func. try catch block

General Error handler instead of try catch block for async functions.

1. create a middleware like :
   
   ```js
   module.exports = catchAsyncError = (req, res, next) => {
      Promise
         .resolve(catchAsyncError(req, res, next))
         .catch(next);
   }
   ```
   
   Then import it into the productController.js file and write every async function like :  
   
   ```js
   exports.createProduct = catchAsyncErrors(async (req, res, next) => {
      const product = await productModel.create(req.body);
      console.log('product added successfully to DB :\n', product);
      res.status(201).json({
         success: true,
         message: `Product created Successfully`,
         product
      })
   })
   ```
   
   It will basically look it the async function is executed or not and catch the errors encountered.

### Unhandled Promise Rejection

Work on **<u>Unhandled Promise Rejection</u>** in server.js file for managing the error related to config file ex: Mongodb wrong URI.

In the app.js file add this in end :

```js
// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log('error: ', err.message);
    console.log("shutting down the server due to Unhandled Promise Rejection.");
    server.close(() => {
        process.exit(1)
    })
})
```

After this has beend done we can remove the catch block from the `connectDatabase()` of the `backend/config/database.js` file or else the server will continue to run, ideally it should terminate.

### Handling Uncaught Exception

For errors like.

```js
console.log(android) // android is not defined as a var
```

In server.js file write this just after the import statements

```js
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
   console.log("Error : ", err.message);
   console.log(`Shutting down the server due to Uncaught Exception`);
   process.exit(1);
})
```

### Wrong MongoDB ID error - CastError

write the if block in the middleware in `error.js` like : 

```js
   // CastError - Wrong MongoDB ID error
   if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`

      err = new ErrorHandler(message, 404);
   }
```

# Search Filter Pagination
