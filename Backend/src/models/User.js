// Import mongoose
const mongoose = require("mongoose");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      enum: ["Admin", "User", "Picker"],
      default: "User",
      required: true,
    },

    creditPoint: {
      type: Number,
      min: 100,
      default: 500,
    },

    resetPasswordExpires: {
      type: Date,
    },

    image: {
      type: String,
    },

    pickupRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],

    orderRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    sellingOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    addToCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

// Export User model
module.exports = mongoose.model("User", userSchema);
