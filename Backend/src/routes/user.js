// Required modules
const express = require("express");
const router = express.Router();

// Authentication controllers
const {
  login,
  signup,
  sendotp,
  changePassword,
  logout,
} = require("../controllers/Auth");

// Password reset controllers
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// User profile controllers
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/UserProfile");

// Authentication middleware
const { auth } = require("../middleware/auth");

// =======================================
// Authentication Routes
// =======================================

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword);
router.post("/logout", logout);

// =======================================
// Password Reset Routes
// =======================================

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

// =======================================
// User Profile Routes
// =======================================

router.get("/profile/:id", auth, getUserProfile);
router.put("/profile/:id", auth, updateUserProfile);

// Export router
module.exports = router;
