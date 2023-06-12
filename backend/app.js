const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")


app.use(express.json())
// Route imports
const productRouter = require("./routes/productRoute")

app.use("/api/v1", productRouter)
/**
 * Note that earlier i had written `api/v1` it was giving `Cannot GET /api/v1/products`
 * But after writing `/api/v1` it is working Fine.
 */

//Middleware for Errors
app.use(errorMiddleware)
// app.use()

module.exports = app;