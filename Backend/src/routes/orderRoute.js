// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const Order = require("../models/OrderModel");
const User = require("../models/User");

const {
  createOrder,
  requestOrder,
  getAllItems,
  addToCard,
  cancelFromAddToCard,
  cancelRequestOfOrder,
  createmultiplkeOrder,
  getAllOrdersByUser,
  getAllAddToCardsByUser,
} = require("../controllers/OrderController");

const { auth } = require("../middleware/auth");

// =======================================
// Order Creation & Requests
// =======================================

// Create a new order (authenticated)
router.post("/create", auth, createOrder);

// Request an order (authenticated)
router.post("/request-order", auth, requestOrder);

// =======================================
// User Orders & Cart
// =======================================

// Get all orders placed by a user (authenticated)
router.get("/get-all-orders/user/:userId", auth, getAllOrdersByUser);

// Get all add-to-cart items for a user (authenticated)
router.post("/get-all-addtocards/user", auth, getAllAddToCardsByUser);

// Add item to cart (authenticated)
router.post("/add-to-card", auth, addToCard);

// =======================================
// Order Cancellation
// =======================================

// Cancel an order request (authenticated)
router.post("/cancel-order", auth, cancelRequestOfOrder);

// Remove item from add-to-cart (authenticated)
router.post("/cancel-from-addtocard", auth, cancelFromAddToCard);

// =======================================
// Public Routes
// =======================================

// Get all listed items for shop (public)
router.get("/get-items", getAllItems);

module.exports = router;
