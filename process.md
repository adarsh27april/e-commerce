## 00:22:49 Starting with backend

- created seperate backend & frontend folders, inside backend app.js & server.js

- npm init in `root` (e-commerce)

### Backend folder

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

6. then in route folder create `productRoute` import express, instantiate `express.Router` and allocate the function `getAllProducts` controller to get route of `/products` like : 
   
   ```js
   const express = require("express");
   const { getAllProducts } = require("../controllers/productController");
   
   const router = express.Router();
   
   router.route("/products").get(getAllProducts);
   
   module.exports = router;
   ```

7. then import the router in `app.js` and use it like this 
   
   ```js
   // Route imports 
   const product = require("./routes/productRoute") 
   app.use("api/v1", product) 
   ```
   
   run the server to check it.

8. Note that the Structure is like :  ![](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)so the controller will be controlling everything and providing it to the app.js

#### Configuring DB connection

1. create database.js in config folder, the `connectDatabase()` function connects us to the DB, export it & import it into the **<mark>server.js</mark>** file after the line where dotenv is configured or else it wont get DB_URI.

## 00:37:46 Making Product API

1. Create Model folder inside backend 

2. create `productModel.js` createschema in it &rarr; create `productModel` from schema and expor the model as  `productModel`.
   
   1. Do Note that the new collection that will be created will be like: `productmodels` if the name of the model is `productModel` i.e., it is converted to lowercase and an `s` is added in the end

3. import the `productModel` inside the productController.js
   
   1. Inside productController make `async createProduct()` to create product from `req.body` export the function and import it into productRoute and set it to run when post request is hit to `/products/new` 

4. Updating & Deleting & GetSingle product.
   
   1. create controller function `updateProduct()` and alot it to `PUT` route `/product/:id` in `productRoute`.
   
   2. create controller function `deleteProduct()` and alot it to `DELETE` route `/product/:id` in `productRoute`.
   
   3. create controller function `getProductDetails()` and alot it to `GET` route `/product/:id` in `productRoute`.

5. AWFI

6. ASVJNN

7. ASVVN

8. AIFUHWe

9. 
