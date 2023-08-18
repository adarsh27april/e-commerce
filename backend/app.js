const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser());

// Route imports
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");//backend/routes/orderRoute.js

app.use("/api/v1", productRouter);
/* Note : earlier wrote `api/v1` : giving `Cannot GET /api/v1/products`
 * After writing `/api/v1` : working Fine.
 */
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

//Middleware for Errors
app.use(errorMiddleware)

module.exports = app;