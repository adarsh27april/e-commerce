---

---

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

1. create file `apiFeatures.js` in `utils` folder. Create class `API_Features`.

2. create constructor like : 
   
   ```js
   constructor(query, queryStr) {
         this.query = query;
         this.queryStr = queryStr;
      }
   ```

## Search Feature

The query contains the function to be performed on it. and the queryStr contains the query string present after ? in the url. ex: http://localhost:9876/api/v1/products?keyword=samosa then queryString is `keyword=samosa` 

1. The Search function will have functionality to search like `samosa` in 'samosamosa is `true` & in `samosa` is also `true`.

2. like : 
   
   ```js
   search() {
         const keyword = this.queryStr.keyword ? {
            name: {
               $regex: this.queryStr.keyword,// regex will match for keyword in the value of key `name`. ex 'samosa' in `samosamosa` is `true` & `samosa` in `samosa` is `true`
               $options: "i",// case insensitive. by default it is case senstitve.
            }
         } : {}
         console.log(keyword);
         this.query = this.query.find({ ...keyword })
         // at the end query me array of objects hai jo find() ka o/p hai.
         return this;
      }
   ```
   
   <u>**So basically we are making a single API route (here `/products` - Get_All_Products) and generalising it so that it can also search for all products with some common search feature.**</u>

> # ⚠
> 
> In `apiFeatures.js` file i wrote `module.export` instead of `module.exports` and got this e rror while making get to `/products` : `TypeError: API_Features is not a constructor`

> # 📓 Sending `productModel.find()` while initialising API_Features class to this.query() but using `this.query.find()`, `.limit()`, `.sort()`
> 
> - `this.query` is intended to be a MongoDB query object, not a function.
> 
> - By calling `productModel.find()`, we create a Mongoose query object that represents a search for all documents in the `productModel` collection.
> 
> - `this.query` is not a function. It is an ***<u>instance of a Mongoose query object</u>***
> 
> - that provides methods like `find()`, `sort()`, `limit()`, and others for building and executing MongoDB queries.

## Filter

> ## 📓 First things first
> 
> ```js
> queryCopy = { keyword: '2', category: 'Mobile' }
> removeFields.forEach(key => delete queryCopy[key])
> // then queryCopy = {category: 'Mobile'}
> ```
> 
> When we pass query string like : 
> 
> `/products?category=laptop&price[gt]=2000&price[lt]=1000` 
> 
> then in express we get like : 
> 
> `{ category: 'laptop', price: { gt: '2000', lt: '1000' } }` 

1. In `apiFeatures.js` create filter() in `API_Features`.

2. Here we will implement filter functionality filtering out products based on the querystring request

> ## 📓
> 
> Note that in productController.js I am writing like
> 
> ```js
> const apiFeature = new
>       API_Features(productModel.find(), req.query)
>       .search()
>       .filter();
> ```
> 
> So how it is deciding what function to call : 
> 
> ```js
> 1. apiFeature object is created as an instance of API_Features class
> 2. `search()` method is invoked on the `apiFeature` object immediately after its creation, & returns current instance : `this` it allows `method chaining` by returning the same object.
> 3. then the `filter()` method is invoked on the same `apiFeature` object. and the current instance this returned by it allowing further `method chaining`
> 4. order of writing methods using the dot notation → order of method invocation.
> ```
> 
> > Basically everytime both search and the filter functions are  called.

## Pagination

Will receive number of results per page as arg to provide only that amount of data.

```js
this.query =
         this.query // it can be replaced with ProductModel.find() -> same effect
            .limit(resultPerPage)
            .skip(skip)
```

The `.skip()` function is a method provided by Mongoose to skip a specified number of documents when executing a query.

`.limit()` allows us to define the maximum number of documents to return in the result set.

By Using `.skip()` in combination with `.limit()`, we can have pagination functionality in Mongoose.

```js
Note that excessive use of `.skip()` on large collections can have performance implications, as it requires MongoDB to traverse and skip a large number of documents.
In such cases, alternative pagination techniques like using the `lastId` approach or `cursor-based pagination` may be more efficient.
```

# Backend User & Password Authentication

## User Model

Import the validator model and create the User Schema and conver it model & export it..

- minLength can be applied on password, name along with maxLength.

- validator can be used to validate email like : validator.isEmail,

- `unique : true` makes sure that the email provided is unique and returns error otherwise.

Set the role with default value to be "user".

## User Controller

Create a basic  controller for register user which can create user with provided data, we will use bcrypt & everything else later.

## User Router

create `userRoute.js` in `routes` folder and direct `post` request at `/register` to that `registerUser()` controller.

>  Then in `app.js` import the router from `userRoute.js` file and register it for `/api/v1` route like `productRoute` 

note that in app.js we have written

```js
app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)
```

Hence for every request of type `/api/v1/some/thing` it will go to both productRouter and figure out which was the controller that needs to be called.

## Encrypting Password - bcryptjs

We will be encrypting the password in the userModel.js file only.

Import the `bcryptjs` package.

> # 📓
> 
> ## we cannot use `this` keyword inside an arrow function `()=>{}`
> 
>  `userSchema.pre("save", funciton())` here `save` is an event and by using `pre` method provided by the `mongoose.Schema` we can add some functionality which will trigger just before saving the data into DB.

