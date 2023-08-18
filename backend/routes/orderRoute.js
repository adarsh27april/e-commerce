const express = require("express");
const orderRouter = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleorder, myOrders,
   getAllOrders, updateOrderStatus, deleteOrder
} = require("../controllers/orderController");

console.log("inside orderRoute.js file");

orderRouter.route("/order/new").post(isAuthenticatedUser, newOrder);
orderRouter.route("/order/:id").get(isAuthenticatedUser, getSingleorder)
orderRouter.route("/orders/me").get(isAuthenticatedUser, myOrders)

orderRouter.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

orderRouter.route("/admin/orders/:id")
   .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = orderRouter;
