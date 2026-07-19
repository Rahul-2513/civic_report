const express = require("express");

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validators/authValidator");

const router = express.Router();

/*

Public Routes

*/

// Register User
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

// Login User
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

/*

Protected Routes

*/

// Get Logged In User
router.get(
  "/me",
  protect,
  getMe
);

router.put(
  "/me",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;