## Setting up JWT Token

Import `jsonwebtoken` in `userModel.js` file.

>  Defining custom methods that can be called on instances of the model. here schemaName is userSchema and functionName is get_JWT_Token
> 
> ```js
> schemaName.methods.functionName = function(){
>     // function code here.
> }
> 
> userSchema.methods.get_JWT_Token = function(){
>     // function code here.
> }
> ```
> 
> These methods are specific to instances of the model here model is `User` and can be accessed and invoked on individual `user` objects.

We will then  call the custom method `get_JWT_Token()` for every user instance in the `userController` in `registerUser` like :

```js
const user = await User.create(...)
const token = user.get_JWT_Token()

res.status(201).json({
      success: true,
      message: "User Created Success",
      token
   })
```

Then send the token in the response.

In the config.env add the secret keys as : 

```python
PORT = 9876
DB_URI='mongodb://localhost:27017/ecommerce'
JWT_SECRET=thisIsMySceretKey_Adarsh
JWT_EXPIRE=5d # this denotes 5 days
```

The <mark>restart</mark> the server and try making request.

## Login User

write a `loginUser` controller for `/login` route 

* not providing email &/or password => 400 error

* `const user = await User.findOne({ email }).select("+password");`
  
  will make sure that the email exsists and there is a hashed password for that email present in the DB.
  
  ```js
  .select("+password"): method is used to specify the fields that should be included or excluded in the query results.
  here, it is including the password field, which is typically marked with a leading `+` symbol to indicate that it should be selected.
  ∵ in the userModel.js for password key we have mentioned `select : false`, ∴ it will not be included by default in `userModel.find()`
  ```

* if `!user` => 401 error

* Generate `user.comparePassword(password)` custom method for the model in `userModel.js`
- `userSchema.methods.comparePassword` will do a simple bcrypt.compare with the provided password & the hashed password, returning `true`/`false` at end.

- ```js
  const isPasswordMatched = await user.comparePassword(password);
  don't forget await here.
  Then based on the `isPasswordMatched` here we will provide error or JWT.
  ```

At this point we can see that we are writing the code repeateadly in the userRegister & userLogin

```js
const token = user.get_JWT_Token()
   res.status(201).json({
      success: true,
      message: "User Created Success",
      token
   })
```

So we will create util for it. And also we need to save the token in the cookie after creating it.

```js
// sendToken.js
const sendToken = (user, statusCode, message, res) => {
   const token = user.get_JWT_Token();
   // options for cookie.
   const options = {
      expires: new Date(
         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000// in millissec
      ),// it will set the expiry time for the cookie
      httpOnly: true,
   }
   res.status(statusCode)
      .cookie('token', token, options)
      .json({
         success: true,
         message,
         user,
         token
      })
}
module.exports = sendkToken;
```

## Adding Authentication to routes

- In `app.js ` file import `cookie-parser` package and set up the middleware just after setting up `express.json`.

- create `auth.js` in middleware 

- the `isAuthenticatedUser` function will verify if the user is authenticated or not.

- `req.cookies` contains an all the cookie as key-value pairs `{token : "token-cookie-value"}`
  
  ```js
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)
  
  `the jwt.verify() function will contain the token & the secret key, then`
  
  decodedData = { id: '648ec014168e35f1ef17ad5c', iat: 1687357764, exp: 1687789764 }
  ```
  
  It contains the data that we provided(like id in `userModel.js` `get_JWT_Token` method) when creating the token using `jwt.sign()` method along with `iat(issued at)` & `exp(expiration time)` & can contain other info. like `iss(issuer)`& `sub(subject)`

- Then add this function to the router like : 
  
  ```js
  productRouter.route("/products").get(isAuthenticatedUser, getAllProducts);
  ```
  
  > ## 📓
  > 
  > By writing this, the first function will exec. with args: req, res, next
  > 
  > Then the second function with exec. with same args
  > 
  > args will be provided by the express module.

## Checking if role is Admin

> First things first
> 
> **<u>Rest Parameter Syntax</u>**
> 
> ```js
> function asdf(...args){
>     console.log(args);
> }
> asdf("namaskar", "world);
> // ['namaskar', 'world']
> --------------------------------------------------------------
> function qwerty(arg1, ...args){
>     console.log(arg1);
>     console.log(args);
> }
> qwerty(1,2,3,4,5,6,7,8);
> // 1
> // [2, 3, 4, 5, 6, 7, 8]
> ```

```js
exports.authorizeRoles = (...roles) => {
   /**
    * here `...roles` in the parameter accepts a variable number of role arguments passed to it. 
    * it doesnot provide the req, res, next, they are provided by the ExpressJS.
    * the authorizeRoles function returns another function which is a express middleware,
    * This middleware will check if the role of the user is matching the allowed role.
    * if yes=> next() will pass control to next middleware or route handler.
    * if no=> it will respond with an error or deny access to the requested user.
    */
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
    // it will check if value of req.user.role is present in the roles (array - it will be array if multiple values are passed to it from calling function or else it will be a string)
         return next(new ErrorHandler(`Role: '${req.user.role}' is not allowed to access this resource.`, 403));
      }
      next();
   }
}
```



## Implementing Forgot Password
