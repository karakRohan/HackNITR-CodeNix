// Import mongoose
const mongoose = require("mongoose");

// Picker schema definition
const pickerSchema = new mongoose.Schema(
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
      enum: ["Picker"],
      default: "Picker",
      required: true,
    },

    image: {
      type: String,
    },

    contactNumber: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      state: {
        type: String,
        trim: true,
        default: "",
      },
      pinCode: {
        type: String,
        trim: true,
        default: "",
      },
    },

    vehicleDetails: {
      vehicleType: {
        type: String,
        enum: ["Bicycle", "Motorcycle", "Car", "Van", "Truck"],
        default: "Bicycle",
      },
      vehicleNumber: {
        type: String,
        trim: true,
        uppercase: true,
        default: "",
      },
    },

    serviceAreas: [
      {
        type: String,
        trim: true,
      },
    ],

    assignedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],

    emergencyPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],

    assignedDeliveries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    timeSlots: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],

    creditPoints: {
      type: Number,
      default: 0,
    },

    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes for query optimization
// Note: email index is auto-created due to unique: true
pickerSchema.index({ serviceAreas: 1 });
pickerSchema.index({ isActive: 1 });

// Export Picker model
module.exports = mongoose.model("Picker", pickerSchema);
